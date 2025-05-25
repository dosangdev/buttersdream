"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSpeechBubbleText from "@/components/animations/AnimatedSpeechBubbleText";

interface TutorialPageProps {
  images: {
    src: string;
    width: number;
    height: number;
    animationType?: string;
  }[];
  title: string;
  description: string;
  speechText: {
    text: string;
    fontSize?: string;
    lineHeight?: string;
  };
}

export default function TutorialPage({
  images,
  title,
  description,
  speechText,
}: TutorialPageProps) {
  if (!speechText) {
    return null;
  }

  const isButterflyAnimation = images[0]?.animationType === "butterfly";
  const isStackButterAnimation = images[0]?.animationType === "stack-butter";

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="relative mb-[11px]">
        <Image
          src="/tutorial/eee.png"
          width={358}
          height={105}
          alt="tutorial speech bubble Image"
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
      <div
        className={`aspect-square flex items-center justify-center mb-6 relative ${
          isStackButterAnimation ? "h-[200px] w-[200px] mx-auto" : ""
        }`}
      >
        {images.map((image, index) => {
          if (isStackButterAnimation) {
            return (
              <motion.div
                key={`${image.src}-${index}`}
                style={{
                  position: "absolute",
                  visibility: "hidden",
                  top: `${index * 65}px`,
                }}
                initial={{
                  opacity: 0,
                  y: -100,
                  scale: 0.8,
                  position: "absolute",
                  top: `${index * 65}px`,
                  visibility: "visible",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  position: "absolute",
                  top: `${index * 65}px`,
                  visibility: "visible",
                }}
                transition={{
                  duration: 0.3,
                  delay: (images.length - 1 - index) * 0.2,
                }}
              >
                <Image
                  src={image.src}
                  alt={`${title}-${index}`}
                  width={image.width}
                  height={image.height}
                  className="object-contain"
                  priority
                />
              </motion.div>
            );
          }

          if (isButterflyAnimation) {
            // 첫 번째 이미지(버터)는 중앙에 배치
            if (index === 0) {
              return (
                <motion.div
                  key={`${image.src}-${index}`}
                  className="relative z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={image.src}
                    alt={`${title}-${index}`}
                    width={image.width}
                    height={image.height}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              );
            }

            // 나비들은 버터 주변에 배치
            const positions = [
              { top: "40%", left: "-80%", rotate: 15 },
              { top: "50%", right: "-80%", rotate: 10, scaleX: -1 },
              { bottom: "-40%", left: "-20%", rotate: -10 },
            ];

            const position = positions[index - 1] || {
              top: "0",
              left: "0",
              rotate: 0,
            };

            return (
              <motion.div
                key={`${image.src}-${index}`}
                className="absolute"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  bottom: position.bottom,
                }}
                initial={{
                  opacity: 0,
                  y: 20,
                  rotate: position.rotate,
                  scaleX: position.scaleX || 1,
                }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                  rotate: position.rotate,
                  scaleX: position.scaleX || 1,
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: {
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Image
                  src={image.src}
                  alt={`${title}-${index}`}
                  width={image.width}
                  height={image.height}
                  className=""
                  priority
                />
              </motion.div>
            );
          }

          // 일반적인 이미지 배치
          return (
            <motion.div
              key={`${image.src}-${index}`}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={image.src}
                alt={`${title}-${index}`}
                width={image.width}
                height={image.height}
                className="object-contain"
                priority
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
