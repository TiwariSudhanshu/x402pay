"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
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
  const router = useRouter();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('walletAddress', address);
      formData.append('priceEth', article.priceEth.toString());

      const response = await fetch(`/api/blog${article.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          priceEth: article.priceEth
        })
      });

      const data = await response.json();

      if (data.approved) {
        toast.success("Purchase approved! Redirecting to article...");
        
        // Store approval in localStorage
        const approvedBlogs = JSON.parse(localStorage.getItem('approvedBlogs') || '[]');
        if (!approvedBlogs.includes(article.id)) {
          approvedBlogs.push(article.id);
          localStorage.setItem('approvedBlogs', JSON.stringify(approvedBlogs));
        }
        
        setIsPurchased(true);
        
        // Redirect to blog page after short delay
        setTimeout(() => {
          router.push(`/blog/${article.id}`);
        }, 1000);
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

        <div className="mb-3 text-lg font-bold text-amber-600">{article.priceEth} ETH</div>

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
              {isPurchased ? "Purchased ✓" : isProcessing ? "Processing..." : "Buy Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}