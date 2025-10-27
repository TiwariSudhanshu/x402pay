import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB, Article } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;

    // Check if there's a valid payment cookie for this article
    const cookieStore = cookies();
    const paymentCookie = cookieStore.get(`article_${articleId}_paid`);

    if (!paymentCookie || paymentCookie.value !== 'true') {
      return NextResponse.json({
        success: false,
        approved: false,
        message: 'Payment required',
      }, { status: 402 });
    }

    // Connect to database
    await connectDB();

    // Fetch article with full content
    const article: any = await Article.findById(articleId).lean();
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Return article with approved status
    return NextResponse.json({
      success: true,
      approved: true,
      article: {
        id: article._id.toString(),
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.image,
        priceEth: article.priceEth,
        creatorAddress: article.creatorAddress,
      }
    });

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
