"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import UnderstandingOnchainMicropayments from "@/blogs/understanding-onchain-micropayments";
import DesigningPayToReadExperiences from "@/blogs/designing-pay-to-read-experiences";
import GasEfficientContentDelivery from "@/blogs/gas-efficient-content-delivery";

export default function BlogPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const blogId = params.id as string;
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // Verify with server using cookies
        const response = await fetch('/api/verify-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blogId: blogId,
          }),
          credentials: 'include', // Important: include cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.approved) {
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
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)] mx-auto"></div>
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
            className="rounded-md bg-[var(--accent)] px-6 py-3 text-white font-semibold hover:opacity-90"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  // Render the appropriate blog component based on ID
  const renderBlog = () => {
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
                className="rounded-md bg-[var(--accent)] px-6 py-3 text-white font-semibold hover:opacity-90"
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
        {renderBlog()}
      </div>
    </div>
  );
}
