'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Page from './Page';
import DefaultFlip from './animations/DefaultFlip';
import SlideFlip from './animations/SlideFlip';
import BinderFlip from './animations/BinderFlip';

// Book style configurations
const BOOK_STYLES = {
  classic: {
    border: 'border border-gray-200',
    shadow: 'shadow-2xl shadow-black/20',
    rounded: 'rounded-sm',
  },
  leather: {
    border: 'border border-amber-900/30',
    shadow: 'shadow-xl shadow-amber-900/20',
    rounded: 'rounded-md',
  },
  modern: {
    border: 'border border-gray-100',
    shadow: 'shadow-2xl shadow-gray-200/50',
    rounded: 'rounded-xl',
  },
  vintage: {
    border: 'border border-amber-800/20',
    shadow: 'shadow-xl shadow-amber-900/10',
    rounded: 'rounded-r-md',
  },
  minimal: {
    border: 'border border-gray-50',
    shadow: 'shadow-lg shadow-gray-100',
    rounded: 'rounded-3xl',
  },
};

export default function BookPreview({ pages, bgPattern, bgColor, pageBorder, soundId, animId, bookStyle = 'classic', defaultPage = 0, showControls = true }) {

  
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
  const [currentSheetIndex, setCurrentSheetIndex] = useState(defaultPage);

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
        pageBorder={pageBorder}
      />
    );
  };

  // ============================================
  // MOBILE VIEW LOGIC
  // ============================================
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  
  // Flatten pages for mobile reading order: 0 (Front), 2, 3, 4... (Inner), 1 (Back)
  const mobilePages = useMemo(() => {
      if (pages.length < 2) return [];
      const ordered = [];
      // 1. Front Cover
      ordered.push({ ...pages[0], pageType: 'cover-front' });
      // 2. Inner Pages (In numerical order of ID usually, but here index 2 onwards)
      for(let k=2; k<pages.length; k++) {
          ordered.push({ ...pages[k], pageType: 'inner' });
      }
      // 3. Back Cover
      ordered.push({ ...pages[1], pageType: 'cover-back' });
      return ordered;
  }, [pages]);

  const handleMobileNext = () => {
      if (mobilePageIndex < mobilePages.length - 1) {
          playFlipSound();
          setMobilePageIndex(prev => prev + 1);
      }
  };

  const handleMobilePrev = () => {
      if (mobilePageIndex > 0) {
          playFlipSound();
          setMobilePageIndex(prev => prev - 1);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full sm:min-h-[700px] relative overflow-hidden " style={{ perspective: '2000px' }}>
      
      {/* --- DESKTOP VIEW (SPREADS) --- */}
      <div className="hidden md:flex scale-[0.90] sm:scale-100 origin-center">
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
      </div>

      {/* --- MOBILE VIEW (SINGLE PAGE) --- */}
      <div className="md:hidden flex flex-col items-center justify-center w-full h-full p-4 overflow-y-auto">
          
          {/* Page Container: Responsive Width, Aspect Ratio Preserved */}
          <div className="relative w-[90vw] md:max-w-[600px] aspect-[5/7] shadow-2xl flex-shrink-0 bg-white">
              {/* Render Current Mobile Page */}
              <div className={` h-full overflow-hidden ${styleConfig.rounded} ${styleConfig.border} relative`}>
                  {renderPageContent(mobilePages[mobilePageIndex], 'right')}
              </div>

             
          </div>

          {/* Mobile Toolbar (Bottom) */}
          <div className="mt-8 flex items-center gap-6 z-50 flex-shrink-0">
              <button 
                onClick={handleMobilePrev}
                disabled={mobilePageIndex === 0}
                className="bg-white/10 text-white p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg disabled:opacity-30 disabled:border-transparent transition-all active:scale-90"
              >
                  <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="font-bold text-white/90 text-sm tracking-[0.2em] uppercase bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                  {mobilePageIndex + 1} / {mobilePages.length}
              </div>

              <button 
                onClick={handleMobileNext}
                disabled={mobilePageIndex === mobilePages.length - 1}
                className="bg-white/10 text-white p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg disabled:opacity-30 disabled:border-transparent transition-all active:scale-90"
              >
                  <ChevronRight className="w-6 h-6" />
              </button>
          </div>

      </div>

      
      {/* Navigation controls removed for cleaner preview */}
    </div>
  );
}
