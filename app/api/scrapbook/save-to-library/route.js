import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const { shareId } = await request.json();

    if (!shareId) {
      return NextResponse.json(
        { success: false, message: 'Share ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Find the scrapbook
    const scrapbook = await Scrapbook.findOne({ shareId });
    
    if (!scrapbook) {
      return NextResponse.json(
        { success: false, message: 'Scrapbook not found' },
        { status: 404 }
      );
    }

    // Add to user's saved books (avoid duplicates)
    const user = await User.findById(decoded.id);
    
    if (!user.savedBooks.includes(scrapbook._id)) {
      user.savedBooks.push(scrapbook._id);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Scrapbook saved to your library!',
    });
  } catch (error) {
    console.error('Error saving book to library:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('shareId');

    if (!shareId) {
      return NextResponse.json(
        { success: false, message: 'Share ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Find the scrapbook
    const scrapbook = await Scrapbook.findOne({ shareId });
    
    if (!scrapbook) {
      return NextResponse.json(
        { success: false, message: 'Scrapbook not found' },
        { status: 404 }
      );
    }

    // Remove from user's saved books
    const user = await User.findById(decoded.id);
    
    user.savedBooks = user.savedBooks.filter(id => id.toString() !== scrapbook._id.toString());
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Scrapbook removed from your library',
    });
  } catch (error) {
    console.error('Error removing book from library:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
