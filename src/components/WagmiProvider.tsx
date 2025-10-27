"use client";
import React from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// ✅ Only use Base Sepolia
const { chains, publicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "4fc17bd7aea67b9b983832aceed26d18",
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "x402pay",
      },
    }),
  ],
  publicClient,
});

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
