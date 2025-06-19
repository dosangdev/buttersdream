import { useEffect, useState } from "react";
import { butterComponents } from "@/app/constants/butterItems";

export default function HowIsButterCreated() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % butterComponents.length);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const ButterComponent = butterComponents[currentIdx];

  return (
    <div className="flex flex-col gap-4 text-xs ">
      <p className="break-words whitespace-pre-line">
        It’s generated based on the structure of your farcaster PFP or your
        wallet address. your butter is uniquely yours!
      </p>
      <div className="flex items-center justify-center  min-h-[40px]">
        <div className="w-16 h-16 flex items-center justify-center animate-fadeIn">
          <ButterComponent fill="#fbf6ca" />
        </div>
      </div>
    </div>
  );
}
