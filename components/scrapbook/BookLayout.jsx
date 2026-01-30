'use client';
import React, { useMemo } from 'react';
import Page from './Page';
import { Trash2 } from 'lucide-react';

// WYSIWYG: Render pages at "reference" size (matching preview) and scale down for editor view
// Reference size matches preview dimensions
const REFERENCE_WIDTH = 500;
const REFERENCE_HEIGHT = 700;

// Editor display dimensions (smaller for compact view)
const EDITOR_WIDTH_MOBILE = 280;
const EDITOR_HEIGHT_MOBILE = 392;
const EDITOR_WIDTH_DESKTOP = 360;
const EDITOR_HEIGHT_DESKTOP = 504;

// Calculate scale factors for WYSIWYG
const SCALE_MOBILE = EDITOR_WIDTH_MOBILE / REFERENCE_WIDTH; // 0.56
const SCALE_DESKTOP = EDITOR_WIDTH_DESKTOP / REFERENCE_WIDTH; // 0.72

export default function BookLayout({ pages, onUpdatePage, onStickerUpdate, onRemovePair, readOnly, bgPattern, bgColor, pageBorder, pageBgImage, pageBgOpacity, onOpenDrawer }) {
  
  // ============================================
  // EDIT MODE: Display pages as vertical pairs (spreads)
  // ============================================
  const editSpreads = useMemo(() => {
    if (readOnly) return [];
    const spreads = [];
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push(pages.slice(i, i + 2));
    }
    return spreads;
  }, [pages, readOnly]);

  // ============================================
  // EDIT MODE RENDER
  // ============================================
  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-6xl px-4">
      {editSpreads.map((spread, index) => (
        <div key={index} className="flex flex-col items-center relative group/spread">
            {/* Spread Header */}
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
            <div className="flex flex-col md:flex-row shadow-2xl rounded-sm">
                {/* Left Page - Outer container sets visual size */}
                <div 
                    className={`relative z-10 overflow-hidden w-[280px] h-[392px] md:w-[360px] md:h-[504px] ${index === 0 ? 'rounded-l-sm' : ''}`}
                >
                    <div className="absolute inset-0 border border-gray-200 pointer-events-none z-30" style={{ borderRight: 'none' }}></div>
                    
                    {/* Scaled Content Container - renders at full size, scaled down */}
                    <div 
                        className="origin-top-left absolute top-0 left-0 w-[500px] h-[700px] scale-[0.56] md:scale-[0.72]"
                        style={{ 
                            backgroundColor: bgColor || '#FFFDF5'
                        }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20 mix-blend-multiply opacity-50"></div>
                        <Page 
                            data={spread[0]} 
                            onUpdate={(type, content) => onUpdatePage(spread[0].id, type, content)}
                            onUpdateStickers={(stickers) => onStickerUpdate(spread[0].id, stickers)}
                            side="left"
                            isCover={index === 0}
                            readOnly={false}
                            bgPattern={bgPattern}
                            bgColor={bgColor}
                            pageBorder={pageBorder}
                            pageBgImage={pageBgImage}
                            pageBgOpacity={pageBgOpacity}
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
                        className={`relative z-10 overflow-hidden w-[280px] h-[392px] md:w-[360px] md:h-[504px] md:ml-[-1px] ${index === 0 ? 'rounded-r-sm' : ''}`}
                    >
                        <div className="absolute inset-0 border border-gray-200 pointer-events-none z-30" style={{ borderLeft: 'none' }}></div>
                        
                        {/* Scaled Content Container */}
                        <div 
                            className="origin-top-left absolute top-0 left-0 w-[500px] h-[700px] scale-[0.56] md:scale-[0.72]"
                            style={{ 
                                backgroundColor: bgColor || '#FFFDF5'
                            }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20 mix-blend-multiply opacity-50"></div>
                            <Page 
                                data={spread[1]} 
                                onUpdate={(type, content) => onUpdatePage(spread[1].id, type, content)}
                                onUpdateStickers={(stickers) => onStickerUpdate(spread[1].id, stickers)}
                                side="right"
                                isCover={index === 0}
                                readOnly={false}
                                bgPattern={bgPattern}
                                bgColor={bgColor}
                                pageBorder={pageBorder}
                                pageBgImage={pageBgImage}
                                pageBgOpacity={pageBgOpacity}
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