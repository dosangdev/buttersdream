"use client";

import ProgressBar from "@/components/donate/ProgressBar";
import { useDonationProgress } from "@/hooks/useDonationProgress";
import Image from "next/image";

export default function Home() {
  const { currentAmount, targetAmount, isLoading } = useDonationProgress();

  return (
    <main className="flex flex-col items-center pt-[25px] relative select-none">
      <div className="w-full max-w-md px-4">
        {!isLoading && (
          <ProgressBar
            currentAmount={currentAmount}
            targetAmount={targetAmount}
          />
        )}
      </div>
      <div>
        <button className="cursor-pointer">
          <Image
            src="/home/butterfly-with-folded-wings.png"
            width={52}
            height={58}
            alt="Where to donate info button"
          />
        </button>
      </div>
    </main>
  );
}
