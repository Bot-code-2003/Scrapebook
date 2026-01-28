'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Page from './Page';
import DefaultFlip from './animations/DefaultFlip';
import SlideFlip from './animations/SlideFlip';
import BinderFlip from './animations/BinderFlip';
import MobileFlip from './animations/MobileFlip';

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
    } else if (soundId === 'cute-click') {
        audioRef.current = new Audio('/sounds/Cute-click.mp3');
    } else if (soundId === 'heavy-flip') {
        audioRef.current = new Audio('/sounds/heavy-flip.mp3');
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
  
  // Track window width for responsive scaling (re-renders on resize)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 400);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Flatten pages for mobile reading order but structured as SHEETS for the flip animation
  // User Requirement: "Left page empty, Right page content filled."
  // Left sliver visibility:
  //   - 1/n (Front Cover): NO left sliver (viewing first sheet, nothing flipped yet)
  //   - 2/n to (n-1)/n (Inner Pages): YES left sliver (previous sheets are flipped)
  //   - n/n (Back Cover): NO left sliver (hidden via isCoverPage prop)
  const mobileSheets = useMemo(() => {
      if (!pages || pages.length === 0) return [];
      
      const mSheets = [];

      // 1. Front Cover (pages[0]) - shown at 1/N
      // When this sheet is flipped (viewing 2/N onwards), its back creates the left sliver
      if (pages[0]) {
        mSheets.push({
            id: 'mobile-sheet-front-cover',
            front: { ...pages[0], pageType: 'cover-front' },
            // IMPORTANT: Give it a placeholder back so it shows as sliver when flipped
            back: { id: 'placeholder-front-cover-back', pageType: 'inner', elements: [] }
        });
      }
      
      // 2. Inner Pages (pages[2] onwards) - shown at 2/N to (N-1)/N
      // Inner pages get left slivers for aesthetics (when flipped, their back shows as sliver)
      for(let k=2; k<pages.length; k++) {
          mSheets.push({
             id: `mobile-sheet-${k}`,
             front: { ...pages[k], pageType: 'inner' },
             back: { id: `placeholder-${k}`, pageType: 'inner', elements: [] }
          });
      }
      
      // 3. Back Cover (pages[1]) - shown LAST at N/N
      // No back needed since this is the last page (nothing after it to flip to)
      if (pages.length > 1 && pages[1]) {
          mSheets.push({
              id: 'mobile-sheet-back-cover',
              front: { ...pages[1], pageType: 'cover-back' },
              back: null
          });
      }
      
      return mSheets;
  }, [pages]);

  const handleMobileNext = () => {
      if (mobilePageIndex < mobileSheets.length - 1) {
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

      {/* --- MOBILE VIEW (SCALED DESKTOP FLIP) --- */}
      {/* We reuse the desktop components but with 'mobileSheets' and Scaled Down */}
      <div className="md:hidden flex flex-col items-center justify-center w-full h-full overflow-hidden">
        <div 
            className="origin-center transition-transform duration-500 will-change-transform"
            style={{
                transform: (() => {
                    const currentId = mobileSheets[mobilePageIndex]?.id || '';
                    const isCover = currentId.includes('cover');
                    
                    // Responsive scaling with explicit min-max breakpoints
                    // Each range is independent - change one without affecting others
                    // Uses windowWidth state which updates on resize
                    
                    // Define breakpoints: { min, max, scale }
                    const breakpoints = [
                      { min: 0,   max: 250, scale: 1 },
                      { min: 251, max: 300, scale: 1 },
                      { min: 300, max: 350, scale: 1.2 },
                        { min: 0,   max: 379, scale: 1.35 },   // Very small (iPhone SE ~375px)
                        { min: 380, max: 449, scale: 1.7 },    // Small phones
                        { min: 450, max: 549, scale: 1.60 },   // Medium phones
                        { min: 550, max: 9999, scale: 1.70 },  // Large phones / tablets
                    ];
                    
                    // Find matching breakpoint using tracked windowWidth
                    const match = breakpoints.find(bp => windowWidth >= bp.min && windowWidth <= bp.max);
                    const scale = match ? `scale(${match.scale})` : 'scale(1.5)';
                    
                    // Unified positioning
                    const translate = 'translateX(-11%)';
                    
                    return `${scale} ${translate}`;
                })()
            }}
        >
            {animId === 'slide' ? (
            <SlideFlip
                sheets={mobileSheets}
                currentSheetIndex={mobilePageIndex}
                onFlipNext={handleMobileNext}
                onFlipPrev={handleMobilePrev}
                bgColor={bgColor}
                renderPage={renderPageContent}
                styleConfig={styleConfig}
                isCoverPage={mobilePageIndex === mobileSheets.length - 1}
            />
            ) : animId === 'binder' ? (
            <BinderFlip
                sheets={mobileSheets}
                currentSheetIndex={mobilePageIndex}
                onFlipNext={handleMobileNext}
                onFlipPrev={handleMobilePrev}
                bgColor={bgColor}
                renderPage={renderPageContent}
                styleConfig={styleConfig}
                isCoverPage={mobilePageIndex === mobileSheets.length - 1}
            />
            ) : (
            <DefaultFlip
                sheets={mobileSheets}
                currentSheetIndex={mobilePageIndex}
                onFlipNext={handleMobileNext}
                onFlipPrev={handleMobilePrev}
                bgColor={bgColor}
                renderPage={renderPageContent}
                styleConfig={styleConfig}
                isCoverPage={mobilePageIndex === mobileSheets.length - 1}
            />
            )}
        </div>
      </div>

       {/* Mobile Toolbar (Bottom - Fixed/Independent) */}
      <div className="md:hidden fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-50 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-6 drop-shadow-2xl">
              <button 
                onClick={handleMobilePrev}
                disabled={mobilePageIndex === 0}
                className="bg-black/60 text-white p-4 rounded-full backdrop-blur-md border border-white/20 shadow-lg disabled:opacity-30 disabled:border-transparent transition-all active:scale-90 hover:bg-black/80"
              >
                  <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="font-bold text-white text-sm tracking-[0.2em] uppercase bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg min-w-[100px] text-center">
                  {mobilePageIndex + 1} / {mobileSheets.length}
              </div>

              <button 
                onClick={handleMobileNext}
                disabled={mobilePageIndex >= mobileSheets.length - 1}
                className="bg-black/60 text-white p-4 rounded-full backdrop-blur-md border border-white/20 shadow-lg disabled:opacity-30 disabled:border-transparent transition-all active:scale-90 hover:bg-black/80"
              >
                  <ChevronRight className="w-6 h-6" />
              </button>
          </div>
      </div>

      
      {/* Navigation controls removed for cleaner preview */}
    </div>
  );
}
