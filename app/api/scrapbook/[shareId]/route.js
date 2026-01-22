import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import { verifyToken } from '@/lib/auth';

export async function GET(request, { params }) {
  const { shareId } = await params;

  try {
    await connectDB();
    const scrapbook = await Scrapbook.findOne({ shareId });

    if (!scrapbook) {
      return NextResponse.json({ success: false, message: 'Scrapbook not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, scrapbook });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { shareId } = await params;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const scrapbook = await Scrapbook.findOne({ shareId });

    if (!scrapbook) {
      return NextResponse.json({ success: false, message: 'Scrapbook not found' }, { status: 404 });
    }

    // Check if user is owner
    if (scrapbook.createdBy.toString() !== decoded.id) {
         return NextResponse.json({ success: false, message: 'Not authorized to delete this book' }, { status: 403 });
    }

    await Scrapbook.deleteOne({ shareId });

    return NextResponse.json({ success: true, message: 'Scrapbook deleted' });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
