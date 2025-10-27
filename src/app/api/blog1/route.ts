import { NextRequest, NextResponse } from 'next/server';

import { paymentMiddleware } from 'x402-next';

const WALLET_ADDRESS = "0x08d2559adb38fa67F56512EF4De8022aaB1AEF4a";

// Configure paywall for this route
const handler = paymentMiddleware(
  WALLET_ADDRESS,
  {
    '/api/blog1': {
      price: "$0.001",
      network: "base-sepolia",
      config: {
        description: "Real-time data feed access",
        mimeType: "application/json",
        maxTimeoutSeconds: 120
      }
    }
  },
  {
    url: "https://x402.org/facilitator"
  }
);

export async function POST(request: NextRequest) {
  try {
    // Check if payment proof is provided
    const paymentProof = request.headers.get('X-PAYMENT');
    
    // If no payment proof, check paywall
    if (!paymentProof) {
      const paywallResponse = await handler(request);
      if (paywallResponse) return paywallResponse;
    }
    
    // If we reach here, either payment proof was provided or paywall passed
    const body = await request.json();
    const { walletAddress, priceEth } = body;
    
    // Simulate payment verification
    console.log('Blog 1 purchase request:', { walletAddress, priceEth, paymentProof });

    // Simulate a small delay for processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return approved message with cookie
    const response = NextResponse.json({
      success: true,
      approved: true,
      message: 'Purchase approved! Access granted.',
      blogId: '1',
      articleTitle: 'Understanding On-chain Micropayments',
      purchasedAt: new Date().toISOString(),
      transactionHash: paymentProof || '0x' + Math.random().toString(16).substring(2, 66),
    }, { status: 200 });

    // Set a secure cookie to verify access
    response.cookies.set('blog_1_paid', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;

  } catch (error) {
    console.error('Blog 1 API error:', error);
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
