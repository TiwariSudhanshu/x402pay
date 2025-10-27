import { NextRequest, NextResponse } from 'next/server';

import { paymentMiddleware } from 'x402-next';

const WALLET_ADDRESS = "0x08d2559adb38fa67F56512EF4De8022aaB1AEF4a";

// Configure paywall for this route
const handler = paymentMiddleware(
  WALLET_ADDRESS,
  {
    '/api/blog3': {
      price: "$0.001",
      network: "base-sepolia",
      config: {
        description: "Gas-efficient Content Delivery",
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
    console.log('Blog 3 purchase request:', { walletAddress, priceEth });

    // Simulate a small delay for processing
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      approved: true,
      message: 'Purchase approved! Access granted.',
      blogId: '3',
      articleTitle: 'Gas-efficient Content Delivery',
      purchasedAt: new Date().toISOString(),
      transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
    }, { status: 200 });

  } catch (error) {
    console.error('Blog 3 API error:', error);
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
