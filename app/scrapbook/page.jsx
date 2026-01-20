'use client';
import React from 'react';
import ScrapbookBuilder from '@/components/scrapbook/ScrapbookBuilder';

export default function ScrapbookPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans selection:bg-black selection:text-[#A3E635]">
        <ScrapbookBuilder />
    </div>
  );
}
