'use client';
import React, { useState, useMemo } from 'react';
import Page from './Page';
import { Trash2 } from 'lucide-react';

export default function BookLayout({ pages, onUpdatePage, onRemovePair, readOnly, bgPattern, bgColor, onOpenDrawer }) {
  
  // ============================================
  // EDIT MODE: Display pages as vertical pairs (spreads)
  // ============================================
  const editSpreads = useMemo(() => {
    if (readOnly) return [];
    const spreads = [];
    // pages[0] and pages[1] are Front/Back covers
    // pages[2] starts the inner content
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push(pages.slice(i, i + 2));
    }
    return spreads;
  }, [pages, readOnly]);

  // Preview Mode logic removed. Use BookPreview for preview mode.

  // ============================================
  // EDIT MODE RENDER
  // ============================================
  return (
    <div className="flex flex-col gap-12 items-center w-full max-w-6xl px-4">
      {editSpreads.map((spread, index) => (
        <div key={index} className="flex flex-col items-center relative group/spread">
            {/* ... Spread Header ... */}
            <div className="mb-2 w-full flex justify-between items-end px-4">
                <div className="font-mono text-gray-500 font-bold uppercase tracking-widest text-xs">
                    {index === 0 ? "Cover (Front & Back)" : `Spread ${index}`}
                </div>
                {index > 0 && (
                    <button 
                        onClick={() => onRemovePair(index)}
                        className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs hover:bg-red-50 p-1 rounded transition-colors opacity-100 md:opacity-0 group-hover/spread:opacity-100"
                    >
                        <Trash2 className="w-4 h-4" /> Remove
                    </button>
                )}
            </div>

            {/* The Book Spread */}
            <div className="flex flex-col md:flex-row shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)]">
                {/* Left Page */}
                <div 
                    className={`w-[300px] h-[400px] md:w-[400px] md:h-[550px] border-4 border-black relative z-10 ${index === 0 ? 'border-r-2' : ''}`}
                    style={{ backgroundColor: bgColor || '#FFFDF5' }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20"></div>
                    <Page 
                        data={spread[0]} 
                        onUpdate={(type, content) => onUpdatePage(spread[0].id, type, content)}
                        side="left"
                        isCover={index === 0}
                        readOnly={false}
                        bgPattern={bgPattern}
                        bgColor={bgColor}
                        onOpenDrawer={onOpenDrawer}
                    />
                    <div className="absolute bottom-2 left-4 font-mono text-xs text-gray-400 font-bold">
                        {index === 0 ? "FRONT COVER" : `Page ${index * 2}`}
                    </div>
                </div>

                {/* Right Page */}
                {spread[1] && (
                    <div 
                        className={`w-[300px] h-[400px] md:w-[400px] md:h-[550px] border-y-4 border-r-4 border-black border-l-0 relative z-10 md:left-[-4px] ${index === 0 ? 'border-l-2' : ''}`}
                        style={{ backgroundColor: bgColor || '#FFFDF5' }}
                    >
                         <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20"></div>
                        <Page 
                            data={spread[1]} 
                            onUpdate={(type, content) => onUpdatePage(spread[1].id, type, content)}
                            side="right"
                            isCover={index === 0}
                            readOnly={false}
                            bgPattern={bgPattern}
                            bgColor={bgColor}
                            onOpenDrawer={onOpenDrawer}
                        />
                        <div className="absolute bottom-2 right-4 font-mono text-xs text-gray-400 font-bold">
                            {index === 0 ? "BACK COVER" : `Page ${index * 2 + 1}`}
                        </div>
                    </div>
                )}
            </div>
        </div>
      ))}
    </div>
  );
}