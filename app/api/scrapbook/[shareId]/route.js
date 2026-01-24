import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import { verifyToken } from '@/lib/auth';
import { deleteFromR2 } from '@/lib/r2';

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

    // NEW: Delete images from R2
    // We need to parse pages to find R2 URLs
    const r2Domain = process.env.R2_PUBLIC_URL || 'r2.dev'; // Naive check
    const imageToDelete = [];

    if (scrapbook.pages && Array.isArray(scrapbook.pages)) {
        scrapbook.pages.forEach(page => {
            if (page.type === 'image' && page.content?.url && page.content.url.includes(r2Domain)) {
                // Extract filename: https://.../filename.webp
                const parts = page.content.url.split('/');
                const filename = parts[parts.length - 1];
                if (filename) imageToDelete.push(filename);
            }
             // Check cover type
            if (page.type === 'cover' && page.content?.url && page.content.url.includes(r2Domain)) {
                 const parts = page.content.url.split('/');
                 const filename = parts[parts.length - 1];
                 if (filename) imageToDelete.push(filename);
            }
        });
    }

    // Delete them in parallel (don't await strictly if you want speed, but good to know)
    if (imageToDelete.length > 0) {
        console.log(`Deleting ${imageToDelete.length} images from R2 for book ${shareId}`);
        await Promise.allSettled(imageToDelete.map(filename => deleteFromR2(filename)));
    }

    await Scrapbook.deleteOne({ shareId });

    return NextResponse.json({ success: true, message: 'Scrapbook deleted' });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
