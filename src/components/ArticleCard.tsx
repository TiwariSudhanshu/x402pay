"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useSendTransaction, useNetwork, useSwitchNetwork } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { baseSepolia } from "wagmi/chains";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  priceEth: number;
  creatorAddress?: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { sendTransactionAsync } = useSendTransaction();
  const router = useRouter();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use dynamic article purchase endpoint
  const apiEndpoint = `/api/articles/${article.id}/purchase`;

  const handleApproval = (data: any) => {
    const approvedBlogs = JSON.parse(localStorage.getItem("approvedBlogs") || "[]");
    if (!approvedBlogs.includes(article.id)) {
      approvedBlogs.push(article.id);
      localStorage.setItem("approvedBlogs", JSON.stringify(approvedBlogs));
    }
    setIsPurchased(true);
    setTimeout(() => {
      router.push(`/blog/${article.id}`);
    }, 1000);
  };

  const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Check if we're on Base Sepolia network
      if (chain?.id !== baseSepolia.id) {
        toast.info("Switching to Base Sepolia network...");
        
        try {
          await switchNetworkAsync?.(baseSepolia.id);
          toast.success("Switched to Base Sepolia!");
        } catch (switchError) {
          console.error("Network switch error:", switchError);
          toast.error("Failed to switch network. Please switch to Base Sepolia manually.");
          setIsProcessing(false);
          return;
        }
      }
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          priceEth: article.priceEth,
        }),
      });

      // 🧱 CASE 1: Paywall hit (402 Payment Required)
      if (response.status === 402) {
        toast("Payment required — initiating transaction...");

        const data = await response.json();
        const accepts = data.accepts?.[0];
        if (!accepts) throw new Error("Invalid X402 response");

        const payTo = accepts.to || "0x08d2559adb38fa67F56512EF4De8022aaB1AEF4a";
        const amountWei = accepts.maxAmountRequired || "1000"; // fallback

        // ⚡ Send transaction
        const tx = await sendTransactionAsync({
          to: payTo,
          value: BigInt(amountWei),
          chainId: 84532, // base-sepolia
        });

        toast.success("Payment sent! Verifying...");

        // 🧩 Re-call API with payment proof
        const verifyRes = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-PAYMENT": tx.hash, // 👈 Payment proof header
          },
          body: JSON.stringify({
            walletAddress: address,
            priceEth: article.priceEth,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.approved) {
          toast.success("✅ Purchase approved! Redirecting...");
          handleApproval(verifyData);
        } else {
          toast.error("Payment sent but not verified. Try again.");
        }

        return;
      }

      // 🧱 CASE 2: Already approved (no payment needed)
      const data = await response.json();
      if (data.approved) {
        toast.success("Purchase approved! Redirecting...");
        handleApproval(data);
      } else {
        toast.error("Purchase failed. Please try again.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("An error occurred during purchase");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-100">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200">
          <span className="text-sm font-bold text-zinc-900">{article.priceEth} ETH</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-3 text-lg sm:text-xl font-bold text-zinc-900 line-clamp-2 group-hover:text-zinc-700 transition-colors">
          {article.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3">
          {article.description}
        </p>

        <form onSubmit={handleBuy} className="w-full">
          <button
            type="submit"
            disabled={isProcessing || isPurchased}
            className={`w-full rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              isPurchased
                ? "bg-zinc-100 text-zinc-600 cursor-not-allowed border border-zinc-200"
                : isProcessing
                ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isPurchased
              ? "✓ Purchased"
              : isProcessing
              ? "Purchasing..."
              : "Purchase & Read"}
          </button>
        </form>
      </div>
    </div>
  );
}
