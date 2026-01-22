'use client';
import React, { useState, useMemo } from 'react';
import Page from './Page';
import { Trash2 } from 'lucide-react';

export default function BookLayout({ pages, onUpdatePage, onRemovePair, readOnly, bgPattern, bgColor, pageBorder, onOpenDrawer }) {
  
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
    <div className="flex flex-col gap-8 items-center w-full max-w-6xl px-4">
      {editSpreads.map((spread, index) => (
        <div key={index} className="flex flex-col items-center relative group/spread">
            {/* ... Spread Header ... */}
            <div className="mb-3 w-full flex justify-between items-end px-4 max-w-[1000px]">
                <div className="font-bold text-gray-400 text-xs tracking-wide">
                    {index === 0 ? "Cover (Front & Back)" : `Spread ${index}`}
                </div>
                {index > 0 && (
                    <button 
                        onClick={() => onRemovePair(index)}
                        className="flex items-center gap-2 text-red-500 font-medium text-xs hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors opacity-100 md:opacity-0 group-hover/spread:opacity-100 bg-white shadow-sm border border-red-100"
                    >
                        <Trash2 className="w-4 h-4" /> Remove Spread
                    </button>
                )}
            </div>

            {/* The Book Spread */}
            <div className="flex flex-col md:flex-row shadow-2xl rounded-sm transform md:scale-90 md:origin-top md:-mb-16">
                {/* Left Page */}
                <div 
                    className={`w-[350px] h-[490px] md:w-[500px] md:h-[700px] relative z-10 overflow-hidden ${index === 0 ? 'rounded-l-sm' : ''}`}
                    style={{ backgroundColor: 'transparent' }} 
                >
                    <div className="absolute inset-0 border border-gray-200 pointer-events-none z-30" style={{ borderRight: 'none' }}></div>
                    <div 
                        className="w-full h-full relative"
                        style={{ backgroundColor: bgColor || '#FFFDF5' }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20 mix-blend-multiply opacity-50"></div>
                        <Page 
                            data={spread[0]} 
                            onUpdate={(type, content) => onUpdatePage(spread[0].id, type, content)}
                            side="left"
                            isCover={index === 0}
                            readOnly={false}
                            bgPattern={bgPattern}
                            bgColor={bgColor}
                            pageBorder={pageBorder}
                            onOpenDrawer={onOpenDrawer}
                        />
                        <div className="absolute bottom-3 left-4 text-[10px] text-gray-400 font-medium tracking-wide">
                            {index === 0 ? "FRONT COVER" : `PAGE ${index * 2}`}
                        </div>
                    </div>
                </div>

                {/* Right Page */}
                {spread[1] && (
                    <div 
                        className={`w-[350px] h-[490px] md:w-[500px] md:h-[700px] relative z-10 overflow-hidden md:left-[-1px] ${index === 0 ? 'rounded-r-sm' : ''}`}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <div className="absolute inset-0 border border-gray-200 pointer-events-none z-30" style={{ borderLeft: 'none' }}></div>
                        <div 
                            className="w-full h-full relative"
                            style={{ backgroundColor: bgColor || '#FFFDF5' }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20 mix-blend-multiply opacity-50"></div>
                            <Page 
                                data={spread[1]} 
                                onUpdate={(type, content) => onUpdatePage(spread[1].id, type, content)}
                                side="right"
                                isCover={index === 0}
                                readOnly={false}
                                bgPattern={bgPattern}
                                bgColor={bgColor}
                                pageBorder={pageBorder}
                                onOpenDrawer={onOpenDrawer}
                            />
                            <div className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium tracking-wide">
                                {index === 0 ? "BACK COVER" : `PAGE ${index * 2 + 1}`}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      ))}
    </div>
  );
}