"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface ArticleData {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  priceEth: number;
  creatorAddress: string;
}

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const blogId = params.id as string;
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // Fetch article content from database
        const response = await fetch(`/api/articles/${blogId}/content`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.approved && data.article) {
            setArticle(data.article);
            setIsApproved(true);
            setIsLoading(false);
            return;
          }
        }
        
        // If verification fails, not approved
        setIsApproved(false);
        setIsLoading(false);
      } catch (err) {
        console.error('Access verification error:', err);
        setError('Failed to verify access');
        setIsApproved(false);
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Access Denied
          </h1>
          <p className="text-zinc-600 mb-8">
            Purchase this article to read the full content
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Render database article if available
  if (article) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-16 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 group"
            >
              <svg className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
          
          <article className="bg-white px-4 sm:px-12 py-8 sm:py-16 mt-6 mx-4 sm:mx-6 rounded-xl shadow-sm">
            <div className="mb-12">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 sm:h-96 object-cover rounded-xl mb-8 shadow-md"
              />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 mb-6 leading-relaxed">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-mono">{article.creatorAddress.slice(0, 6)}...{article.creatorAddress.slice(-4)}</span>
                </div>
                <span>•</span>
                <span className="font-semibold">{article.priceEth} ETH</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => {
                // Check if line is a subheading (ends with : or is all caps/title case and short)
                const isSubheading = paragraph.trim().endsWith(':') || 
                  (paragraph.trim().length < 60 && paragraph.trim().length > 0 && 
                   paragraph === paragraph.toUpperCase() || 
                   /^[A-Z][A-Za-z\s]+$/.test(paragraph.trim()));
                
                if (!paragraph.trim()) {
                  return <div key={index} className="h-4" />;
                }
                
                if (isSubheading) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-zinc-900 mt-8 mb-4">
                      {paragraph}
                    </h3>
                  );
                }
                
                return (
                  <p key={index} className="mb-6 text-zinc-800 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-12 mb-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto py-8 border-t border-zinc-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-zinc-900 to-zinc-700 flex items-center justify-center text-white font-bold text-xs">
                    x402
                  </div>
                  <span>Powered by x402 Protocol</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="/" className="hover:text-zinc-900 transition-colors">
                    Home
                  </a>
                  <a href="/create" className="hover:text-zinc-900 transition-colors">
                    Create Article
                  </a>
                </div>
              </div>
              <p className="text-center text-xs text-zinc-500 mt-4">
                © {new Date().getFullYear()} x402pay. Decentralized content monetization.
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // Article not found
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
          The article you're looking for doesn't exist or has been removed
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition-all shadow-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
