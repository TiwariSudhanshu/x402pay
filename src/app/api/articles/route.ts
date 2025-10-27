import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Article } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Fetch all articles, sorted by creation date (newest first)
    const articles = await Article.find({})
      .sort({ createdAt: -1 })
      .select('-content') // Exclude full content for listing
      .lean();

    // Transform MongoDB _id to id string
    const transformedArticles = articles.map((article: any) => ({
      id: article._id.toString(),
      title: article.title,
      description: article.description,
      image: article.image,
      priceEth: article.priceEth,
      creatorAddress: article.creatorAddress,
      createdAt: article.createdAt,
    }));

    return NextResponse.json(
      { 
        success: true,
        articles: transformedArticles
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', articles: [] },
      { status: 500 }
    );
  }
}
