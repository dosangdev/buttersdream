import { useEffect, useState } from "react";

function getTimeLeft(deadline: Date) {
  if (!deadline || isNaN(deadline.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function ProgressBar() {
  // 2025년 8월 1일 00:00:00 UTC 마감일
  const deadline = new Date(Date.UTC(2025, 7, 1, 0, 0, 0)); // 7=8월 (UTC 기준)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="text-black w-full max-w-2xl mx-auto bg-white rounded-xl shadow flex justify-between items-center px-8 py-2 border-2 border-[#EAEAEA] ">
      <div className="flex flex-col items-center">
        <span className="text-base font-bold">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className=" text-xs font-hand">Days</span>
      </div>
      <span className="text-base font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className=" text-xs font-hand">Hours</span>
      </div>
      <span className="text-base font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className=" text-xs font-hand">Minutes</span>
      </div>
      <span className="text-base font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-base font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className=" text-xs font-hand">Seconds</span>
      </div>
    </div>
  );
}
