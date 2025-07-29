"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import GameLogo from "@/public/game-logo.png";
import CustomConnectButton from "./CustomConnectButton";
import ConnectWalletEffect from "./ConnectWalletEffect";
import { usePathname, useRouter } from "next/navigation";
import { useAccount, useWalletClient, useChainId, useConnect } from "wagmi";
import { useState } from "react";
import { cn } from "@/app/utils/cn";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const [showToast, setShowToast] = useState(false);
  // Base Mainnet ID
  const BASE_CHAIN_ID = 8453;

  const switchToBase = async () => {
    if (!walletClient) return;
    try {
      await walletClient.switchChain({ id: BASE_CHAIN_ID });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // 2초 후 알림 사라짐
    } catch (e) {
      alert("Failed to switch network. Please try manually in your wallet.");
    }
  };

  return (
    <header
      className={cn(
        "bg-transparent flex w-full justify-between items-center",
        pathname === "/ranking" ? "max-w-md mx-auto px-4 pt-4" : ""
      )}
      onClick={() => {
        if (pathname === "/game") {
          window.location.reload();
        }
        if (pathname !== "/game") {
          router.push("/");
        }
      }}
    >
      <Image
        src={pathname === "/game" ? GameLogo : Logo}
        alt="logo"
        className="w-[105px] h-[58px]"
      />
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
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#0052FF] text-white px-4 py-2 rounded-xl shadow-lg text-sm z-50 animate-fadeIn">
            Switched to Base chain
          </div>
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
