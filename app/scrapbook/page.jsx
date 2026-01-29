'use client';
import React from 'react';
import ScrapbookBuilder from '@/components/scrapbook/ScrapbookBuilder';

export default function ScrapbookPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100">
        <ScrapbookBuilder />
    </div>
  );
}
