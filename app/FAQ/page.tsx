"use client";

import { useState } from "react";
import Image from "next/image";
import WhatIsButterDream from "@/components/FAQ/WhatIsButterDream";
import HowDonationWorks from "@/components/FAQ/HowDonationWorks";
import WhatIsButterTowerNFT from "@/components/FAQ/WhatIsButterTowerNFT";
import HowIsButterCreated from "@/components/FAQ/HowIsButterCreated";
import CanIDonateAnyAmount from "@/components/FAQ/CanIDonateAnyAmount";
import WhereDoesTheDonationGo from "@/components/FAQ/WhereDoesTheDonationGo";
import AccordionAnimation from "@/components/animations/AccordionAnimation";
import OurTeam from "@/components/FAQ/OurTeam";
import CanIParticipateWithoutWarpcast from "@/components/FAQ/CanIParticipateWithoutWarpcast";
import WhatAreSpecialEditionNFTs from "@/components/FAQ/WhatAreSpecialEditionNFTs";
import WhyIsThereOperationsFee from "@/components/FAQ/WhyIsThereOperationsFee";
import HowCanIGetInvolved from "@/components/FAQ/HowCanIGetInvolved";

const faqs = [
  {
    question: "What is Butter's Dream?",
    answer: <WhatIsButterDream />,
  },
  {
    question: "How does the donation process work?",
    answer: <HowDonationWorks />,
  },
  {
    question: "What is the Butter Tower NFT?",
    answer: <WhatIsButterTowerNFT />,
  },
  {
    question: "How is butter created?",
    answer: <HowIsButterCreated />,
  },
  {
    question: "Can I donate any amount?",
    answer: <CanIDonateAnyAmount />,
  },
  {
    question: "Where does the donation go?",
    answer: <WhereDoesTheDonationGo />,
  },
  {
    question: "Can I participate without Warpcast?",
    answer: <CanIParticipateWithoutWarpcast />,
  },
  {
    question: "What are the special edition NFTs?",
    answer: <WhatAreSpecialEditionNFTs />,
  },
  {
    question: "Why is there an operations fee?",
    answer: <WhyIsThereOperationsFee />,
  },
  {
    question: "How can I get involved?",
    answer: <HowCanIGetInvolved />,
  },
  {
    question: "Our Team",
    answer: <OurTeam />,
  },
  // {
  //   question: "Can I participate without Warpcast?",
  //   answer:
  //     "Yes! You can participate using your wallet even if you don&apos;t have Warpcast.",
  // },
  // {
  //   question: "What are the special edition NFTs?",
  //   answer:
  //     "Special edition NFTs are limited collectibles given for special events or milestones during the donation campaign.",
  // },
];

export default function FAQpage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="flex flex-col items-center pt-4">
      <div className="w-full max-w-md mb-4 rounded-2xl overflow-hidden ">
        <video
          src="/FAQ/faq-video.mp4"
          controls
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            background: "black",
            display: "block",
          }}
          className="rounded-2xl"
        />
      </div>
      {/* FAQ 아코디언 */}
      <section className="flex flex-col gap-3 w-full max-w-md text-xs">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white shadow border border-gray-200 overflow-hidden p-4 "
          >
            <button
              className="flex justify-between items-center w-full text-base focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="text-[#262626] text-base">{faq.question}</span>
              <span
                className={`transition-transform duration-200 ${
                  openIdx === idx ? "rotate-180" : "rotate-0"
                }`}
              >
                <Image
                  src="/FAQ/FAQ-arrow-button.png"
                  alt="arrow"
                  width={11}
                  height={8}
                  className="inline-block"
                />
              </span>
            </button>
            <AccordionAnimation isOpen={openIdx === idx}>
              <div className="pt-5 pr-2 pb-[15px] text-sm text-[#535353]">
                {faq.answer}
              </div>
            </AccordionAnimation>
          </div>
        ))}
      </section>
    </main>
  );
}
