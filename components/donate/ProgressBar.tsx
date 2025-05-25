interface ProgressBarProps {
  currentAmount: number;
  targetAmount: number;
}

export default function ProgressBar({
  currentAmount,
  targetAmount,
}: ProgressBarProps) {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="w-full max-w-md flex justify-between items-center">
      {/* 배경 바 */}
      <div className="w-[calc(100%-45px)] h-[12px] bg-white rounded-full border-2 border-black ">
        {/* 진행 바 */}
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* 퍼센트 텍스트 */}
      <div className=" text-black font-bold">{Math.round(percentage)}%</div>
    </div>
  );
}
