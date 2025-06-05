"use client";

import { useState } from "react";
import RankingList from "@/components/ranking/rankingList";

export default function RankingPage() {
  const [selectedTab, setSelectedTab] = useState<"daily" | "weekly" | "total">(
    "daily"
  );

  return (
    <main className="flex flex-col items-center pt-[21px] pb-[20px] relative select-none">
      <div className="w-full max-w-md">
        {/* 탭 버튼 */}
        <div className="flex w-full h-[24px] text-sm rounded-full border-2 border-black bg-white">
          <button
            className={`flex-1 h-full rounded-full transition-colors duration-150
              ${
                selectedTab === "daily"
                  ? "bg-primary text-black rounded-full "
                  : "bg-transparent text-gray-500"
              }
            `}
            onClick={() => setSelectedTab("daily")}
          >
            Daily
          </button>
          <button
            className={`flex-1 h-full rounded-full transition-colors duration-150
              ${
                selectedTab === "weekly"
                  ? "bg-primary text-black"
                  : "bg-transparent text-gray-500"
              }
            `}
            onClick={() => setSelectedTab("weekly")}
          >
            Weekly
          </button>
          <button
            className={`flex-1 h-full rounded-full transition-colors duration-150
              ${
                selectedTab === "total"
                  ? "bg-primary text-black"
                  : "bg-transparent text-gray-500"
              }
            `}
            onClick={() => setSelectedTab("total")}
          >
            Total
          </button>
        </div>
        {/* 탭별 내용 예시 */}
        <div className="mt-[106px] text-center text-xl font-semibold">
          <RankingList type={selectedTab} />
        </div>
      </div>
    </main>
  );
}
