import { butterComponents } from "@/app/constants/butterItems";
import Image from "next/image";

export default function MyButterNftStatus({
  userData,
  totalValue,
}: {
  userData: any;
  totalValue: number;
}) {
  const walletLastTwo = userData?.from?.slice(-2);
  const numericValue = parseInt(walletLastTwo, 16);
  const butterType = (numericValue % 7) + 1;
  const ButterItemComponent =
    butterComponents[butterType - 1] || butterComponents[0];

  return (
    <div className="flex flex-col items-center">
      <p>You Donated {totalValue} USDC</p>
      <div className=" w-full mt-[24px]  mx-auto">
        <div className=" flex justify-center mr-2">
          <ButterItemComponent fill={userData?.farcasterUserData?.color} />
        </div>
        <div className="relative flex flex-col items-center mt-[-8px]">
          <Image
            src="/butter-melting.png"
            width={113}
            height={68}
            alt="butter-melting"
            className="z-10"
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
