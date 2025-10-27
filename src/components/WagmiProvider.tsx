"use client";
import React from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum, optimism], 
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

export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
