import Image from "next/image";

export default function HowCanIGetInvolved() {
  return (
    <div className="flex flex-col gap-4 text-xs">
      <p className="break-words whitespace-pre-line font-bold">
        We&apos;d love to have you in our Butter&apos;s Dream community!
      </p>
      <p className="break-words whitespace-pre-line">
        Our official community channels:
      </p>
      <div className="flex justify-center gap-[27px]">
        <Image
          src="/FAQ/farcaster-icon.png"
          width={21.71}
          height={23.32}
          alt="farcaster"
        />
        <Image src="/FAQ/x-icon.png" width={19.57} height={22.25} alt="x" />
        <Image
          src="/FAQ/instagram-icon.png"
          width={21.45}
          height={20.91}
          alt="instagram"
        />
      </div>
      <p className="break-words whitespace-pre-line">
        We’ll be hosting various events & giveaways primarily on Warpcast and X,
        so make sure to follow us there to stay updated and get involved!
      </p>
    </div>
  );
}
