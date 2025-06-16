"use client";

import DonatePageComponent from "@/components/donate/DonatePage";
import { useEffect, useState } from "react";

export default function DonatePage() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {}, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <main
      className="flex flex-col items-center pt-[109px] relative select-none w-full h-full"
      onClick={handleNext}
    >
      <DonatePageComponent />
    </main>
  );
}
