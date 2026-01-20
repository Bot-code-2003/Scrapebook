import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gift from '@/lib/models/Gift';

// GET a single gift by giftId (public - for recipients)
export async function GET(request, { params }) {
  try {
    const { giftId } = await params;

    if (!giftId) {
      return NextResponse.json(
        { success: false, message: 'Gift ID required' },
        { status: 400 }
      );
    }

    await connectDB();

    const gift = await Gift.findOne({ giftId });

    if (!gift) {
      return NextResponse.json(
        { success: false, message: 'Gift not found' },
        { status: 404 }
      );
    }

    // Update status to viewed if first time
    if (gift.status === 'created') {
      gift.status = 'viewed';
      gift.viewedAt = new Date();
      await gift.save();
    }

    return NextResponse.json(
      { success: true, gift },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get gift error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gift' },
      { status: 500 }
    );
  }
}

// PATCH - Mark gift as opened (when recipient clicks "Open Gift")
export async function PATCH(request, { params }) {
  try {
    const { giftId } = await params;

    if (!giftId) {
      return NextResponse.json(
        { success: false, message: 'Gift ID required' },
        { status: 400 }
      );
    }

    await connectDB();

    const gift = await Gift.findOneAndUpdate(
      { giftId },
      { 
        status: 'opened',
        openedAt: new Date(),
      },
      { new: true }
    );

    if (!gift) {
      return NextResponse.json(
        { success: false, message: 'Gift not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, gift },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update gift error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update gift' },
      { status: 500 }
    );
  }
}
