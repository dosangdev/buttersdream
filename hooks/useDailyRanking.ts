import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { processDonationLogs } from "@/app/utils/donation";
import { isToday } from "@/app/utils/dateUtils";
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

export function useDailyRanking() {
  const [processedData, setProcessedData] = useState<ProcessedDonationLog[]>(
    []
  );
  const { data: logs } = useSWR(`/api/get-wallet-logs`);
  const { result } = logs || {};

  // 1. 1차 필터링 + 오늘(UTC)만
  const donationLogs = useMemo(() => {
    if (!result) return [];
    const filtered = processDonationLogs(result).filter((log) => {
      const date = new Date(log.timestamp + "T00:00:00Z");
      return isToday(date);
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

  return { all: processedData, top3 };
}
