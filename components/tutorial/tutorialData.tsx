import Image from "next/image";
import { useState } from "react";
import AnimatedSpeechBubbleText from "../animations/AnimatedSpeechBubbleText";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export interface TutorialImage {
  src: string;
  width: number;
  height: number;
  animationType?: string; // 예: 'fade', 'bounce', 'slide', 'custom1' 등
}

export interface TutorialData {
  images: TutorialImage[];
  title: string;
  description: string;
  speechText: {
    text: string;
    fontSize?: string;
    lineHeight?: string;
  };
}

const TutorialButterBasic = {
  src: "/tutorial/tutorial-butter-basic.png",
  width: 100,
  height: 75,
};

const TutorialButterGlasses = {
  src: "/tutorial/tutorial-butter-glasses.png",
  width: 100,
  height: 75,
};

const TutorialButterfly = {
  src: "/tutorial/tutorial-butter-butterfly.png",
  width: 132,
  height: 91,
};

const TutorialButterEarth = {
  src: "/tutorial/tutorial-earth.png",
  width: 320,
  height: 323,
};

const TutorialButterflyEarth = {
  src: "/tutorial/tutorial-butterfly-earth.png",
  width: 320,
  height: 373,
};

const TutorialGift = {
  src: "/tutorial/tutorial-gift.png",
  width: 243,
  height: 235,
};

const TutorialButterTower = {
  src: "/tutorial/tutorial-NFT-tower.png",
  width: 252,
  height: 281,
};

const ButterflyBasic = {
  src: "/butterfly-basic.png",
  width: 55,
  height: 42,
};

const ButterAngry = {
  src: "/tutorial/tutorial-butter-angry.png",
  width: 100,
  height: 68,
};

const ButterSurprised = {
  src: "/tutorial/tutorial-butter-surprised.png",
  width: 88,
  height: 72,
};

export default function TutorialFlow() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  // 현재 단계에 해당하는 speechText 가져오기
  const currentTutorialData = tutorialPages[step];
  const speechText = currentTutorialData?.speechText;

  const handleSkip = () => {
    const lastPageIndex = Math.max(0, tutorialPages.length - 1);
    setStep(lastPageIndex);
  };

  return (
    <>
      <div
        className="fixed w-full h-full z-10"
        onClick={() => {
          if (step < tutorialPages.length - 1) {
            setStep(step + 1);
          }
        }}
      />
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
            text={speechText?.text || ""}
            className={`${speechText?.fontSize || "text-base"} ${
              speechText?.lineHeight || "leading-normal"
            } whitespace-pre-line`}
          />
        </div>
      </div>
      {step !== 7 && step !== 9 && step !== 10 ? (
        <TutorialBasic step={step} />
      ) : null}
      {step === 7 && <TutorialStackButter />}
      {step === 9 && <TutorialRotateEarth />}
      {step === 10 && <TutorialWiggleGift />}
      {step === 0 && (
        <div className="text-black text-base text-center">
          click anywhere
          <br /> to start
        </div>
      )}
      {step === tutorialPages.length - 1 && (
        <button
          className="bg-white rounded-3xl px-[30px] py-[10px] text-black text-md border-4 border-black z-50"
          onClick={() => {
            router.push("/donate");
          }}
        >
          Let's Goooo
        </button>
      )}
      {step !== tutorialPages.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
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
// const TutorialButterBasic = "/tutorial/www.png";

export const tutorialPages: TutorialData[] = [
  // 튜토리얼 페이지 0
  {
    images: [TutorialButterBasic],
    title: "버터의 꿈에 오신 것을 환영합니다",
    description: "버터의 꿈은 여러분의 기부로 이루어집니다.",
    speechText: {
      text: "Oh, Hi there!",
      fontSize: "text-xl",
      lineHeight: "leading-6",
    },
  },
  // 튜토리얼 페이지 1
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "I'm Ms. Butter\nWelcome to Butter's Dream!",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 2
  {
    images: [
      {
        ...TutorialButterBasic,
        animationType: "butterfly",
      },
      ButterflyBasic,
      ButterflyBasic,
      ButterflyBasic,
    ],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "Have you heard of\nthe 'butterfly effect'?",
      fontSize: "text-md",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 3
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "It means, smoll action\ncan create BIG changes to the world!",
      fontSize: "text-md",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 4
  {
    images: [TutorialButterGlasses],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "And that's what\nButter's Dream is all about",
      fontSize: "text-md",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 5
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "Here's how it works:",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 6
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "1. Donate 0.1 USDC or more\nand get your very own butter",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 7
  {
    images: [
      {
        ...TutorialButterBasic,
        animationType: "stack-butter",
      },
      {
        ...ButterSurprised,
        animationType: "stack-butter",
      },
      {
        ...ButterAngry,
        animationType: "stack-butter",
      },
    ],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "2. Fly & stack up your butter\non the giant butter tower",
      fontSize: "text-xl",
      lineHeight: "leading-5",
    },
  },
  // 튜토리얼 페이지 8
  {
    images: [TutorialButterflyEarth],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "3. Once we hit our goal,\nall the butter that donated",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 9
  {
    images: [TutorialGift],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "become a butterfly\nto spread kindness to the world!",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 10
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "4. And the end of each season,\nyou will get a special gift",
      fontSize: "text-xl",
      lineHeight: "leading-5",
    },
  },
  // 튜토리얼 페이지 11
  {
    images: [TutorialButterTower],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "‘A butter tower NFT’\nthe official thank-you badge!",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
  // 튜토리얼 페이지 12
  {
    images: [TutorialButterBasic],
    title: "버터 타워 NFT",
    description: "기부하시면 버터 타워 NFT를 받으실 수 있습니다.",
    speechText: {
      text: "Ready? Then,\nclick the button below!",
      fontSize: "text-xl",
      lineHeight: "leading-7",
    },
  },
];

export function TutorialBasic({ step }: { step: number }) {
  // step에 따라 이미지 결정
  let imageToShow;
  if (step === 5) {
    imageToShow = TutorialButterGlasses;
  } else if (step === 11) {
    imageToShow = TutorialButterTower;
  } else {
    imageToShow = TutorialButterBasic;
  }

  return (
    <div
      className={`aspect-square flex items-center justify-center mb-6 relative `}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageToShow.src}
          alt={`${imageToShow.src}`}
          width={imageToShow.width}
          height={imageToShow.height}
          className="object-contain"
          priority
        />
        {step === 2 && (
          <>
            {/* 첫 번째 나비 */}
            <motion.div
              className="absolute"
              style={{
                top: "40%",
                left: "-80%",
              }}
              initial={{
                opacity: 0,
                y: 20,
                rotate: 15,
              }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: 15,
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src={ButterflyBasic.src}
                alt={`${ButterflyBasic.src}`}
                width={ButterflyBasic.width}
                height={ButterflyBasic.height}
                className="object-contain"
              />
            </motion.div>

            {/* 두 번째 나비 */}
            <motion.div
              className="absolute"
              style={{
                top: "50%",
                right: "-80%",
              }}
              initial={{
                opacity: 0,
                y: 20,
                rotate: 10,
                scaleX: -1,
              }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: 10,
                scaleX: -1,
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src={ButterflyBasic.src}
                alt={`${ButterflyBasic.src}`}
                width={ButterflyBasic.width}
                height={ButterflyBasic.height}
                className="object-contain"
              />
            </motion.div>

            {/* 세 번째 나비 */}
            <motion.div
              className="absolute"
              style={{
                bottom: "-80%",
                left: "-20%",
              }}
              initial={{
                opacity: 0,
                y: 20,
                rotate: -10,
              }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                rotate: -10,
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src={ButterflyBasic.src}
                alt={`${ButterflyBasic.src}`}
                width={ButterflyBasic.width}
                height={ButterflyBasic.height}
                className="object-contain"
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function TutorialStackButter() {
  const butterImages = [
    { ...ButterAngry, index: 0 },
    { ...ButterSurprised, index: 1 },
    { ...TutorialButterBasic, index: 2 },
  ];

  return (
    <div className="aspect-square flex items-center justify-center mb-6 relative h-[200px] w-[200px] mx-auto">
      {butterImages.reverse().map((image, index) => (
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
            delay: (butterImages.length - 1 - index) * 0.2,
          }}
        >
          <Image
            src={image.src}
            alt={`stack-butter-${index}`}
            width={image.width}
            height={image.height}
            className="object-contain"
            priority
          />
        </motion.div>
      ))}
    </div>
  );
}

export function TutorialRotateEarth() {
  return (
    <div
      className={` flex flex-col items-center justify-center mb-6 relative mx-auto`}
    >
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={TutorialButterfly.src}
          alt={`${TutorialButterfly.src}`}
          width={TutorialButterfly.width}
          height={TutorialButterfly.height}
          className="object-contain z-10"
          priority
        />
        <motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src={TutorialButterEarth.src}
              alt={`${TutorialButterEarth.src}`}
              width={TutorialButterEarth.width}
              height={TutorialButterEarth.height}
              className="object-cover -mt-[50px] z-0"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function TutorialWiggleGift() {
  return (
    <div className="flex flex-col items-center justify-center mb-6 relative mx-auto">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            x: [0, 10, -10, 10, 0],
            rotate: [0, 5, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={TutorialGift.src}
            alt={`${TutorialGift.src}`}
            width={TutorialGift.width}
            height={TutorialGift.height}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
