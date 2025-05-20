import Image from "next/image";

export default function WhatIsButterTowerNFT() {
  return (
    <div className="text-xs">
      <p className="break-words whitespace-pre-line mb-4">
        The Butter Tower NFT is a commemorative NFT featuring all donors&apos;
        butter characters stacked together on toast.
      </p>
      <div className="flex flex-row gap-1">
        <div className="flex-1 flex flex-col gap-4">
          <p className="break-words whitespace-pre-line">
            It serves as a permanent, blockchain-verified record of your
            generosity.
          </p>
          <p className="break-words whitespace-pre-line">
            You qualify by donating at least 0.1 USDC during the season.
          </p>
          <p className="break-words whitespace-pre-line">
            Once the donation is confirmed, your NFT is reserved and will be
            officially minted after the season ends.
          </p>
        </div>
        <div className="flex-shrink-0 h-[210px] flex items-end">
          <Image
            src="/FAQ/butter-tower-NFT.png"
            alt="Butter Tower NFT"
            width={109}
            height={166}
            className="object-contain select-none pointer-events-none"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
