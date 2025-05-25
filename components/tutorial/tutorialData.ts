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
      lineHeight: "leading-7",
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
      lineHeight: "leading-7",
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
