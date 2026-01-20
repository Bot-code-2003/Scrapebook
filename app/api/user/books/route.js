import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET() {
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

    await connectDB();
    
    // Get all scrapbooks created by this user
    const myBooks = await Scrapbook.find({ createdBy: decoded.id })
      .sort({ createdAt: -1 })
      .lean();

    // Get user with populated saved books
    const user = await User.findById(decoded.id)
      .populate({
        path: 'savedBooks',
        options: { sort: { createdAt: -1 } }
      })
      .lean();
    
    const savedBooks = user?.savedBooks || [];

    // Convert ObjectIds to strings for serialization
    const serializeBook = (book) => ({
      ...book,
      _id: book._id.toString(),
      createdBy: book.createdBy?.toString() || null,
    });

    return NextResponse.json({
      success: true,
      myBooks: myBooks.map(serializeBook),
      savedBooks: savedBooks.map(serializeBook),
    });
  } catch (error) {
    console.error('Error fetching user books:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
