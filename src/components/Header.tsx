"use client";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    try {
      const anyWindow = window as any;
      if (anyWindow?.ethereum && anyWindow.ethereum.selectedAddress) {
        setAccount(anyWindow.ethereum.selectedAddress);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const connectWallet = async () => {
    const anyWindow = window as any;
    if (!anyWindow?.ethereum) {
      alert("No web3 provider found. Please install MetaMask or another wallet.");
      return;
    }

    try {
      const accounts = await anyWindow.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length) setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      alert("Could not connect wallet.");
    }
  };

  const short = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:bg-black/60 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-zinc-900 px-3 py-1 text-sm font-semibold text-white">x402pay</div>
          <div className="text-sm text-zinc-600">articles · web3</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={connectWallet}
            className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800"
          >
            {account ? `Connected: ${short(account)}` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
