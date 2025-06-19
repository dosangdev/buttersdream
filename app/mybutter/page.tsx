"use client";

import ConnectWallet from "@/components/ConnectWallet";
import EmptyMyDonation from "@/components/mybutter/EmptyMyDonation";
import MyButterDonationList from "@/components/mybutter/MyButterDonationList";
import MyButterNftStatus from "@/components/mybutter/MyButterNftStatus";
import { useMyButterDonateLog } from "@/hooks/useMyButterDonateLog";
import { useAccount } from "wagmi";

export default function MyButterPage() {
  const { myDonationLogs, totalValue } = useMyButterDonateLog();
  console.log(myDonationLogs);
  const { address } = useAccount();
  return (
    <main className="w-full max-w-md mx-auto flex flex-col items-center pt-[29px] pb-[20px] relative select-none text-black text-base">
      {address ? (
        myDonationLogs.length === 0 ? (
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
