"use client";

import Image from "next/image";
import AnimatedSpeechBubbleText from "../animations/AnimatedSpeechBubbleText";
import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { formatAddress } from "@/app/utils/strings";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useSWR from "swr";
import {
  getDominantColor,
  rgbToHex,
  walletToHex,
} from "@/app/utils/colorExtractor";
import { butterComponents } from "@/app/constants/butterItems";

const BASE_USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const RECEIVER_ADDRESS = "0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db";

const erc20ABI = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

export default function DonateFlow() {
  const [donateAmount, setDonateAmount] = useState("");
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { address } = useAccount();
  const [color, setColor] = useState<string | null>(null);

  const { data: userData } = useSWR(
    `/api/lookup-user?walletAddress=${address}`
  );

  useEffect(() => {
    async function fetchColor() {
      if (userData && userData[0]?.pfp_url) {
        // Farcaster 유저가 있을 때
        const dominantColor = await getDominantColor(userData[0].pfp_url);
        setColor(rgbToHex(...dominantColor)); // hex로 변환해서 저장
      } else if (address) {
        // Farcaster 유저가 없을 때
        setColor(walletToHex(address));
      }
    }
    fetchColor();
  }, [userData, address]);

  const showSkip = step >= 3 && step <= 7;

  return (
    <>
      {step === 0 && (
        <DonateConnectWallet
          onNext={() => setStep(1)}
          address={address || ""}
        />
      )}
      {step === 1 && (
        <WannaDonate
          donateAmount={donateAmount}
          setDonateAmount={setDonateAmount}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <DonateSuccess donateAmount={donateAmount} onNext={() => setStep(3)} />
      )}
      {step === 3 && <ButterCreationIntro onNext={() => setStep(4)} />}
      {step >= 4 && (
        <ButterCreationMain
          step={step}
          onNext={() => setStep(step + 1)}
          router={router}
          color={color}
          address={address || ""}
        />
      )}
      {showSkip && (
        <button
          onClick={() => setStep(8)}
          className="fixed bottom-20 left-4 bg-white rounded-3xl z-50"
        >
          <div
            className="flex px-[13px] py-[6px] text-secondary text-sm gap-2 select-none"
            draggable={false}
          >
            <Image
              src="/tutorial/tutorial-skip-button.png"
              width={21}
              height={13}
              alt="skip button"
              priority
            />
            <span>Skip</span>
          </div>
        </button>
      )}
    </>
  );
}

export function DonateConnectWallet({
  onNext,
  address,
}: {
  onNext: () => void;
  address: string;
}) {
  return (
    <div className="relative w-[358px] h-[105px] mb-[11px] mx-auto">
      <div
        className="fixed min-w-full min-h-full z-50"
        onClick={address ? onNext : undefined}
      />
      <Image
        src="/tutorial/eee.png"
        width={358}
        height={105}
        alt="speech bubble Image"
        className="object-contain"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSpeechBubbleText
          text={
            address
              ? `Your wallet is connected:\n${formatAddress(address)}`
              : `Connect\n your wallet`
          }
          className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center"
        />
      </div>
      <div className="pt-[11px] flex flex-col items-center ">
        <Image
          src={
            address
              ? "/butter-melting.png"
              : "/tutorial/tutorial-butter-basic.png"
          }
          alt="wallet image"
          width={address ? 121 : 100}
          height={address ? 80 : 75}
          className="z-10"
        />
        <Image
          src="/donate/bread.png"
          alt="bread image"
          width={220}
          height={106}
          className="-mt-[50px] z-0"
        />
      </div>
    </div>
  );
}

export function WannaDonate({
  donateAmount,
  setDonateAmount,
  onNext,
}: {
  donateAmount: string;
  setDonateAmount: (amount: string) => void;
  onNext: () => void;
}) {
  const amount =
    donateAmount && !isNaN(Number(donateAmount))
      ? parseUnits(donateAmount, 6)
      : undefined;

  const { writeContract, isPending, isSuccess, error } = useWriteContract();
  const handleDonate = () => {
    if (!donateAmount || isNaN(Number(donateAmount))) {
      alert("Please enter a valid number");
      return;
    }
    writeContract({
      address: BASE_USDC_ADDRESS,
      abi: erc20ABI,
      functionName: "transfer",
      args: [RECEIVER_ADDRESS, amount],
      chainId: 8453,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자와 소수점만 허용하는 정규식, 소수점 6자리로 제한
    if (/^\d*\.?\d{0,6}$/.test(value)) {
      setDonateAmount(value);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  if (error) {
    alert("failed to donate " + error.message);
  }

  return (
    <div className="relative w-[358px] h-[105px] mb-[11px] mx-auto">
      <Image
        src="/tutorial/eee.png"
        width={358}
        height={105}
        alt="speech bubble Image"
        className="object-contain"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSpeechBubbleText
          text={`How much $Butter\n do you wanna donate?`}
          className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center"
        />
      </div>
      <div className="pt-[11px] flex flex-col items-center ">
        <Image
          src="/butter-melting.png"
          alt="wallet image"
          width={121}
          height={80}
          className="z-10"
        />
        <Image
          src="/donate/bread.png"
          alt="bread image"
          width={220}
          height={106}
          className="-mt-[50px] z-0"
        />
      </div>
      <div className="w-[220px] mx-auto flex flex-col  text-center bg-primary rounded-xl py-3 px-5 text-black text-base mt-5">
        <p>I wanna donate</p>
        <div className="flex justify-between items-center">
          <Image
            src="/donate/donate-input-arrow.png"
            alt="donate input arrow"
            width={13}
            height={15}
          />
          <div className="relative flex ">
            <Image
              src="/donate/donate-input.png"
              alt="donate input"
              width={107}
              height={28}
              className="z-10"
            />

            <input
              type="text"
              className="absolute inset-0 z-20 bg-transparent text-[8px] pl-2 outline-none"
              placeholder="Enter the amount"
              value={donateAmount}
              onChange={handleInputChange}
              inputMode="decimal"
            />
          </div>
          <span>$USDC</span>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="w-[116px] h-[30px] text-md text-black rounded-2xl mx-auto bg-white border-2 border-black"
          onClick={handleDonate}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Donate!"}
        </button>
      </div>
    </div>
  );
}

export function DonateSuccess({
  donateAmount,
  onNext,
}: {
  donateAmount: string;
  onNext: () => void;
}) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [rotateCoin, setRotateCoin] = useState(false);
  const [hideCoin, setHideCoin] = useState(false);

  useEffect(() => {
    // 코인 등장
    setShowCoin(true);

    // 효과 표시
    setTimeout(() => {
      setShowEffect(true);
    }, 500);

    // 코인 회전
    setTimeout(() => {
      setRotateCoin(true);
    }, 1000);

    // 코인 사라짐 (회전이 끝난 후)
    setTimeout(() => {
      setHideCoin(true);
    }, 3000);

    // 코인 완전히 사라짐
    setTimeout(() => {
      setShowCoin(false);
      setShowEffect(false);
      setRotateCoin(false);
    }, 3500);

    // 말풍선 표시
    setTimeout(() => {
      setShowSpeechBubble(true);
    }, 4000);
  }, []);

  return (
    <div className="relative w-[358px] mb-[11px] mx-auto">
      <div
        className="fixed min-w-full min-h-full z-50"
        onClick={showSpeechBubble ? onNext : undefined}
      />
      <div className="h-[105px] relative">
        {showSpeechBubble && (
          <>
            <Image
              src="/tutorial/eee.png"
              width={358}
              height={105}
              alt="speech bubble Image"
              className="object-contain animate-fadeIn"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedSpeechBubbleText
                text={`You've successfully donated\n ${donateAmount} $USDC`}
                className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center animate-fadeIn"
              />
            </div>
          </>
        )}
        {showCoin && (
          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            {showEffect && (
              <div
                className={`absolute -top-5 -left-7 w-[120px] h-[90px] ${
                  hideCoin ? "animate-coinDisappear" : ""
                }`}
              >
                <Image
                  src="/donate/donate-coin-effect.png"
                  alt="coin effect"
                  fill
                  className="animate-pulse z-0"
                />
              </div>
            )}
            <div
              className={`transition-all duration-500 perspective-[1000px] origin-center ${
                rotateCoin ? "animate-coinRotate" : ""
              }`}
            >
              <Image
                src="/butter-coin.png"
                alt="coin"
                width={60}
                height={60}
                className={`${
                  hideCoin
                    ? "animate-coinDisappear"
                    : showCoin
                    ? "animate-coinAppear"
                    : ""
                } z-10`}
              />
            </div>
          </div>
        )}
      </div>
      <div className="pt-[11px] flex flex-col items-center relative">
        <Image
          src="/butter-melting.png"
          alt="wallet image"
          width={121}
          height={81}
          className="z-10"
        />

        <Image
          src="/donate/bread.png"
          alt="bread image"
          width={220}
          height={106}
          className="-mt-[50px] z-0"
        />
      </div>
    </div>
  );
}

export function ButterCreationIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative w-[358px] h-[105px] mb-[11px] mx-auto">
      <div className="fixed min-w-full min-h-full z-50" onClick={onNext} />
      <Image
        src="/tutorial/eee.png"
        width={358}
        height={105}
        alt="speech bubble Image"
        className="object-contain"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedSpeechBubbleText
          text={`I think\n something is happening.!`}
          className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center"
        />
      </div>
      <div className="pt-[11px] flex flex-col items-center ">
        <Image
          src="/donate/butter-suspect.png"
          alt="wallet image"
          width={120}
          height={75}
          className="z-10"
        />
        <Image
          src="/donate/bread.png"
          alt="bread image"
          width={220}
          height={106}
          className="-mt-[50px] z-0"
        />
      </div>
    </div>
  );
}

function getSpeechText(step: number) {
  switch (step) {
    case 4:
      return "Hello there!\nI'm your butter!";
    case 5:
      return "Thanks for making\n this tiny miracle with me!";
    case 6:
      return "I'm just a\n smoll piece of butter...🧈";
    case 7:
      return "Together,\n we'll spark a butterfly effect!";
    case 8:
      return "Do you wanna share\n your story?";
    default:
      return "";
  }
}

export function ButterCreationMain({
  step,
  onNext,
  router,
  color,
  address,
}: {
  step: number;
  onNext: () => void;
  router: AppRouterInstance;
  color: string | null;
  address: string;
}) {
  const [currentButterIndex, setCurrentButterIndex] = useState(-1);
  const [showMainUI, setShowMainUI] = useState(false);
  const [dots, setDots] = useState("");
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [showSurprisedButter, setShowSurprisedButter] = useState(false);

  useEffect(() => {
    if (step === 4) {
      // 0.5초마다 다음 버터 표시
      const interval = setInterval(() => {
        setCurrentButterIndex((prev) => {
          if (prev >= 6) {
            // 모든 버터를 보여줬으면
            clearInterval(interval);
            setShowMainUI(true); // 메인 UI 표시
            return prev;
          }
          return prev + 1;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 4 && !showMainUI) {
      const dotInterval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") return ".";
          if (prev === "..") return "...";
          if (prev === ".") return "..";
          return ".";
        });
      }, 500);

      return () => clearInterval(dotInterval);
    }
  }, [step, showMainUI]);

  useEffect(() => {
    if (showMainUI) {
      // 버터가 떨어지고 나서 말풍선이 나타나도록 타이밍 조정
      const timer = setTimeout(() => {
        setShowSurprisedButter(true);
        // 1초 후에 다시 melting으로 돌아가고 말풍선 표시
        const returnTimer = setTimeout(() => {
          setShowSurprisedButter(false);
          setShowSpeechBubble(true);
        }, 1000);
        return () => clearTimeout(returnTimer);
      }, 1000); // butterDrop 애니메이션이 끝난 후

      return () => clearTimeout(timer);
    }
  }, [showMainUI]);

  if (step >= 9) {
    router.push("/");
    return null;
  }

  const walletLastTwo = address?.slice(-2);
  const numericValue = parseInt(walletLastTwo, 16);
  const butterType = (numericValue % 7) + 1;
  const ButterItemComponent =
    butterComponents[butterType - 1] || butterComponents[0];

  if (step === 4 && !showMainUI) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-black pb-5 text-3xl">creating{dots}</p>
        {currentButterIndex >= 0 && (
          <div className="animate-fadeIn">
            {butterComponents[currentButterIndex]({ fill: "#fbf6ca" })}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative w-[358px] h-[105px] mb-[11px] mx-auto">
        <div
          className="fixed min-w-full min-h-full z-50"
          onClick={showSpeechBubble ? onNext : undefined}
        />
        <div className="h-[105px]">
          {showSpeechBubble ? (
            <>
              <Image
                src="/tutorial/eee.png"
                width={358}
                height={105}
                alt="speech bubble Image"
                className="object-contain animate-speechBubbleAppear"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedSpeechBubbleText
                  text={getSpeechText(step)}
                  className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center animate-speechBubbleAppear"
                />
              </div>
            </>
          ) : null}
        </div>
        <div className="pt-[11px] flex flex-col items-center ">
          <div className="-mr-[-10px]">
            <div className={showMainUI ? "animate-butterDrop" : ""}>
              <ButterItemComponent fill={color || ""} />
            </div>
          </div>
          <Image
            src={
              showSurprisedButter
                ? "/donate/donate-surprised-butter.png"
                : "/butter-melting.png"
            }
            alt="wallet image"
            width={showSurprisedButter ? 149 : 121}
            height={showSurprisedButter ? 100 : 81}
            className="z-10 -mt-[4px] animate-fadeIn"
            style={{
              marginTop: showSurprisedButter ? "-35px" : "-4px",
              marginRight: showSurprisedButter ? "-25px" : "0px",
            }}
          />
          <Image
            src="/donate/bread.png"
            alt="bread image"
            width={220}
            height={106}
            className="-mt-[50px] z-0"
          />
        </div>
      </div>
    </>
  );
}
