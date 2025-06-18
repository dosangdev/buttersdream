"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TutorialPageComponent from "@/components/tutorial/TutorialPage";
import { tutorialPages } from "@/components/tutorial/tutorialData";
import Image from "next/image";

export default function TutorialPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {}, [currentPage]);

  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      router.push("/donate");
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    const lastPageIndex = Math.max(0, tutorialPages.length - 1);
    setCurrentPage(lastPageIndex);
  };

  // currentPage가 유효한 범위 내에 있는지 확인
  const validPageIndex = Math.min(
    Math.max(0, currentPage),
    tutorialPages.length - 1
  );
  const currentTutorialData = tutorialPages[validPageIndex];

  if (!currentTutorialData) {
    return null;
  }

  return (
    <main
      className="flex flex-col items-center pt-[109px] relative select-none"
      onClick={handleNext}
    >
      <TutorialPageComponent {...currentTutorialData} />
      {currentPage === 0 && (
        <div className="text-black text-base text-center">
          click anywhere
          <br /> to start
        </div>
      )}
      {currentPage !== tutorialPages.length && (
        <button
          onClick={handleSkip}
          className="fixed bottom-20 left-4 bg-white rounded-3xl"
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
    </main>
  );
}
