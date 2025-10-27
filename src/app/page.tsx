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
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight mb-4">
            Discover Premium Content
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto mb-8">
            Read quality articles with seamless web3 payments
          </p>
          <button
            onClick={() => router.push("/create")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Article
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">No Articles Yet</h2>
            <p className="text-zinc-600 mb-8 max-w-md mx-auto">
              Be the first creator to share your knowledge and start earning
            </p>
            <button
              onClick={() => router.push("/create")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Article
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
