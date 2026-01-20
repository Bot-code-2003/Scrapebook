import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';

export async function GET(request, { params }) {
  const { shareId } = params;

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
