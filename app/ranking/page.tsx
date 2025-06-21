"use client";

import { useState } from "react";
import RankingList from "@/components/ranking/rankingList";

export default function RankingPage() {
  const [selectedTab, setSelectedTab] = useState<"daily" | "weekly" | "total">(
    "weekly"
  );

  return (
    // <main className="flex flex-col items-center  pt-[21px] pb-[20px] relative select-none">
    // <main className="flex flex-col items-center pt-[21px] pb-16 px-4 relative select-none">
    <main className="flex flex-col items-center relative select-none flex-grow">
      {/* <div className="w-full max-w-md"> */}
      <div className="w-full flex flex-col items-center flex-grow">
        {/* 탭 버튼 */}
        <div className="w-full flex justify-center px-4">
          <div className=" w-full max-w-md  mt-[21px] flex  h-[24px] text-sm rounded-full border-2 border-black bg-white ">
            {/* <button
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
          </button> */}
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
        </div>
        {/* 탭별 내용 예시 */}
        <div className=" w-full  mt-[106px] text-center text-xl font-semibold flex-grow flex flex-col">
          <RankingList type={selectedTab} />
        </div>
      </div>
    </main>
  );
}
