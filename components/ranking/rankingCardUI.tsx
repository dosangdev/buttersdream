import { butterComponents } from "@/app/constants/butterItems";
import { cn } from "@/app/utils/cn";
import { formatAddress } from "@/app/utils/strings";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const typeToImage = {
  first: "1st",
  second: "2st",
  third: "3st",
};

export default function RankingCardUI({
  userData,
  index,
  cardType,
}: {
  userData: any;
  index?: number;
  cardType: "my" | undefined;
}) {
  const router = useRouter();

  //   console.log(address);
  //   console.log(userData?.from);
  //   console.log(address?.toLowerCase() === userData?.from.toLowerCase());
  const handleClick = (path: string) => {
    router.push(path);
  };

  const walletLastTwo = userData?.from?.slice(-2);
  const numericValue = parseInt(walletLastTwo, 16);
  const butterType = (numericValue % 7) + 1;
  const ButterItemComponent =
    butterComponents[butterType - 1] || butterComponents[0];

  return (
    <>
      {/* 기본카드 */}
      <div
        className={cn(
          " flex items-center w-full  rounded-2xl border-2 border-[#D6D6D6] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]", // 공통 클래스
          userData?.type === "first" && "border-4 border-[#D7AE00] rounded-2xl",
          userData?.type === "second" &&
            "border-4 border-[#6c6c6c] rounded-2xl",
          userData?.type === "third" && "border-4 border-[#985323] rounded-2xl",
          cardType === "my" &&
            " border-4 border-[#d6d6d6] rounded-2xl shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] mb-[25px]"
        )}
        onClick={() =>
          handleClick(
            `https://farcaster.xyz/${userData?.farcasterUserData?.username}`
          )
        }
      >
        <div
          className={cn(
            "flex items-center justify-between  rounded-xl px-4  h-[50px] text-black w-full text-sm",
            userData?.type === "default" &&
              "bg-white border-1 border-[#d6d6d6] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]",
            userData?.type === "first" && "bg-[#FFF1B4]",
            userData?.type === "second" && "bg-[#DCDCDC]",
            userData?.type === "third" && "bg-[#FFCCA9]",
            cardType === "my" && "bg-white"
          )}
        >
          <div className="flex-shrink-0 basis-[40px] text-lg text-start">
            {cardType === "my" && !userData?.farcasterUserData ? (
              <div className="pl-2 ">?</div>
            ) : userData?.type !== "default" ? (
              cardType === "my" ? (
                <div className="pl-2 ">{userData?.ranking}</div>
              ) : (
                <Image
                  src={`/ranking/ranking-${
                    typeToImage[userData?.type as keyof typeof typeToImage]
                  }.png`}
                  // src={`/ranking/ranking-1st.png`}
                  width={19}
                  height={26}
                  alt="ranking"
                />
              )
            ) : (
              <div className="pl-2 ">{userData?.ranking}</div>
            )}
          </div>
          <div className="flex-shrink-0 basis-[52px] flex justify-center items-center py-[7px] w-[15px] h-[15px]">
            {cardType === "my" && !userData?.farcasterUserData ? (
              <Image
                src="/mybutter/empty-my-butter.png"
                width={35}
                height={24}
                alt="empty-my-butter"
              />
            ) : (
              <ButterItemComponent fill={userData?.farcasterUserData?.color} />
            )}
          </div>
          <div className="flex-1 px-2 truncate text-start">
            {cardType === "my" && !userData?.farcasterUserData ? (
              <div className="pl-2 ">@{formatAddress(userData?.from)}</div>
            ) : (
              <div className="pl-2 ">
                @{userData?.farcasterUserData?.username}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 basis-[80px] text-right">
            {userData?.value} USDC
          </div>
        </div>
      </div>
    </>
  );
}
