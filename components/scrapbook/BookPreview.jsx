'use client';
import React, { useState, useMemo } from 'react';
import Page from './Page';
import DefaultFlip from './animations/DefaultFlip';
import SlideFlip from './animations/SlideFlip';
import BinderFlip from './animations/BinderFlip';

// Book style configurations
const BOOK_STYLES = {
  classic: {
    border: 'border-4 border-black',
    shadow: 'shadow-[8px_8px_0px_0px_black]',
    rounded: '',
  },
  leather: {
    border: 'border-4 border-amber-900',
    shadow: 'shadow-lg',
    rounded: 'rounded-sm',
  },
  modern: {
    border: 'border-2 border-gray-300',
    shadow: 'shadow-xl',
    rounded: 'rounded-lg',
  },
  vintage: {
    border: 'border-4 border-amber-700',
    shadow: 'shadow-md',
    rounded: '',
  },
  minimal: {
    border: 'border border-gray-200',
    shadow: 'shadow-sm',
    rounded: 'rounded-xl',
  },
};

export default function BookPreview({ pages, bgPattern, bgColor, soundId, animId, bookStyle = 'classic' }) {
  
  const styleConfig = BOOK_STYLES[bookStyle] || BOOK_STYLES.classic;
  
  // ============================================
  // PREVIEW MODE: Physical Sheet Logic
  // ============================================
  
  // We transform the flat list of pages into "Sheets" of paper.
  // Each Sheet has a FRONT (seen on the right) and a BACK (seen on the left after flipping).
  const sheets = useMemo(() => {
    if (pages.length < 2) return [];
    
    const paperSheets = [];
    
    // --- SHEET 1: Front Cover / Page 2 ---
    // Front: Front Cover (pages[0])
    // Back:  The first inner page (pages[2]) - acts as the Left side of spread 1
    paperSheets.push({
      id: 'sheet-cover',
      front: { ...pages[0], pageType: 'cover-front' },
      back: pages[2] ? { ...pages[2], pageType: 'inner' } : null
    });

    // --- INNER SHEETS ---
    // Start from index 3 (Page 3 - Right side of spread 1)
    // We pair them: Front = Right Page, Back = Next Left Page
    let i = 3;
    while (i < pages.length) {
      const frontPage = pages[i];       // Right page
      const backPage = pages[i + 1];    // Left page (back of this sheet)

      // Check if we ran out of inner pages. 
      // If backPage is undefined, we might need to put the Back Cover here?
      // Or if we are at the very end, the Back Cover (pages[1]) goes on the back of the last sheet.
      
      const isLastSheet = i >= pages.length - 2;
      
      paperSheets.push({
        id: `sheet-${i}`,
        front: { ...frontPage, pageType: 'inner' },
        back: backPage ? { ...backPage, pageType: 'inner' } : (isLastSheet ? { ...pages[1], pageType: 'cover-back' } : null)
      });
      
      i += 2;
    }

    // Edge case: If we didn't add the back cover yet (e.g., even number of inner pages)
    // We add one final sheet just for the back cover
    const lastSheet = paperSheets[paperSheets.length - 1];
    if (lastSheet && lastSheet.back?.id !== pages[1].id) {
       paperSheets.push({
          id: 'sheet-back-cover',
          front: null, // White page
          back: { ...pages[1], pageType: 'cover-back' }
       });
    }

    return paperSheets;
  }, [pages]);

  // Current Sheet Index (0 = Cover is visible)
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  // Audio Ref
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if(soundId === 'page-flip') {
        audioRef.current = new Audio('/sounds/page-flip.m4a');
    } else {
        audioRef.current = null;
    }
  }, [soundId]);

  const playFlipSound = () => {
    if (audioRef.current && soundId !== 'none') {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  };
  
  const flipNext = () => {
    if (currentSheetIndex < sheets.length) {
      playFlipSound();
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const flipPrev = () => {
    if (currentSheetIndex > 0) {
      playFlipSound();
      setCurrentSheetIndex(prev => prev - 1);
    }
  };

  // Helper to render content safely
  const renderPageContent = (pageData, side) => {
    if (!pageData) return <div className="w-full h-full" style={{ backgroundColor: bgColor || '#FFFDF5' }} />;
    
    const isCover = pageData.pageType === 'cover-front' || pageData.pageType === 'cover-back';
    
    return (
      <Page 
        data={pageData} 
        onUpdate={() => {}} 
        side={side}
        isCover={isCover}
        readOnly={true}
        bgPattern={bgPattern}
        bgColor={bgColor}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full sm:min-h-[700px] relative overflow-hidden" style={{ perspective: '2000px' }}>
      
      {/* Book Component */}
      {animId === 'slide' ? (
        <SlideFlip
           sheets={sheets}
           currentSheetIndex={currentSheetIndex}
           onFlipNext={flipNext}
           onFlipPrev={flipPrev}
           bgColor={bgColor}
           renderPage={renderPageContent}
           styleConfig={styleConfig}
        />
      ) : animId === 'binder' ? (
        <BinderFlip
           sheets={sheets}
           currentSheetIndex={currentSheetIndex}
           onFlipNext={flipNext}
           onFlipPrev={flipPrev}
           bgColor={bgColor}
           renderPage={renderPageContent}
           styleConfig={styleConfig}
        />
      ) : (
        <DefaultFlip
           sheets={sheets}
           currentSheetIndex={currentSheetIndex}
           onFlipNext={flipNext}
           onFlipPrev={flipPrev}
           bgColor={bgColor}
           renderPage={renderPageContent}
           styleConfig={styleConfig}
        />
      )}

      
      {/* Navigation Arrows */}
      <div className="flex gap-6 -mt-36 md:mt-8 relative z-10 transition-all duration-300">
        <button 
          onClick={flipPrev} 
          disabled={currentSheetIndex === 0}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-full shadow disabled:opacity-30 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={flipNext} 
          disabled={currentSheetIndex >= sheets.length}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-full shadow disabled:opacity-30 transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page indicator */}
      <div className="mt-4 text-white font-mono font-bold tracking-widest text-sm opacity-50 uppercase pointer-events-none relative z-10">
        {currentSheetIndex === 0 
          ? "Front Cover" 
          : currentSheetIndex >= sheets.length
            ? "Back Cover" 
            : `Spread ${currentSheetIndex}`
        }
      </div>
    </div>
  );
}
