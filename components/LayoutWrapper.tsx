"use client";

import React from "react";
import ClientSWRConfig from "@/app/ClientSWRConfig";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRankingPage = pathname === "/ranking";

  return (
    <div
      className={cn(
        "w-full mx-auto",
        !isRankingPage && "max-w-md p-4 pb-16",
        isRankingPage && "w-full flex flex-col min-h-screen"
      )}
    >
      <ClientSWRConfig>
        <Header />
        <div className={cn(isRankingPage && "flex-grow flex flex-col")}>
          {children}
        </div>
        <NavBar />
      </ClientSWRConfig>
    </div>
  );
}
