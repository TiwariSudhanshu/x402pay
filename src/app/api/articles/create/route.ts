import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Article } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, image, priceEth, creatorAddress } = body;

    // Validation
    if (!title || !description || !content || !image || !priceEth || !creatorAddress) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (isNaN(priceEth) || priceEth <= 0) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create new article
    const article = new Article({
      title,
      description,
      content,
      image,
      priceEth: parseFloat(priceEth),
      creatorAddress,
    });

    await article.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Article created successfully',
        articleId: article._id.toString()
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
