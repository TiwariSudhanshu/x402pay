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
    const body = await request.json();
    const { walletAddress, priceEth } = body;
const paywallResponse = await handler(request);
  if (paywallResponse) return paywallResponse;
    // Simulate payment verification
    console.log('Blog 1 purchase request:', { walletAddress, priceEth });

    // Simulate a small delay for processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return approved message
    return NextResponse.json({
      success: true,
      approved: true,
      message: 'Purchase approved! Access granted.',
      blogId: '1',
      articleTitle: 'Understanding On-chain Micropayments',
      purchasedAt: new Date().toISOString(),
      transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
    }, { status: 200 });

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
