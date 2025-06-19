import Image from "next/image";
import AnimatedSpeechBubbleText from "./animations/AnimatedSpeechBubbleText";

export default function ConnectWallet() {
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
      <div className="absolute inset-0 -top-[10px] flex items-center justify-center">
        <AnimatedSpeechBubbleText
          text={`Connect\n your wallet`}
          className="text-black text-xl leading-7 whitespace-pre-line z-50 text-center"
        />
      </div>
      <div className="pt-[11px] flex flex-col items-center ">
        <Image
          src={"/tutorial/tutorial-butter-basic.png"}
          alt="wallet image"
          width={100}
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
