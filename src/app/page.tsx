"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArticleCard from "../components/ArticleCard";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  priceEth: number;
  creatorAddress: string;
}

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        
        if (data.success) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900">x402pay</h1>
          <p className="mt-2 text-base text-zinc-600">Pay-per-article with simple wallet connect</p>
        </div>
        <button
          onClick={() => router.push("/create")}
          className="rounded-lg bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
        >
          Create Article
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-4 text-6xl">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
          <p className="text-gray-600 mb-6">Be the first to create an article!</p>
          <button
            onClick={() => router.push("/create")}
            className="rounded-lg bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Create Article
          </button>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
