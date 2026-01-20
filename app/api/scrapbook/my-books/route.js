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
    const createdBooks = await Scrapbook.find({ createdBy: decoded.id })
      .sort({ createdAt: -1 })
      .lean();

    // Get all scrapbooks saved by this user
    const user = await User.findById(decoded.id).populate('savedBooks').lean();
    const savedBooks = user?.savedBooks || [];

    // Combine and deduplicate (in case a user saved their own book)
    const allBooksMap = new Map();
    
    createdBooks.forEach(book => {
      allBooksMap.set(book._id.toString(), { ...book, isOwner: true });
    });
    
    savedBooks.forEach(book => {
      if (!allBooksMap.has(book._id.toString())) {
        allBooksMap.set(book._id.toString(), { ...book, isOwner: false });
      }
    });

    const books = Array.from(allBooksMap.values());

    return NextResponse.json({
      success: true,
      books: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
