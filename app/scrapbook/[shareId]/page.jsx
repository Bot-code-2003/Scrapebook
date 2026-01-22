import React from 'react';
import connectDB from '@/lib/mongodb';
import Scrapbook from '@/lib/models/Scrapbook';
import { notFound } from 'next/navigation';
import ScrapbookViewer from '@/components/scrapbook/ScrapbookViewer';

export async function generateMetadata({ params }) {
  const { shareId } = await params;
  
  try {
    await connectDB();
    const scrapbook = await Scrapbook.findOne({ shareId }).lean();
    
    if (!scrapbook) {
      return {
        title: 'Scrapbook Not Found - MyScrapebook',
        description: 'This scrapbook could not be found.',
      };
    }

    const title = scrapbook.title || 'Untitled Scrapbook';
    
    return {
      title: `${title} - MyScrapebook`,
      description: `View this beautiful digital scrapbook "${title}" created on MyScrapebook. An interactive memory book with ${scrapbook.pages?.length || 0} pages.`,
      keywords: 'digital scrapbook, photo album, memory book, MyScrapebook, shared scrapbook, digital gift',
      openGraph: {
        title: `${title} - MyScrapebook`,
        description: `View this interactive digital scrapbook with ${scrapbook.pages?.length || 0} pages.`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'MyScrapebook',
      description: 'View digital scrapbooks and photo albums on MyScrapebook.',
    };
  }
}

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

