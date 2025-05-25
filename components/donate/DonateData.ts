export interface DonatePageData {
  speechText: {
    text: string;
    fontSize?: string;
    lineHeight?: string;
  };
  image: {
    src: string;
    width: number;
    height: number;
  };
}

export const donatePageData: DonatePageData = {
  speechText: {
    text: "Let's make a butter tower\ntogether!",
    fontSize: "text-xl",
    lineHeight: "leading-7",
  },
  image: {
    src: "/donate/bread.png",
    width: 220,
    height: 106,
  },
};
