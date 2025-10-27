import { NextRequest, NextResponse } from 'next/server';
import { paymentMiddleware } from 'x402-next';
import { connectDB, Article } from '@/lib/mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params;
    
    // Connect to database
    await connectDB();

    // Fetch article from database
    const article = await Article.findById(articleId);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Use the article creator's wallet address for payment
    const creatorWalletAddress = article.creatorAddress;

    // Configure paywall for this article - payment goes to creator
    const handler = paymentMiddleware(
      creatorWalletAddress,
      {
        [`/api/articles/${articleId}/purchase`]: {
          price: `$${article.priceEth}`,
          network: "base-sepolia",
          config: {
            description: article.title,
            mimeType: "application/json",
            maxTimeoutSeconds: 120
          }
        }
      },
      {
        url: "https://x402.org/facilitator"
      }
    );

    // Check if payment proof is provided
    const paymentProof = request.headers.get('X-PAYMENT');
    
    // If no payment proof, check paywall
    if (!paymentProof) {
      const paywallResponse = await handler(request);
      if (paywallResponse) return paywallResponse;
    }
    
    // If we reach here, either payment proof was provided or paywall passed
    const body = await request.json();
    const { walletAddress } = body;
    
    // Log the purchase
    console.log('Article purchase request:', { 
      articleId, 
      walletAddress, 
      priceEth: article.priceEth,
      creatorWallet: creatorWalletAddress,
      paymentProof 
    });

    // Return approved message with cookie
    const response = NextResponse.json({
      success: true,
      approved: true,
      message: 'Purchase approved! Access granted.',
      articleId: articleId,
      articleTitle: article.title,
      purchasedAt: new Date().toISOString(),
      transactionHash: paymentProof || '0x' + Math.random().toString(16).substring(2, 66),
    }, { status: 200 });

    // Set a secure cookie to verify access
    response.cookies.set(`article_${articleId}_paid`, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;

  } catch (error) {
    console.error('Article purchase API error:', error);
    return NextResponse.json(
      { 
        success: false,
        approved: false,
        message: 'Purchase failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
