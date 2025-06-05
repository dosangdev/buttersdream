import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { processDonationLogs } from "@/app/utils/donation";
import {
  getDominantColor,
  walletToHex,
  rgbToHex,
} from "@/app/utils/colorExtractor";
import { DonationLog } from "@/app/types/donation";
import { useAccount } from "wagmi";

interface FarcasterUserData {
  display_name: string;
  color: string | Promise<number[]>;
  username: string;
  verifications: string[];
}

interface MyButterDonationLog extends DonationLog {
  hasFarcasterData: boolean;
  farcasterUserData: FarcasterUserData;
  hash: string;
}

export function useMyButterDonateLog() {
  const [processedData, setProcessedData] = useState<MyButterDonationLog[]>([]);
  const { address } = useAccount();
  const { data: logs } = useSWR(`/api/get-wallet-logs`);
  const { result } = logs || {};

  // 1. USDC만 필터 + 내 지갑 주소만 필터
  const myDonationLogs = useMemo(() => {
    if (!result || !address) return [];
    const filtered = (result as DonationLog[])
      .filter(
        (log) =>
          log.tokenName === "USDC" &&
          log.from?.toLowerCase() === address.toLowerCase()
      )
      .map((log) => ({
        from: log.from,
        tokenName: log.tokenName,
        value: Number(log.value) / 1000000, // USDC 단위 변환
        timestamp: new Date(parseInt((log as any).timeStamp) * 1000)
          .toISOString()
          .split("T")[0],
        functionName: log.functionName,
        hash: log.hash,
      }));
    return filtered;
  }, [result, address]);

  // 2. farcaster 데이터 fetch (각 기부 내역별로)
  const { data: farcasterUserDataArray } = useSWR(
    myDonationLogs.length > 0
      ? myDonationLogs.map(
          (log) => `/api/lookup-user?walletAddress=${log.from}`
        )
      : null,
    (urls: string[]) =>
      Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
  );

  // 3. 합치기
  const combinedData = useMemo<MyButterDonationLog[]>(() => {
    if (!farcasterUserDataArray)
      return myDonationLogs.map((log) => ({
        ...log,
        hasFarcasterData: false,
        farcasterUserData: {
          display_name: log.from.slice(0, 6) + "..." + log.from.slice(-4),
          color: walletToHex(log.from),
          username: log.from.slice(0, 6) + "..." + log.from.slice(-4),
          verifications: [],
        },
      }));
    const combined = myDonationLogs.map((log, index) => {
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
      };
    });
    return combined;
  }, [myDonationLogs, farcasterUserDataArray]);

  // 4. 컬러 Promise 처리
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
      setProcessedData(processed);
    };
    processColors();
  }, [combinedData]);

  // 전체 value 합산
  const totalValue = processedData.reduce((acc, cur) => acc + cur.value, 0);

  return { myDonationLogs: processedData, totalValue };
}
