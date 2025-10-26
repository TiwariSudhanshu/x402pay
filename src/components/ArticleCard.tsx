"use client";
import React, { useState } from "react";

type Article = {
  id: string;
  title: string;
  description: string;
  full: string;
  priceEth: number;
  image: string;
};

export default function ArticleCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);

  const buy = async () => {
    const anyWindow = window as any;
    if (!anyWindow?.ethereum) {
      alert("No web3 provider found — please install MetaMask.");
      return;
    }

    try {
      // Ask user to connect if not connected — we won't send a real transaction here.
      await anyWindow.ethereum.request({ method: "eth_requestAccounts" });
      alert(
        `Ready to purchase “${article.title}” for ${article.priceEth} ETH (simulation). Integrate a payment flow (ethers.js) to send real transactions.`
      );
    } catch (err) {
      console.error(err);
      alert("Could not connect wallet to complete purchase.");
    }
  };

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#0b0b0b]">
      <div className="flex flex-col gap-3 sm:flex-row">
        <img src={article.image} alt={article.title} className="h-32 w-full rounded-md object-cover sm:h-28 sm:w-44" />

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{article.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{article.description}</p>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-sm text-zinc-500">Price</div>
              <div className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">{article.priceEth} ETH</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setExpanded((s) => !s)}
              className="rounded-md bg-zinc-100 px-3 py-2 text-sm hover:bg-zinc-200 dark:bg-zinc-900"
            >
              {expanded ? "Hide" : "Read full article"}
            </button>

            <button
              onClick={buy}
              className="ml-auto rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
            >
              Buy · {article.priceEth} ETH
            </button>
          </div>

          {expanded && (
            <div className="mt-3 rounded-md border border-zinc-100 bg-zinc-50 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-300">
              {article.full}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
