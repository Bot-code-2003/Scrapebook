import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2"; // Import your helper

import sharp from 'sharp';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);
    
    // OPTIMIZE: Convert to WebP and Resize if needed
    try {
        buffer = await sharp(buffer)
            .resize(1200, 1200, { // IDK, 1200 seems like a good max size for a scrapbook
                fit: 'inside',
                withoutEnlargement: true 
            })
            .webp({ quality: 80 }) // Compress to 80% quality
            .toBuffer();
    } catch (sharpError) {
        console.error("Image optimization failed, falling back to original:", sharpError);
        // Fallback to original buffer if sharp fails (e.g. for non-image files if we supported them)
    }

    // Create a unique filename with .webp extension
    const originalName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${sanitizedName}.webp`;
    
    // Upload as webp
    const url = await uploadToR2(buffer, filename, 'image/webp');
    
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
