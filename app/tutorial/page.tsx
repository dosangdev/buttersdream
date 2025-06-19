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
  console.log(currentPage, tutorialPages.length - 1);
  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      return;
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // const handleSkip = () => {
  //   const lastPageIndex = Math.max(0, tutorialPages.length - 1);
  //   setCurrentPage(lastPageIndex);
  // };

  // // currentPage가 유효한 범위 내에 있는지 확인
  // const validPageIndex = Math.min(
  //   Math.max(0, currentPage),
  //   tutorialPages.length - 1
  // );
  // const currentTutorialData = tutorialPages[validPageIndex];

  // if (!currentTutorialData) {
  //   return null;
  // }

  return (
    <main className="flex flex-col items-center pt-[109px] relative select-none">
      {currentPage !== tutorialPages.length - 1 && (
        <div className="fixed w-full h-full" onClick={handleNext} />
      )}
      <TutorialPageComponent />

      {/* {currentPage !== tutorialPages.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
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
      )} */}
      {/* {currentPage === tutorialPages.length - 1 && (
        <button
          className="bg-white rounded-3xl px-[30px] py-[10px] text-black text-md border-4 border-black"
          onClick={() => {
            console.log("clicked");
            router.push("/donate");
          }}
        >
          Let's Goooo
        </button>
      )} */}
    </main>
  );
}
