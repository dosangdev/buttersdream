"use client";

import ProgressBar from "@/components/donate/ProgressBar";
import { useDonationProgress } from "@/hooks/useDonationProgress";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { butterComponents } from "./constants/butterItems";
import { sdk } from "@farcaster/frame-sdk";

import { useAccount } from "wagmi";
import { useTotaldonateLog } from "@/hooks/useTotaldonateLog";
import { motion } from "framer-motion";
import Angry from "./constants/butterItems/Angry";
import Happy from "./constants/butterItems/Happy";
import Smiley from "./constants/butterItems/Smiley";
import Neutral from "./constants/butterItems/Neutral";
import Shocked from "./constants/butterItems/Shocked";
import Surprised from "./constants/butterItems/Surprised";
import Confused from "./constants/butterItems/Confused";
import Head from "next/head";

const butterComponents = [
  { component: Angry, type: "Angry" },
  { component: Confused, type: "Confused" },
  { component: Happy, type: "Happy" },
  { component: Neutral, type: "Neutral" },
  { component: Shocked, type: "Shocked" },
  { component: Smiley, type: "Smiley" },
  { component: Surprised, type: "Surprised" },
];

export default function Home() {
  const { isLoading } = useDonationProgress();
  const [isDonateInfoOpen, setIsDonateInfoOpen] = useState(false);
  const { address } = useAccount();

  const totalDonateLog = useTotaldonateLog();

  const isAllColorReady =
    totalDonateLog.length > 0 &&
    totalDonateLog.every(
      (item) =>
        typeof item.farcasterUserData?.color === "string" &&
        item.farcasterUserData?.color.startsWith("#")
    );

  useEffect(() => {
    sdk.actions.ready();
    sdk.actions.ready({ disableNativeGestures: true });
    sdk.actions.addMiniApp();
  }, []);

  return (
    <>
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
                  const {
                    component: ButterItemComponent,
                    type: butterTypeName,
                  } = butterComponents[butterType - 1] || butterComponents[0];

                  const isAngry = butterTypeName === "Angry";
                  const isHappy = butterTypeName === "Happy";
                  const isSmiley = butterTypeName === "Smiley";
                  const isNeutral = butterTypeName === "Neutral";
                  const isShocked = butterTypeName === "Shocked";
                  const isSurprised = butterTypeName === "Surprised";
                  const isConfused = butterTypeName === "Confused";

                  const isArrow =
                    item.from.toLowerCase() === address?.toLowerCase();

                  return (
                    <div
                      key={index}
                      className="relative -mt-[8px]"
                      style={{
                        zIndex: -index,
                        marginBottom: isHappy
                          ? "-7px"
                          : isSmiley
                          ? "-5px"
                          : isShocked
                          ? "-5px"
                          : isSurprised
                          ? "-5px"
                          : isConfused
                          ? "-5px"
                          : isAngry
                          ? "-6px"
                          : undefined, // Happy일 때만 24px
                      }}
                    >
                      <motion.div
                        animate={
                          isArrow
                            ? { x: [0, index % 2 === 0 ? 4 : -4, 0] } // 조건이 true일 때
                            : { x: 0 } // 조건이 false일 때(움직이지 않음)
                        }
                        transition={{
                          duration: 2, // 한 번 왕복하는 데 걸리는 시간(초)
                          repeat: Infinity, // 무한 반복
                          repeatType: "loop",
                          ease: "easeInOut",
                          delay: index * 0.1, // 각 버터마다 살짝 딜레이 주면 자연스러움
                        }}
                      >
                        <ButterItemComponent
                          fill={item?.farcasterUserData?.color as string}
                        />
                      </motion.div>
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
              width={isDonateInfoOpen ? 79 : 65}
              height={isDonateInfoOpen ? 56 : 58}
              alt="Where to donate info button"
            />
          </button>
        </div>
        {/* 기부처 모달 */}
        {isDonateInfoOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="relative px-4">
              <Image
                src="/home/where-to-donate-modal.png"
                width={400}
                height={400}
                alt="Where to donate modal"
              />
              <div className="absolute top-0 left-0 w-full h-full text-black text-center pt-[56px] text-xl">
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
                className="absolute top-8 right-20 px-2 py-1 text-black font-bold"
                onClick={() => setIsDonateInfoOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
