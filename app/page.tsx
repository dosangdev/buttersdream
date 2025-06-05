"use client";

import ProgressBar from "@/components/donate/ProgressBar";
import { useDonationProgress } from "@/hooks/useDonationProgress";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { decodeEventLog, erc20Abi } from "viem";
import { butterComponents } from "./constants/butterItems";
import { processDonationLogs } from "./utils/donation";
import { DonationLog } from "./types/donation";
import {
  rgbToHex,
  walletToHex,
  getDominantColor,
} from "./utils/colorExtractor";
import { useAccount } from "wagmi";
import { useTotaldonateLog } from "@/hooks/useTotaldonateLog";

export default function Home() {
  const { currentAmount, targetAmount, isLoading } = useDonationProgress();
  const [isDonateInfoOpen, setIsDonateInfoOpen] = useState(false);
  // const [processedData, setProcessedData] = useState<any[]>([]);
  const { address } = useAccount();

  const totalDonateLog = useTotaldonateLog();

  // const { data: logs } = useSWR(`/api/get-wallet-logs`);

  // const { result } = logs || {};
  // console.log("result : ", result);

  // const donationLogs = useMemo(() => {
  //   if (!result) return [];
  //   return processDonationLogs(result);
  // }, [result]);

  // console.log("donationLogs : ", donationLogs);

  // const walletAddress = "0xf636be2323C2C13a8fb84a090256B316F4392673";
  // const { data: userData } = useSWR(
  //   `/api/lookup-user?walletAddress=${walletAddress}`
  // );
  // console.log("userData : ", userData);

  // const mergedDonationLogs = useMemo(() => {
  //   // 날짜 순서대로 정렬
  //   const sortedLogs = [...dummyDonationLogs].sort(
  //     (a, b) =>
  //       new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  //   );

  // 같은 지갑 주소의 기부 내역 합치기
  //   const mergedLogs = new Map<string, DonationLog>();

  //   sortedLogs.forEach((log) => {
  //     const existingLog = mergedLogs.get(log.from);
  //     if (existingLog) {
  //       // 이미 존재하는 지갑이면 value를 더하고 timestamp는 더 이른 날짜로 유지
  //       const newValue = existingLog.value + log.value;
  //       existingLog.value = Number(newValue.toFixed(2)); // 소수점 2자리까지 표시
  //     } else {
  //       // 새로운 지갑이면 그대로 추가
  //       const newLog = { ...log };
  //       newLog.value = Number(newLog.value.toFixed(2)); // 소수점 2자리까지 표시
  //       mergedLogs.set(log.from, newLog);
  //     }
  //   });

  //   return Array.from(mergedLogs.values());
  // }, [donationLogs]);

  // // 각 지갑 주소에 대한 API 호출
  // const { data: farcasterUserDataArray } = useSWR(
  //   mergedDonationLogs.length > 0
  //     ? mergedDonationLogs.map(
  //         (log) => `/api/lookup-user?walletAddress=${log.from}`
  //       )
  //     : null,
  //   (urls) =>
  //     Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
  // );

  // // mergedDonationLogs와 farcasterUserDataArray 합치기
  // const combinedData = useMemo(() => {
  //   if (!farcasterUserDataArray) return mergedDonationLogs;

  //   return mergedDonationLogs.map((log, index) => {
  //     const farcasterData = farcasterUserDataArray[index]?.[0];
  //     const hasFarcasterData = !!farcasterData;

  //     return {
  //       ...log,
  //       hasFarcasterData,
  //       farcasterUserData: hasFarcasterData
  //         ? {
  //             display_name: farcasterData.display_name,
  //             color: getDominantColor(farcasterData.pfp_url),
  //             username: farcasterData.username,
  //             verifications: farcasterData.verifications,
  //           }
  //         : {
  //             display_name: log.from.slice(0, 6) + "..." + log.from.slice(-4),
  //             color: walletToHex(log.from),
  //             username: log.from.slice(0, 6) + "..." + log.from.slice(-4),
  //             verifications: [],
  //           },
  //     };
  //   });
  // }, [mergedDonationLogs, farcasterUserDataArray]);

  // // Promise 처리
  // useEffect(() => {
  //   const processColors = async () => {
  //     const processed = await Promise.all(
  //       combinedData.map(async (item) => {
  //         if (item.hasFarcasterData) {
  //           const color = await item.farcasterUserData.color;
  //           return {
  //             ...item,
  //             farcasterUserData: {
  //               ...item.farcasterUserData,
  //               color: rgbToHex(...color),
  //             },
  //           };
  //         }
  //         return item;
  //       })
  //     );
  //     setProcessedData(processed);
  //   };

  //   processColors();
  // }, [combinedData]);

  // console.log("mergedDonationLogs:", mergedDonationLogs);
  // console.log("farcasterUserDataArray:", farcasterUserDataArray);
  // console.log("processedData:", processedData);

  const isAllColorReady =
    totalDonateLog.length > 0 &&
    totalDonateLog.every(
      (item) =>
        typeof item.farcasterUserData?.color === "string" &&
        item.farcasterUserData?.color.startsWith("#")
    );

  return (
    <main className="flex flex-col items-center pt-[25px] relative select-none">
      <div className="w-full max-w-md">
        {!isLoading && <ProgressBar />}
        <div className="relative flex flex-col items-center pt-[51px]">
          <div className="flex flex-col items-center  z-30">
            {!isAllColorReady ? (
              <div className="flex flex-col items-center py-8">
                <svg
                  className="animate-spin h-8 w-8 text-yellow-400 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span className="text-gray-400">
                  Loading donor information...
                </span>
              </div>
            ) : (
              [...totalDonateLog].reverse().map((item, index) => {
                const walletLastTwo = item?.from?.slice(-2);
                const numericValue = parseInt(walletLastTwo, 16);
                const butterType = (numericValue % 7) + 1;
                const ButterItemComponent =
                  butterComponents[butterType - 1] || butterComponents[0];

                const isArrow =
                  item.from.toLowerCase() === address?.toLowerCase();

                return (
                  <div key={index} className="relative -mt-[8px]">
                    <ButterItemComponent
                      fill={item?.farcasterUserData?.color}
                    />
                    {isArrow ? (
                      <div
                        className={`absolute ${
                          index % 2 === 0
                            ? "top-[-10px] right-[-70px]"
                            : "top-[-20px] left-[-70px]"
                        }`}
                      >
                        <Image
                          src={`/home/your-butter-${
                            index % 2 === 0 ? "left" : "right"
                          }.png`}
                          width={62}
                          height={39}
                          alt="arrow"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>

          <Image
            src="/butter-melting.png"
            width={113}
            height={68}
            alt="butter-melting"
            priority={true}
            className="min-w-[113px] mt-[-8px] z-20"
          />
          <Image
            src="/donate/bread.png"
            width={210}
            height={100}
            alt="plate"
            priority={true}
            className="min-w-[210px] mt-[-60px] z-10"
          />
          {/* <div className=""> */}
          <Image
            src="/home/plate.png"
            width={294}
            height={144}
            alt="plate"
            priority={true}
            className="min-w-[294px] mt-[-90px] z-0"
          />
        </div>
      </div>

      <div className="">
        <button
          className="fixed bottom-14 left-2 cursor-pointer z-50"
          onClick={() => setIsDonateInfoOpen(!isDonateInfoOpen)}
        >
          <Image
            src={
              isDonateInfoOpen
                ? `/butterfly-basic.png`
                : `/home/butterfly-with-folded-wings.png`
            }
            width={isDonateInfoOpen ? 79 : 52}
            height={isDonateInfoOpen ? 56 : 58}
            alt="Where to donate info button"
          />
        </button>
      </div>
      {/* 기부처 모달 */}
      {isDonateInfoOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="relative">
            <Image
              src="/home/where-to-donate-modal.png"
              width={400}
              height={400}
              alt="Where to donate modal"
              className=""
            />
            <div className="absolute top-0 left-0 w-full h-full text-black text-center pt-[76px] text-xl">
              <p>This season,</p>
              <p className="flex justify-center items-center pt-4">
                <span>your</span>
                <span className="relative w-[35px] h-[24px] inline-block mx-1">
                  <Image
                    src="/butter-coin.png"
                    width={25}
                    height={24}
                    alt="coin"
                    className="absolute left-0 -top-2"
                  />
                  <Image
                    src="/butter-coin.png"
                    width={25}
                    height={24}
                    alt="coin"
                    className="absolute left-3 top-0 opacity-80"
                  />
                </span>
                <span>are</span>
              </p>
              <p>gonna be donated</p>

              <p className="relative flex justify-center mt-[23px]">
                <Image
                  src="/home/where-to-donate-border.png"
                  width={259}
                  height={67}
                  alt="border"
                />
                <div className=" w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                  <p>Vote for the</p>
                  <p>Donation Destination</p>
                </div>
              </p>
              <p className="pt-[23px]">{totalDonateLog.length} donors</p>
              <p>have stacked</p>
              <p>their butter so far</p>
            </div>
            <button
              className="absolute top-8 right-14 px-2 py-1 text-black font-bold"
              onClick={() => setIsDonateInfoOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
