import Image from "next/image";

export default function WhatAreSpecialEditionNFTs() {
  return (
    <div className=" flex flex-col gap-4 text-xs ">
      <p className="break-words whitespace-pre-line font-bold">
        The top 3 donors, determined by the total amount of Butter Tokens
        donated during the season, will receive an exclusive Butter NFT as a
        special recognition of their generosity and impact.
      </p>
      <p className="break-words whitespace-pre-line">
        {" "}
        This exclusive NFT will feature a unique design that distinguishes it
        from regular Butter NFTs, symbolizing the donor’s significant
        contribution. 
      </p>

      <div className="flex justify-between px-4 mt-8">
        <Image src="/FAQ/Julia-pfp.png" alt="Julia" width={66} height={54} />
        <Image src="/FAQ/WASABI-pfp.png" alt="WASABI" width={66} height={58} />
        <Image src="/FAQ/Tinydo-pfp.png" alt="Tinydo" width={66} height={62} />
      </div>
    </div>
  );
}
