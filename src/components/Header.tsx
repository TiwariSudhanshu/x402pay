"use client";
import React, { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import WalletModal from "./WalletModal";

export default function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess: () => { toast.info("Wallet disconnected"); }
  });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const short = (addr: string | undefined) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo Section */}
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-zinc-900 to-zinc-700 group-hover:from-zinc-800 group-hover:to-zinc-600 transition-all">
              <span className="text-white font-bold text-lg">x</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-zinc-900 text-left ">x402pay</h1>
              <p className="text-xs text-zinc-500">Web3 Content Marketplace</p>
            </div>
          </button>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-50 border border-zinc-200">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-zinc-700">{short(address)}</span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-sm hover:shadow-md"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
