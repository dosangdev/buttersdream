import Image from "next/image";
import AnimatedSpeechBubbleText from "@/components/animations/AnimatedSpeechBubbleText";
import { DonatePageData } from "./DonateData";

interface DonatePageComponentProps extends DonatePageData {}

export default function DonatePageComponent({
  speechText,
  image,
}: DonatePageComponentProps) {
  if (!speechText) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-[11px]">
        <Image
          src="/tutorial/eee.png"
          width={358}
          height={105}
          alt="speech bubble Image"
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-black text-center pt-[20px] pb-[28px]">
          <AnimatedSpeechBubbleText
            text={speechText.text}
            className={`${speechText?.fontSize || "text-base"} ${
              speechText?.lineHeight || "leading-normal"
            } whitespace-pre-line`}
          />
        </div>
      </div>
      <div className="pt-[34px]">
        <Image />
        <Image
          src="/donate/bread.png"
          alt="bread image"
          width={220}
          height={106}
        />
      </div>
    </div>
  );
}
