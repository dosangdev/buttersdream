"use client";

import ConnectWallet from "@/components/ConnectWallet";
import EmptyMyDonation from "@/components/mybutter/EmptyMyDonation";
import MyButterDonationList from "@/components/mybutter/MyButterDonationList";
import MyButterNftStatus from "@/components/mybutter/MyButterNftStatus";
import { useMyButterDonateLog } from "@/hooks/useMyButterDonateLog";
import { useTotaldonateLog } from "@/hooks/useTotaldonateLog";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function MyButterPage() {
  const { myDonationLogs, totalValue } = useMyButterDonateLog();
  const { address } = useAccount();
  const totalDonateLogForColor = useTotaldonateLog();
  const [showContent, setShowContent] = useState(false);

  const isAllColorReady =
    totalDonateLogForColor.length > 0 &&
    totalDonateLogForColor.every(
      (item) =>
        typeof item.farcasterUserData?.color === "string" &&
        item.farcasterUserData?.color.startsWith("#")
    );

  useEffect(() => {
    if (isAllColorReady) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isAllColorReady]);

  return (
    <main className="w-full max-w-md mx-auto flex flex-col items-center pt-[29px] pb-[20px] relative select-none text-black text-base">
      {address ? (
        !isAllColorReady || !showContent ? (
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
            <span className="text-gray-400">
              Loading My Butter information...
            </span>
          </div>
        ) : myDonationLogs.length === 0 ? (
          <EmptyMyDonation />
        ) : (
          <div className="w-full">
            <MyButterNftStatus
              userData={myDonationLogs[0]}
              totalValue={totalValue}
            />
            <MyButterDonationList userData={myDonationLogs} />
          </div>
        )
      ) : (
        <div className="pt-[80px]">
          <ConnectWallet />
        </div>
      )}
      {/* {myDonationLogs.length === 0 ? (
        <EmptyMyDonation />
      ) : (
        <div className="w-full">
          <MyButterNftStatus
            userData={myDonationLogs[0]}
            totalValue={totalValue}
          />
          <MyButterDonationList userData={myDonationLogs} />
        </div>
      )} */}
    </main>
  );
}
