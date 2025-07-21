import Image from "next/image";

export default function WhatIsButterDream() {
  return (
    <div className="flex flex-col gap-4 text-xs">
      <p className="break-words whitespace-pre-line">
        Butter&apos;s Dream is a donation-based project with a mission to &quot;
        <span className="font-jjibba-bold">Let Butter Fly</span>&quot;.
      </p>
      <p className="break-words whitespace-pre-line">
        Donate 0.1 USDC or more to receive your own Butter, stack it on the
        Butter Tower, and help us reach our goal!
      </p>
      <p className="break-words whitespace-pre-line">
        At the end of each season, all donations go to a charitable cause, and
        as a thank-you, participants receive a unique Butter Tower NFT to
        celebrate their contribution.
      </p>
      <div className="flex justify-center">
        <Image
          src="/logo.png"
          width={132}
          height={73}
          alt="logo"
          className="object-contain"
        />
      </div>
    </div>
  );
}
