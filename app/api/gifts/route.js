import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Gift from '@/lib/models/Gift';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

// CREATE a new gift
export async function POST(request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login to create a gift' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { recipientName, recipientEmail, giftType, theme, content, message } = body;

    // Validate required fields
    if (!recipientName || !giftType || !content?.title) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Create the gift
    const gift = await Gift.create({
      sender: {
        userId: user._id,
        name: user.name,
      },
      recipient: {
        name: recipientName,
        email: recipientEmail || '',
      },
      giftType,
      theme: theme || 'celebration',
      content,
      message: message || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Gift created successfully!',
        gift: {
          giftId: gift.giftId,
          shareUrl: `/gift/${gift.giftId}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create gift error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create gift' },
      { status: 500 }
    );
  }
}

// GET all gifts for current user
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    await connectDB();

    const gifts = await Gift.find({ 'sender.userId': decoded.id })
      .sort({ createdAt: -1 })
      .select('-content.credentials');

    return NextResponse.json(
      { success: true, gifts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get gifts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gifts' },
      { status: 500 }
    );
  }
}
