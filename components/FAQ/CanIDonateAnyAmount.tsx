import Image from "next/image";

export default function CanIDonateAnyAmount() {
  return (
    <div className="flex flex-col gap-4 text-xs ">
      <p className="break-words whitespace-pre-line font-bold">Yes!</p>
      <p className="break-words whitespace-pre-line">
        You can donate as much as you like as long as it’s more than 0.1 USDC.
      </p>
      <p className="break-words whitespace-pre-line">
        So you can start donation with one little!
      </p>
      <div className="flex flex-col items-center justify-center text-black text-[17px] gap-2 pt-[17px]">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/butter-coin.png"
            alt="butter coin"
            width={70}
            height={70}
          />
          <p>=</p>
          <p>0.1 USDC</p>
        </div>
        <p className="text-center text-[8px] text-[#616161]">
          * need some base $usdc
        </p>
      </div>
    </div>
  );
}
