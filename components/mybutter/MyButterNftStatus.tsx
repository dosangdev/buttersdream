import { butterComponents } from "@/app/constants/butterItems";
import Angry from "@/app/constants/butterItems/Angry";
import Confused from "@/app/constants/butterItems/Confused";
import Happy from "@/app/constants/butterItems/Happy";
import Neutral from "@/app/constants/butterItems/Neutral";
import Shocked from "@/app/constants/butterItems/Shocked";
import Smiley from "@/app/constants/butterItems/Smiley";
import Surprised from "@/app/constants/butterItems/Surprised";
import Image from "next/image";

export default function MyButterNftStatus({
  userData,
  totalValue,
}: {
  userData: any;
  totalValue: number;
}) {
  const butterComponents = [
    { component: Angry, type: "Angry" },
    { component: Confused, type: "Confused" },
    { component: Happy, type: "Happy" },
    { component: Neutral, type: "Neutral" },
    { component: Shocked, type: "Shocked" },
    { component: Smiley, type: "Smiley" },
    { component: Surprised, type: "Surprised" },
  ];

  const walletLastTwo = userData?.from?.slice(-2);
  const numericValue = parseInt(walletLastTwo, 16);
  const butterType = (numericValue % 7) + 1;
  const { component: ButterItemComponent, type: butterTypeName } =
    butterComponents[butterType - 1] || butterComponents[0];

  const isAngry = butterTypeName === "Angry";
  const isHappy = butterTypeName === "Happy";
  const isSmiley = butterTypeName === "Smiley";
  const isNeutral = butterTypeName === "Neutral";
  const isConfused = butterTypeName === "Confused";
  const isShocked = butterTypeName === "Shocked";
  const isSurprised = butterTypeName === "Surprised";

  return (
    <div className="flex flex-col items-center">
      <p>You Donated {totalValue} USDC</p>
      <div className=" w-full mt-[24px]  mx-auto">
        <div
          className=" flex justify-center mr-2"
          style={{
            marginBottom: isSmiley
              ? "-13px"
              : isShocked
              ? "-10px"
              : isHappy
              ? "-15px"
              : isConfused
              ? "-10px"
              : isAngry
              ? "-11px"
              : isNeutral
              ? "-10px"
              : "0px",
            zIndex: 50,
            position: "relative",
          }}
        >
          <ButterItemComponent fill={userData?.farcasterUserData?.color} />
        </div>
        <div className="relative flex flex-col items-center mt-[-8px]">
          <Image
            src="/butter-melting.png"
            width={120}
            height={73}
            alt="butter-melting"
            className="z-10"
            style={{
              zIndex: 10,
              position: "relative",
            }}
          />
          <Image
            src="/donate/bread.png"
            width={248}
            height={113}
            alt="bread"
            className="-mt-[60px] z-0"
          />
          <p className="text-white -mt-[30px] z-30 font-bold">
            @{userData?.farcasterUserData?.username}
          </p>
        </div>
      </div>
      <div className="mt-[30px] flex items-center">
        <span className="font-bold pr-[14px]">NFT</span>
        <div className="flex items-center gap-1 pr-3">
          <span className="inline-block w-[18px] h-[18px] bg-primary rounded-md border-2 border-black"></span>
          <span className="">Reserved</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-[18px] h-[18px] bg-white rounded-md border-2 border-black"></span>
          <span className="">Not yet</span>
        </div>
      </div>
    </div>
  );
}
