"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import CustomConnectButton from "./CustomConnectButton";
import ConnectWalletEffect from "./ConnectWalletEffect";
import { usePathname } from "next/navigation";
import { useAccount, useWalletClient, useChainId } from "wagmi";

export default function Header() {
  const pathname = usePathname();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();

  // Base Mainnet ID
  const BASE_CHAIN_ID = 8453;

  const switchToBase = async () => {
    if (!walletClient) return;
    try {
      await walletClient.switchChain({ id: BASE_CHAIN_ID });
    } catch (e) {
      alert("Failed to switch network. Please try manually in your wallet.");
    }
  };

  return (
    <header className="bg-transparent flex w-full justify-between items-center">
      <Image src={Logo} alt="logo" className="w-[105px] h-[58px]" />
      <div className="relative flex items-center gap-2">
        {address && chainId !== BASE_CHAIN_ID && (
          <button
            onClick={switchToBase}
            className="px-3 py-1 bg-yellow-200 border border-black rounded-lg text-black text-[8px]"
          >
            Switch to Base
          </button>
        )}
        <CustomConnectButton />
        {(pathname === "/donate" || pathname === "/mybutter") && !address && (
          <div className="absolute top-10 -left-6">
            <ConnectWalletEffect />
          </div>
        )}
      </div>
    </header>
  );
}
