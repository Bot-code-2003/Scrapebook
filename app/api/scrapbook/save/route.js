import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { pages, bgPattern, bgColor, pageBorder, animId, soundId, bookStyle, title, appBackground, pageBgImage, pageBgOpacity } = body;

    // Check if user is authenticated (optional)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let userId = null;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.id;
      }
    }

    // Generate a simple unique ID
    const shareId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

    const newScrapbook = await Scrapbook.create({
      shareId,
      pages,
      bgPattern,
      bgColor,
      pageBorder,
      animId: animId || 'default',
      soundId: soundId || 'page-flip',
      bookStyle: bookStyle || 'classic',
      title: title || 'Untitled Scrapbook',
      appBackground: appBackground || 'none',
      appBackground: appBackground || 'none',
      pageBgImage: pageBgImage || null,
      pageBgOpacity: pageBgOpacity !== undefined ? pageBgOpacity : 0.8,
      createdBy: userId,
    });

    return NextResponse.json({ success: true, shareId: newScrapbook.shareId });
  } catch (error) {
    console.error('Error saving scrapbook:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

