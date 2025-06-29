"use client";

import "@rainbow-me/rainbowkit/styles.css";

import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useWagmiConfig } from "../wagmi";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const config = useWagmiConfig();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
