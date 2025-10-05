"use client";

import { butterComponents } from "@/app/constants/butterItems";
import { cn } from "@/app/utils/cn";
import { useTotalRankingFromDonors } from "@/hooks/useTotalRankingFromDonors";
import { donors } from "@/data/donors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RankingCardUI from "./rankingCardUI";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const EmptyStateMessage = ({ type }: { type: "total" }) => {
  const messages = {
    total: (
      <>
        No donations yet!
        <br />
        Be the pioneer of kindness! 🌟
      </>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <p className="text-lg font-medium text-gray-600">{messages[type]}</p>
      <Image src="/butter-cry.png" width={120} height={120} alt="butter-cry" />
    </div>
  );
};

export default function RankingList({ type }: { type: "total" }) {
  const {
    all: totalDonateLog,
    top3: totalTop3,
    basicCardData: totalBasicCardData,
  } = useTotalRankingFromDonors();
  const { address } = useAccount();
  const router = useRouter();

  // const totalDonateLogForColor = useTotaldonateLog();
  const totalDonateLogForColor = donors;
  const [showContent, setShowContent] = useState(false);

  const isAllColorReady = totalDonateLogForColor.length > 0;
  // totalDonateLogForColor.length > 0 &&
  // totalDonateLogForColor.every(
  //   (item) =>
  //     typeof item.farcasterUserData?.color === "string" &&
  //     item.farcasterUserData?.color.startsWith("#")
  // );

  useEffect(() => {
    if (isAllColorReady) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isAllColorReady]);

  // 현재 선택된 탭에 따라 데이터 선택 (Total만 사용)
  const currentData = totalDonateLog;
  const currentTop3 = totalTop3;
  const basicCardData = totalBasicCardData;

  // color 정보가 로딩되지 않았거나 0.5초 대기 시간이 지나지 않았을 때 로딩 상태 표시
  if (!isAllColorReady || !showContent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
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
        <span className="text-gray-400">Loading Ranking information...</span>
      </div>
    );
  }

  const myCard = address
    ? currentData.find(
        (item) => item.walletAddress.toLowerCase() === address.toLowerCase()
      ) || (address ? { walletAddress: address } : null)
    : null;

  // totalDonateLog랑 weeklyDonateLog 불러오는 데이터를 변경
  // 1.

  const handleClick = (path: string) => {
    router.push(path);
  };

  // 데이터가 없을 경우 EmptyStateMessage 표시
  if (currentData.length === 0) {
    return <EmptyStateMessage type={type} />;
  }

  return (
    <div className="flex flex-col items-center flex-grow">
      <div className="flex-shrink-0">
        <div className="relative w-full flex items-center justify-around ">
          {/* 2등 이미지 - 1명 이상일 때 표시 */}
          {currentTop3.length >= 1 && (
            <Image
              src="/ranking/ranking-2st.png"
              width={21}
              height={29}
              alt="ranking-2nd"
              className="absolute left-8 -top-10"
            />
          )}
          {/* 1등 이미지 - 1명 이상일 때 표시 */}
          {currentTop3.length >= 1 && (
            <Image
              src="/ranking/ranking-1st.png"
              width={22}
              height={30}
              alt="ranking-1st"
              className="absolute -top-20"
            />
          )}
          {/* 3등 이미지 - 1명 이상일 때 표시 */}
          {currentTop3.length >= 1 && (
            <Image
              src="/ranking/ranking-3st.png"
              width={19}
              height={32}
              alt="ranking-3rd"
              className="absolute right-8 -top-10"
            />
          )}

          {currentTop3.map((item, index) => {
            const walletLastTwo = item?.walletAddress?.slice(-2);
            const numericValue = parseInt(walletLastTwo, 16);
            const butterType = (numericValue % 7) + 1;
            const ButterItemComponent =
              butterComponents[butterType - 1] || butterComponents[0];
            return (
              <div
                key={index}
                className={cn(
                  "absolute z-50",
                  index === 1 && "-left-2 top-0",
                  index === 2 && "-right-4 top-1"
                )}
                onClick={() =>
                  handleClick(
                    `https://farcaster.xyz/${item?.farcasterUserData?.username}`
                  )
                }
              >
                <ButterItemComponent
                  fill={item?.farcasterUserData?.color as string}
                />
                <div
                  className={cn(
                    "absolute -top-11 flex flex-col text-start w-full text-black text-[8px]",
                    index === 0 && "-right-16",
                    index === 1 && "-left-14 text-end -top-9",
                    index === 2 && "-right-[50px] -top-10"
                  )}
                >
                  <p className="">@{item?.farcasterUserData?.username}</p>
                  <p>{item?.donationAmount} USDC</p>
                </div>
              </div>
            );
          })}
        </div>
        <Image
          src="/ranking/ranking-bread.png"
          width={248}
          height={112}
          alt="ranking-bread"
          priority={true}
          className="relative z-10"
        />
      </div>
      <div
        className={cn(
          "w-full flex justify-center bg-primary -mt-[30px]  border-t-4 border-black flex-grow pb-[90px]"
        )}
      >
        <div className="w-full max-w-md px-4 flex flex-col  items-center gap-[10px] pt-[50px] hide-scrollbar">
          {myCard && (
            <RankingCardUI
              userData={myCard}
              cardType="my"
              key={myCard.walletAddress}
            />
          )}
          {basicCardData &&
            basicCardData.map((item, index) => (
              <RankingCardUI
                userData={item || undefined}
                cardType={undefined}
                index={index + currentTop3.length}
                key={item.walletAddress || index}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
