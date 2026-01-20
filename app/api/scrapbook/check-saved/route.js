import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shareId = searchParams.get('shareId');

    if (!shareId) {
      return NextResponse.json(
        { success: false, message: 'Share ID is required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: true, isSaved: false });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ success: true, isSaved: false });
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

    // Check if user created this book
    if (scrapbook.createdBy?.toString() === decoded.id) {
      return NextResponse.json({ success: true, isSaved: true, isOwner: true });
    }

    // Check if user has saved this book
    const user = await User.findById(decoded.id);
    const isSaved = user?.savedBooks?.some(bookId => bookId.toString() === scrapbook._id.toString());

    return NextResponse.json({
      success: true,
      isSaved: isSaved || false,
      isOwner: false,
    });
  } catch (error) {
    console.error('Error checking if saved:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
