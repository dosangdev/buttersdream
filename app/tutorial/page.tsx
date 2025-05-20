"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TutorialPageComponent from "@/components/tutorial/TutorialPage";
import { tutorialPages } from "@/components/tutorial/tutorialData";

export default function TutorialPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage === tutorialPages.length - 1) {
      router.push("/"); // 마지막 페이지에서 시작하기를 누르면 메인으로 이동
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <main className="flex flex-col items-center pt-[109px]">
      <TutorialPageComponent
        {...tutorialPages[currentPage]}
        isLast={currentPage === tutorialPages.length - 1}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
}
