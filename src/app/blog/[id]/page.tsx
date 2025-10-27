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
        // Check if this is an old blog (1, 2, 3) or a database article
        const isOldBlog = ['1', '2', '3'].includes(blogId);

        if (isOldBlog) {
          // Verify with old API for backward compatibility
          const response = await fetch('/api/verify-access', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              blogId: blogId,
            }),
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            if (data.approved) {
              setIsApproved(true);
              setIsLoading(false);
              return;
            }
          }
        } else {
          // New database articles - check cookie and fetch content
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
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">🔒</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Access Denied
          </h1>
          <p className="mb-8 text-gray-600">
            You need to purchase this article to read it. Please go back to the home page and click the "Buy Now" button.
          </p>
          <button
            onClick={() => router.push('/')}
            className="rounded-md bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  // Render database article if available
  if (article) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
          
          <article className="px-6 py-12">
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {article.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>By {article.creatorAddress.slice(0, 6)}...{article.creatorAddress.slice(-4)}</span>
                <span>•</span>
                <span>{article.priceEth} ETH</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Render old blog components for backward compatibility
  const renderOldBlog = () => {
    const UnderstandingOnchainMicropayments = require('@/blogs/understanding-onchain-micropayments').default;
    const DesigningPayToReadExperiences = require('@/blogs/designing-pay-to-read-experiences').default;
    const GasEfficientContentDelivery = require('@/blogs/gas-efficient-content-delivery').default;

    switch (blogId) {
      case '1':
        return <UnderstandingOnchainMicropayments />;
      case '2':
        return <DesigningPayToReadExperiences />;
      case '3':
        return <GasEfficientContentDelivery />;
      default:
        return (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                Blog Not Found
              </h1>
              <button
                onClick={() => router.push('/')}
                className="rounded-md bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
        {renderOldBlog()}
      </div>
    </div>
  );
}
