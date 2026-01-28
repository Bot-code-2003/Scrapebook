'use client';
import React from 'react';

export default function DefaultFlip({ 
    sheets, 
    currentSheetIndex, 
    onFlipNext, 
    onFlipPrev, 
    bgColor, 
    renderPage,
    styleConfig = { border: 'border-4 border-black', shadow: '', rounded: '' },
    isCoverPage = false  // When true, hide the left page stack (sliver)
}) {
    
  // Dimensions 
  const PAGE_WIDTH = 500;
  const PAGE_HEIGHT = 700;
  const SPREAD_WIDTH = PAGE_WIDTH * 2;

  // Extract border width for left/right edge handling
  const borderClass = styleConfig.border || 'border-4 border-black';
  
  return (
      <div 
        className="relative flex items-center justify-center transform scale-[0.45] md:scale-100 transition-transform duration-300 origin-center"
        style={{ 
          width: SPREAD_WIDTH, 
          height: PAGE_HEIGHT,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* FLIPPING STACK */}
        {sheets.map((sheet, index) => {
           // Logic: Pages with index < currentSheetIndex are flipped (-180deg)
           const isFlipped = index < currentSheetIndex;
           
           // Z-Index Logic:
           // Right Stack (Unflipped): 0 is Top, 1 is under. (Descending z-index)
           // Left Stack (Flipped): 0 is Bottom, 1 is Top. (Ascending z-index)
           // We add a small offset to flipped pages to prevent z-fighting during the exact crossover
           const zIndex = isFlipped ? index : (sheets.length - index);

           // CRITICAL: When on a cover page, completely hide ALL flipped sheets
           // This removes the left sliver effect for front cover (1/n) and back cover (n/n)
           const shouldHideFlippedSheet = isFlipped && isCoverPage;

           return (
             <div
               key={sheet.id}
               onClick={() => {
                 if (index === currentSheetIndex) onFlipNext();
                 if (index === currentSheetIndex - 1) onFlipPrev();
               }}
               style={{
                 position: 'absolute',
                 right: 0, // Anchor to the spine (center of container)
                 width: PAGE_WIDTH,
                 height: PAGE_HEIGHT,
                 transformStyle: 'preserve-3d',
                 transformOrigin: 'left center',
                 transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                 transition: shouldHideFlippedSheet 
                   ? 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.3s ease-out 0.5s'
                   : 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.3s ease-out',
                 zIndex: zIndex,
                 cursor: 'pointer',
                 // Fade out flipped sheets on cover pages (with delay to allow flip animation to complete)
                 opacity: shouldHideFlippedSheet ? 0 : 1,
                 pointerEvents: shouldHideFlippedSheet ? 'none' : 'auto',
               }}
               className="group"
             >
               {/* --------------------------- */}
               {/* FRONT FACE (Right Page)     */}
               {/* --------------------------- */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden', // Hides this face when flipped
                   transform: 'rotateY(0deg)',
                   backgroundColor: bgColor || '#FFFDF5'
                 }}
                 // Matching Edit Mode Borders and visual style
                 className={`overflow-hidden ${borderClass} border-l-0 ${styleConfig.rounded} ${styleConfig.shadow}`}
               >
                 {renderPage(sheet.front, 'right')}
                 
                 {/* Spine Shadow / Gradient for depth */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                 
                 {/* Lighting effect during flip */}
                 <div 
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-600"
                    style={{ opacity: isFlipped ? 0.3 : 0 }} 
                 />
               </div>
               
               {/* --------------------------- */}
               {/* BACK FACE (Left Page)       */}
               {/* --------------------------- */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)',
                   backgroundColor: bgColor || '#FFFDF5',
                   // Hide the back face if there's no content
                   visibility: sheet.back ? 'visible' : 'hidden'
                 }}
                 // Matching Edit Mode Borders
                 className={`overflow-hidden ${borderClass} border-r-0 ${styleConfig.rounded}`}
               >
                 {renderPage(sheet.back, 'left')}
                 
                 {/* Spine Shadow for Left Page */}
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                 
                 {/* Lighting effect: Darken when it is UNDER other pages on the left */}
                 <div 
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-600"
                    // If this is not the top-most flipped page, darken it slightly
                    style={{ opacity: index < currentSheetIndex - 1 ? 0.1 : 0 }} 
                 />
               </div>
             </div>
           );
         })}
      </div>
  );
}
