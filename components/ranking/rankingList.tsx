"use client";

import { butterComponents } from "@/app/constants/butterItems";
import { cn } from "@/app/utils/cn";
import { useTotalRanking } from "@/hooks/useTotalRanking";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RankingCardUI from "./rankingCardUI";
import { useAccount } from "wagmi";
import { useDailyRanking } from "@/hooks/useDailyRanking";
import { useWeeklyRanking } from "@/hooks/useWeeklyRanking";

const EmptyStateMessage = ({
  type,
}: {
  type: "daily" | "weekly" | "total";
}) => {
  const messages = {
    daily: (
      <>
        No donations today yet!
        <br />
        Be the first to make someone's day! 🎉
      </>
    ),
    weekly: (
      <>
        This week's donation board is empty!
        <br />
        Time to spread some love! 💝
      </>
    ),
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
      <Image
        src="/butter-cry.png"
        width={120}
        height={120}
        alt="butter-cry"
        className=""
      />
    </div>
  );
};

export default function RankingList({
  type,
}: {
  type: "daily" | "weekly" | "total";
}) {
  const { all: totalDonateLog, top3: totalTop3 } = useTotalRanking();
  const { all: dailyDonateLog, top3: dailyTop3 } = useDailyRanking();
  const { all: weeklyDonateLog, top3: weeklyTop3 } = useWeeklyRanking();
  const { address } = useAccount();
  console.log(totalDonateLog);

  // 현재 선택된 탭에 따라 데이터 선택
  const currentData =
    type === "daily"
      ? dailyDonateLog
      : type === "weekly"
      ? weeklyDonateLog
      : totalDonateLog;

  const currentTop3 =
    type === "daily" ? dailyTop3 : type === "weekly" ? weeklyTop3 : totalTop3;

  const myCard = address
    ? currentData.find(
        (item) => item.from.toLowerCase() === address.toLowerCase()
      ) || (address ? { from: address } : null)
    : null;

  console.log(myCard);

  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  // 데이터가 없을 경우 EmptyStateMessage 표시
  if (currentData.length === 0) {
    return <EmptyStateMessage type={type} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="pb-[5px]">
        <div className="relative w-full flex items-center justify-around">
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
              className="absolute right-6 -top-10"
            />
          )}

          {currentTop3.map((item, index) => {
            const walletLastTwo = item?.from?.slice(-2);
            const numericValue = parseInt(walletLastTwo, 16);
            const butterType = (numericValue % 7) + 1;
            const ButterItemComponent =
              butterComponents[butterType - 1] || butterComponents[0];
            return (
              <div
                key={index}
                className={cn(
                  "absolute ",
                  index === 1 && "left-0 top-0",
                  index === 2 && "right-1 top-1"
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
              </div>
            );
          })}
        </div>
        <Image
          src="/ranking/ranking-bread.png"
          width={248}
          height={112}
          alt="ranking-bread"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-[9px] pt-[25px]">
        {myCard && (
          <RankingCardUI userData={myCard} cardType="my" key={myCard.from} />
        )}
        {currentData.map((item, index) => (
          <RankingCardUI
            userData={item}
            cardType={undefined}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
