"use client";

import ConnectButtonBefore from "@/public/custom-connect-button-before.png";
import ConnectButtonAfter from "@/public/custom-connect-button-after.png";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { formatAddress } from "@/app/utils/strings";

export default function CustomConnectButton() {
  const { address, isConnected } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <>
      {isConnected ? (
        <button
          className="relative w-[120px] h-[32px] text-sm text-black text-center"
          onClick={openAccountModal}
        >
          {formatAddress(address)}
          <Image
            src={ConnectButtonAfter}
            fill
            alt="Connect Button After"
            className="absolute top-0 left-0 -z-10 object-contain"
          />
        </button>
      ) : (
        <button onClick={openConnectModal}>
          <Image
            src={ConnectButtonBefore}
            width={29}
            height={28}
            alt="Connect Button Before"
          />
        </button>
      )}
    </>
  );
}
