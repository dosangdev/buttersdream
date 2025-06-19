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
            className="flex items-center justify-center w-10 h-10 bg-white border-2 border-[#0052FF] rounded-full shadow-md hover:bg-[#e6f0ff] transition"
            title="Switch to Base"
          >
            <Image
              src="/base.webp"
              alt="Switch to Base"
              className="w-6 h-6"
              width={24}
              height={24}
            />
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
