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
      <header className="w-full border-b border-zinc-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-8">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => router.push("/")}
              className="rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-5 py-3 text-2xl font-extrabold text-white hover:opacity-90 transition-opacity"
            >
              x402pay
            </button>
            <div>
              <div className="text-lg font-semibold text-zinc-900">Pay-per-article</div>
              <div className="text-sm text-zinc-500">Simple web3 payments for content</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* {isConnected && (
              <button
                onClick={() => router.push("/create")}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
              >
                Create Article
              </button>
            )} */}
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-zinc-700">{short(address)}</div>
                <button
                  onClick={() => disconnect()}
                  className="rounded-md border border-zinc-200 bg-orange-500 px-4 py-2 text-sm hover:bg-orange-600 "
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600"
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
