"use client";

import ProgressBar from "@/components/donate/ProgressBar";
import { useDonationProgress } from "@/hooks/useDonationProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const totalDonateLog = useTotaldonateLog();

  const butterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centerIndex, setCenterIndex] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      const distances = butterRefs.current.map((ref) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        return Math.abs(rect.top + rect.height / 2 - centerY);
      });
      const minIndex = distances.indexOf(Math.min(...distances));
      setCenterIndex(minIndex);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalDonateLog.length]);

  return (
    <>
      <main className="flex flex-col items-center pt-[25px] relative select-none">
        <div className="w-full max-w-md">
          {!isLoading && <ProgressBar />}
          {/* <div className="relative flex flex-col items-center pt-[51px]"> */}
          <div className="relative flex flex-col items-center pt-[80px] pb-[50px]">
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

                  // 거리 기반 스타일 계산
                  const isCenter = index === centerIndex;
                  const distance = Math.abs(index - centerIndex);
                  // scale, opacity를 연속 수식으로 계산
                  const maxScale = 1.25;
                  const minScale = 0.4;
                  const maxOpacity = 1;
                  const minOpacity = 0;
                  const maxDistance = 4;
                  const normDist = Math.min(distance, maxDistance);
                  const scale =
                    maxScale - ((maxScale - minScale) / maxDistance) * normDist;
                  const opacity =
                    maxOpacity -
                    ((maxOpacity - minOpacity) / maxDistance) * normDist;
                  let fontWeight = 700;
                  let fontSize = "text-base";
                  if (distance === 0) {
                    fontWeight = 900;
                    fontSize = "text-lg";
                  } else if (distance === 1) {
                    fontWeight = 700;
                    fontSize = "text-base";
                  } else if (distance === 2) {
                    fontWeight = 400;
                    fontSize = "text-sm";
                  } else {
                    fontWeight = 400;
                    fontSize = "text-xs";
                  }

                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        butterRefs.current[index] = el;
                      }}
                      className="relative -mt-[8px] cursor-pointer flex flex-col items-center"
                      style={{
                        zIndex: -index,
                        marginTop: isHappy ? "-10px" : undefined,
                        marginBottom: isHappy
                          ? "-7px"
                          : isSmiley
                          ? "-8px"
                          : isShocked
                          ? "-5px"
                          : isSurprised
                          ? "-5px"
                          : isConfused
                          ? "-5px"
                          : isAngry
                          ? "-6px"
                          : isNeutral
                          ? "-5px"
                          : undefined,
                      }}
                      onClick={() => {
                        window.open(
                          `https://farcaster.xyz/${item.farcasterUserData?.username}`
                        );
                      }}
                    >
                      <motion.div
                        className={`w-20 h-12 absolute -top-5 text-xs ${fontSize} z-10 bg-transparent
                          ${
                            index % 2 === 0
                              ? "right-[-90px] text-left items-start"
                              : "left-[-115px] text-left items-start"
                          }
                        `}
                        style={{
                          opacity,
                          fontWeight,
                          transform: `scale(${scale})`,
                          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                          pointerEvents: opacity === 0 ? "none" : "auto",
                          color: "#222",
                          textShadow: isCenter
                            ? "0 2px 8px #fff, 0 0px 1px #0002"
                            : "none",
                        }}
                      >
                        <div
                          className="relative w-[100px] h-12"
                          style={{
                            transform: `rotate(${
                              index % 2 === 0 ? "22deg" : "-22deg"
                            })`,
                          }}
                        >
                          <Image
                            src={`/${
                              isArrow
                                ? index % 2 === 0
                                  ? "my-bubble-right"
                                  : "my-bubble-left"
                                : index % 2 === 0
                                ? "bubble-right"
                                : "bubble-left"
                            }.png`}
                            width={100}
                            height={47}
                            alt="bubble"
                            className="absolute top-0 left-0 z-10"
                            style={{ objectFit: "contain" }}
                          />
                          <div className="absolute inset-0 flex flex-col pt-2  z-20 truncate overflow-hidden whitespace-nowrap">
                            <span className="truncate block text-center">
                              Hi, i'm
                            </span>
                            <span
                              className={`truncate block text-center ${
                                isArrow ? "text-[10px]" : "text-[8px]"
                              }`}
                            >
                              {isArrow
                                ? "Yours!!!"
                                : `@${item.farcasterUserData?.username}`}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        animate={
                          isArrow
                            ? { x: [0, index % 2 === 0 ? 4 : -4, 0] }
                            : { x: 0 }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                      >
                        <ButterItemComponent
                          fill={item?.farcasterUserData?.color as string}
                        />
                      </motion.div>
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
          {isAllColorReady && (
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
          )}
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

                <p
                  className="relative flex justify-center mt-[23px] cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLScstj_yD_zGpVJ22ZBINMgVNwFQB0MJLVDwdrNBQ8e_A2uDgA/viewform",
                      "_blank"
                    );
                  }}
                >
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
