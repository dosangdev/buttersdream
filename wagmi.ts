import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  zerionWallet,
  coinbaseWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { base } from "wagmi/chains";
import { farcasterFrame as miniAppConnector } from "@farcaster/frame-wagmi-connector";
import { useMemo } from "react";
import { createConfig, http } from "wagmi";

export function useWagmiConfig() {
  return useMemo(() => {
    const isMiniApp =
      typeof window !== "undefined" && (window as any)?.farcaster?.isMiniApp;

    const connectors = isMiniApp
      ? [miniAppConnector()]
      : connectorsForWallets(
          [
            {
              groupName: "Recommended Wallets",
              wallets: [
                metaMaskWallet,
                rainbowWallet,
                walletConnectWallet,
                injectedWallet,
                zerionWallet,
                coinbaseWallet,
                trustWallet,
              ],
            },
          ],
          {
            appName: "Butter's Dream",
            projectId: "8df563a8c13c0286ecd207457282333d",
          }
        );

    return createConfig({
      chains: [base],
      transports: {
        [base.id]: http(),
      },
      connectors,
    });
  }, []);
}
