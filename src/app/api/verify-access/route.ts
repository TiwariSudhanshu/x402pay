import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogId } = body;

    // Check if there's a valid payment cookie for this blog
    const cookieStore = cookies();
    const paymentCookie = cookieStore.get(`blog_${blogId}_paid`);

    if (paymentCookie && paymentCookie.value === 'true') {
      return NextResponse.json({
        success: true,
        approved: true,
        message: 'Access verified',
      });
    }

    return NextResponse.json({
      success: false,
      approved: false,
      message: 'Payment required',
    }, { status: 402 });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { 
        success: false,
        approved: false,
        message: 'Verification failed',
      },
      { status: 500 }
    );
  }
}
