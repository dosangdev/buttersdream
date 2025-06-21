import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { processDonationLogs } from "@/app/utils/donation";
import { isThisWeek } from "@/app/utils/dateUtils";
import {
  getDominantColor,
  walletToHex,
  rgbToHex,
} from "@/app/utils/colorExtractor";
import { DonationLog } from "@/app/types/donation";

interface FarcasterUserData {
  display_name: string;
  color: string | Promise<number[]>;
  username: string;
  verifications: string[];
}

interface ProcessedDonationLog extends DonationLog {
  hasFarcasterData: boolean;
  farcasterUserData: FarcasterUserData;
  type: "first" | "second" | "third" | "default";
  ranking?: number;
}

export function useWeeklyRanking() {
  const [processedData, setProcessedData] = useState<ProcessedDonationLog[]>(
    []
  );
  const { data: logs } = useSWR(`/api/get-wallet-logs`);
  const { result } = logs || {};

  // 1. 1차 필터링 + 이번주(UTC)만
  const donationLogs = useMemo(() => {
    if (!result) return [];

    // 이번주(UTC) 월요일 날짜 구하기
    const now = new Date();
    const nowUTCYear = now.getUTCFullYear();
    const nowUTCMonth = now.getUTCMonth();
    const nowUTCDay = now.getUTCDate();
    const nowUTCDayOfWeek = now.getUTCDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const daysSinceMonday = nowUTCDayOfWeek === 0 ? 6 : nowUTCDayOfWeek - 1;

    // 이번주 월요일(UTC) 날짜 객체
    const monday = new Date(
      Date.UTC(nowUTCYear, nowUTCMonth, nowUTCDay - daysSinceMonday)
    );
    // 이번주 월요일부터 오늘까지의 날짜 문자열(YYYY-MM-DD) 배열 만들기
    const weekDates: string[] = [];
    for (let i = 0; i <= daysSinceMonday; i++) {
      const d = new Date(monday);
      d.setUTCDate(monday.getUTCDate() + i);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      weekDates.push(`${y}-${m}-${day}`);
    }

    const filtered = processDonationLogs(result).filter((log) => {
      // log.timestamp가 이번주 날짜 배열에 포함되는지 확인
      return weekDates.includes(log.timestamp);
    });

    return filtered;
  }, [result]);

  // 2. 머지 (지갑별 합산)
  const mergedDonationLogs = useMemo(() => {
    const sortedLogs = [...donationLogs].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    const mergedLogs = new Map<string, DonationLog>();
    sortedLogs.forEach((log) => {
      const existingLog = mergedLogs.get(log.from);
      if (existingLog) {
        const newValue = existingLog.value + log.value;
        existingLog.value = Number(newValue.toFixed(2));
      } else {
        const newLog = { ...log };
        newLog.value = Number(newLog.value.toFixed(2));
        mergedLogs.set(log.from, newLog);
      }
    });
    const mergedArr = Array.from(mergedLogs.values());
    return mergedArr;
  }, [donationLogs]);

  // 3. farcaster 데이터 fetch
  const { data: farcasterUserDataArray } = useSWR(
    mergedDonationLogs.length > 0
      ? mergedDonationLogs.map(
          (log) => `/api/lookup-user?walletAddress=${log.from}`
        )
      : null,
    (urls) =>
      Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
  );

  // 4. 합치기
  const combinedData = useMemo<ProcessedDonationLog[]>(() => {
    if (!farcasterUserDataArray)
      return mergedDonationLogs.map((log) => ({
        ...log,
        hasFarcasterData: false,
        farcasterUserData: {
          display_name: log.from.slice(0, 6) + "..." + log.from.slice(-4),
          color: walletToHex(log.from),
          username: log.from.slice(0, 6) + "..." + log.from.slice(-4),
          verifications: [],
        },
        type: "default" as const,
      }));
    const combined = mergedDonationLogs.map((log, index) => {
      const farcasterData = farcasterUserDataArray[index]?.[0];
      const hasFarcasterData = !!farcasterData;
      return {
        ...log,
        hasFarcasterData,
        farcasterUserData: hasFarcasterData
          ? {
              display_name: farcasterData.display_name,
              color: getDominantColor(farcasterData.pfp_url),
              username: farcasterData.username,
              verifications: farcasterData.verifications as string[],
            }
          : {
              display_name: log.from.slice(0, 6) + "..." + log.from.slice(-4),
              color: walletToHex(log.from),
              username: log.from.slice(0, 6) + "..." + log.from.slice(-4),
              verifications: [],
            },
        type: "default" as const,
      };
    });
    return combined;
  }, [mergedDonationLogs, farcasterUserDataArray]);

  // 5. 컬러 Promise 처리 및 value 기준 정렬 + type 부여
  useEffect(() => {
    const processColors = async () => {
      const processed = await Promise.all(
        combinedData.map(async (item) => {
          if (
            item.hasFarcasterData &&
            typeof item.farcasterUserData.color !== "string"
          ) {
            const color = await item.farcasterUserData.color;
            return {
              ...item,
              farcasterUserData: {
                ...item.farcasterUserData,
                color: rgbToHex(...(color as [number, number, number])),
              },
            };
          }
          return item;
        })
      );
      // value 기준 내림차순 정렬 및 type 부여, ranking 추가
      const sorted = [...processed].sort((a, b) => b.value - a.value);
      const withTypeAndRanking = sorted.map((item, idx) => {
        let type: "first" | "second" | "third" | "default" = "default";
        if (idx === 0) type = "first";
        else if (idx === 1) type = "second";
        else if (idx === 2) type = "third";
        return { ...item, type, ranking: idx + 1 };
      });
      setProcessedData(withTypeAndRanking);
    };
    processColors();
  }, [combinedData]);

  const top3 = processedData.filter(
    (item) =>
      item.type === "first" || item.type === "second" || item.type === "third"
  );

  // basicCardData는 top3를 제외한 나머지 데이터
  const basicCardData = processedData.filter(
    (item) =>
      item.type !== "first" && item.type !== "second" && item.type !== "third"
  );

  return { all: processedData, top3, basicCardData };
}
