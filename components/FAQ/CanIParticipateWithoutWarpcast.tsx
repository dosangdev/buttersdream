import Image from "next/image";

export default function CanIParticipateWithoutWarpcast() {
  return (
    <div className="relative flex flex-col gap-4 text-xs ">
      <p className="break-words whitespace-pre-line font-bold">Yes!</p>
      <p className="break-words whitespace-pre-line">You can connect either:</p>
      <p className="break-words whitespace-pre-line">
        A Warpcast-linked wallet Your Butter character will reflect your
        Warpcast PFP’s colors.
      </p>
      <p className="break-words whitespace-pre-line">
        A regular crypto wallet A random color-based butter character will be
        generated based on your wallet’s unique ID.
      </p>
      <div className="absolute top-0 right-0">
        <Image
          src="/FAQ/FAQ-connect-wallet.png"
          alt="connect wallet"
          width={72}
          height={47}
        />
      </div>
    </div>
  );
}
