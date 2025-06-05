"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import CustomConnectButton from "./CustomConnectButton";
export default function Header() {
  return (
    <header className="bg-transparent flex w-full justify-between items-center">
      <Image src={Logo} alt="logo" className="w-[105px] h-[58px]" />
      <CustomConnectButton />
    </header>
  );
}
