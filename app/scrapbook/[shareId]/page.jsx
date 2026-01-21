import React from 'react';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import { notFound } from 'next/navigation';
import ScrapbookViewer from '@/components/scrapbook/ScrapbookViewer';

export default async function ViewScrapbook({ params }) {
  const { shareId } = await params;
  
  try {
    await connectDB();
    const scrapbook = await Scrapbook.findOne({ shareId }).lean();

    if (!scrapbook) {
      notFound();
    }

    // Serialize MongoDB object to pass to client component
    const serializedData = JSON.parse(JSON.stringify({
      shareId: scrapbook.shareId,
      pages: scrapbook.pages,
      bgPattern: scrapbook.bgPattern,
      bgColor: scrapbook.bgColor,
      animId: scrapbook.animId || 'default',
      soundId: scrapbook.soundId || 'page-flip',
      pageBorder: scrapbook.pageBorder || 'none',
      bookStyle: scrapbook.bookStyle || 'classic',
      title: scrapbook.title || 'Untitled Scrapbook',
    }));

    return <ScrapbookViewer scrapbook={serializedData} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

