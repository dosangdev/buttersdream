"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Logo from "@/public/logo.png";
export default function Header() {
  return (
    <header className="bg-transparent flex w-full justify-between items-center">
      <Image src={Logo} alt="logo" className="w-[105px] h-[58px]" />

      <ConnectButton
        label="Sign in"
        chainStatus="icon"
        accountStatus="address"
      />
    </header>
  );
}
