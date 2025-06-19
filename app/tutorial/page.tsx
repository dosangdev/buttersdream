"use client";

import { useState, useEffect } from "react";
import TutorialPageComponent from "@/components/tutorial/TutorialPage";
import { tutorialPages } from "@/components/tutorial/tutorialData";

export default function TutorialPage() {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {}, [currentPage]);
  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      return;
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <main className="flex flex-col items-center pt-[109px] relative select-none">
      {currentPage !== tutorialPages.length - 1 && (
        <div className="fixed w-full h-full" onClick={handleNext} />
      )}
      <TutorialPageComponent />
    </main>
  );
}
