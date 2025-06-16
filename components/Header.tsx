"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import CustomConnectButton from "./CustomConnectButton";
import ConnectWalletEffect from "./ConnectWalletEffect";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
export default function Header() {
  const pathname = usePathname();
  const { address } = useAccount();

  return (
    <header className="bg-transparent flex w-full justify-between items-center">
      <Image src={Logo} alt="logo" className="w-[105px] h-[58px]" />
      <div className="relative">
        <CustomConnectButton />
        {pathname === "/donate" && !address && (
          <div className="absolute top-10 -left-6">
            <ConnectWalletEffect />
          </div>
        )}
      </div>
    </header>
  );
}
