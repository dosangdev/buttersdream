import { useRouter } from "next/navigation";

export function MyButterDonationCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };
  console.log();
  return (
    <div
      className="w-full h-[50px] flex justify-between items-center text-black bg-white border-[1px]  pl-[22px] pr-[16px] border-black rounded-2xl text-md mt-[10px] cursor-pointer"
      onClick={() => handleClick(`https://basescan.org/tx/${item.hash}`)}
    >
      <div className="text-xl">{index + 1}</div>
      <div>
        {item?.timestamp && (
          <div>
            {item.timestamp.split("-").map((part, idx, arr) => (
              <span key={idx}>
                {part}
                {idx < arr.length - 1 && <span className="mr-1">.</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>{item?.value} USDC</div>
    </div>
  );
}
