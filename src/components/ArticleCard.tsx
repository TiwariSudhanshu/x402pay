"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  description: string;
  full: string;
  image: string;
  priceEth: number;
}

export default function ArticleCard({ article }: { article: Article }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const router = useRouter();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const response = await fetch(`/api/blog${article.id}`, {
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
        const verifyRes = await fetch(`/api/blog${article.id}`, {
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

  const handleReadMore = () => {
    router.push(`/blog/${article.id}`);
  };

  return (
    <div className="card group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-zinc-900">{article.title}</h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600">
          {article.description}
        </p>

        <div className="mb-3 text-lg font-bold text-amber-600">
          {article.priceEth} ETH
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReadMore}
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50"
          >
            Read full article
          </button>

          <form onSubmit={handleBuy} className="flex-1">
            <button
              type="submit"
              disabled={isProcessing || isPurchased}
              className={`w-full whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors ${
                isPurchased
                  ? "bg-green-500 cursor-not-allowed"
                  : isProcessing
                  ? "bg-gray-400 cursor-wait"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {isPurchased
                ? "Purchased ✓"
                : isProcessing
                ? "Processing..."
                : "Buy Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
