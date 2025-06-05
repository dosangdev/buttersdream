"use client";

import EmptyMyDonation from "@/components/mybutter/EmptyMyDonation";
import MyButterDonationList from "@/components/mybutter/MyButterDonationList";
import MyButterNftStatus from "@/components/mybutter/MyButterNftStatus";
import { useMyButterDonateLog } from "@/hooks/useMyButterDonateLog";

export default function MyButterPage() {
  const { myDonationLogs, totalValue } = useMyButterDonateLog();
  console.log(myDonationLogs);
  return (
    <main className="w-full max-w-md mx-auto flex flex-col items-center pt-[29px] pb-[20px] relative select-none text-black text-base">
      {myDonationLogs.length === 0 ? (
        <EmptyMyDonation />
      ) : (
        <div className="w-full">
          <MyButterNftStatus
            userData={myDonationLogs[0]}
            totalValue={totalValue}
          />
          <MyButterDonationList userData={myDonationLogs} />
        </div>
      )}
    </main>
  );
}
