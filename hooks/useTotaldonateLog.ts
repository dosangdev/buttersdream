import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { processDonationLogs } from "@/app/utils/donation";
import {
  getDominantColor,
  walletToHex,
  rgbToHex,
} from "@/app/utils/colorExtractor";
import { DonationLog } from "@/app/types/donation";

// 확장된 타입 정의
interface FarcasterUserData {
  display_name: string;
  color: string | Promise<number[]>;
  username: string;
  verifications: string[];
}

interface ProcessedDonationLog extends DonationLog {
  hasFarcasterData: boolean;
  farcasterUserData: FarcasterUserData;
}

export function useTotaldonateLog() {
  const [processedData, setProcessedData] = useState<ProcessedDonationLog[]>(
    []
  );
  const { data: logs } = useSWR(`/api/get-wallet-logs`);
  const { result } = logs || {};

  // 1. 1차 필터링
  const donationLogs = useMemo(() => {
    if (!result) return [];
    const filtered = processDonationLogs(result);
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

  // 3. farcaster 데이터 fetch (bulk API 사용)
  const { data: farcasterUserDataArray } = useSWR(
    mergedDonationLogs.length > 0
      ? `/api/lookup-user?walletAddresses=${mergedDonationLogs
          .map((log) => log.from)
          .join(",")}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  // 4. 합치기
  const combinedData = useMemo<ProcessedDonationLog[]>(() => {
    if (!farcasterUserDataArray)
      return mergedDonationLogs as ProcessedDonationLog[];

    const combined = mergedDonationLogs.map((log, index) => {
      // bulk API 응답에서 해당 지갑 주소의 데이터 찾기
      const farcasterData = (() => {
        // 객체 형태의 응답에서 해당 지갑 주소의 데이터 찾기
        const userArray = farcasterUserDataArray[log.from];
        if (!userArray || userArray.length === 0) {
          return null;
        }

        // 여러 계정이 있으면 display_name이 있는 계정 우선 선택
        const userWithDisplayName = userArray.find(
          (user: any) => user.display_name
        );
        if (userWithDisplayName) {
          return userWithDisplayName;
        }

        return userArray[0];
      })();

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
      };
    });
    return combined;
  }, [mergedDonationLogs, farcasterUserDataArray]);

  // 5. 컬러 Promise 처리
  useEffect(() => {
    const processColors = async () => {
      const processed = await Promise.all(
        combinedData.map(async (item) => {
          if (
            item.hasFarcasterData &&
            typeof item.farcasterUserData.color !== "string"
          ) {
            try {
              const color = await item.farcasterUserData.color;

              return {
                ...item,
                farcasterUserData: {
                  ...item.farcasterUserData,
                  color: rgbToHex(...(color as [number, number, number])),
                },
              };
            } catch (error) {
              console.error(
                "Color processing error for",
                item.farcasterUserData.display_name,
                ":",
                error
              );
              return {
                ...item,
                farcasterUserData: {
                  ...item.farcasterUserData,
                  color: walletToHex(item.from),
                },
              };
            }
          }
          return item;
        })
      );

      setProcessedData(processed);
    };

    if (combinedData.length > 0) {
      processColors();
    }
  }, [combinedData]);

  return processedData;
}
