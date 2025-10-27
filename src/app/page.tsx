"use client";

import ArticleCard from "../components/ArticleCard";

const articles = [
  {
    id: "1",
    title: "Understanding On-chain Micropayments",
    description: "A short guide to micropayments for content creators.",
    full:
      "Micropayments let creators monetize tiny interactions. This article walks through payment channels, gas optimizations, and UX considerations for frictionless ETH payments.",
    priceEth: 0.001,
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Designing Pay-to-Read Experiences",
    description: "UX patterns for paid content on the web3 web.",
    full:
      "Paid content experiences should be fast and transparent. Learn patterns for previews, meta-transactions, and bundling payments for multiple articles.",
    priceEth: 0.0025,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b2b7f7b2f4b4a3a7b9d7e6f1e8c9d1b",
  },
  {
    id: "3",
    title: "Gas-efficient Content Delivery",
    description: "Techniques to reduce on-chain costs for article purchases.",
    full:
      "From batching to L2s and paymaster approaches, this article explores how to keep costs low while maintaining a seamless content flow for readers.",
    priceEth: 0.001,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8f8f9a9a3f2f9b8a7c6d5e4f3a2b1c0d",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">x402pay</h1>
          <p className="mt-2 text-base text-zinc-600">Pay-per-article with simple wallet connect</p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
