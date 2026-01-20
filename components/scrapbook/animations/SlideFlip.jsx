'use client';
import React from 'react';

export default function SlideFlip({ 
    sheets, 
    currentSheetIndex, 
    onFlipNext, 
    onFlipPrev, 
    bgColor, 
    renderPage 
}) {
    
  // Dimensions 
  const PAGE_WIDTH = 400;
  const PAGE_HEIGHT = 550;
  const SPREAD_WIDTH = PAGE_WIDTH * 2;

  // For SlideFlip, we render spreads as horizontal slides sort of like cards.
  // Actually, to make it consistent with the "Sheet" structure but with sliding:
  // When Sheet N is active, it is "on top". 
  // When we go next, this sheet slides to the left, revealing the next one?
  // No, in book format, the "Next Spread" is underneath the current one on the right.
  // But on the left, we usually see the previous page.
  // Let's implement a "Stack" Slide.
  // Sheets are stacked on the right.
  // Flip Next: The top sheet slides to the left.
  // Once it slides to the left, it shows its Back Face.
  // Current logic:
  // Sheet has Front (Right) and Back (Left).
  // If Sheet is NOT flipped (index >= current): It is on the right stack.
  // If Sheet IS flipped (index < current): It is on the left stack.
  
  // Slide Animation:
  // Flipped sheets should be at X = -PAGE_WIDTH (or simply 0 relative to left container?).
  // Unflipped sheets should be at X = 0 (Right side).
  
  return (
      <div 
        className="relative flex items-center justify-center transform scale-[0.45] md:scale-100 transition-transform duration-300 origin-center"
        style={{ 
          width: SPREAD_WIDTH, 
          height: PAGE_HEIGHT,
          // No perspective needed for pure 2D slide, but we keep it for z-index consistency if mixed
        }}
      >
        {/* CENTER POINT aka SPINE */}
        {/* We position relative to the center. Right pages start at 0. Left pages start at -PAGE_WIDTH. */}
        
        {sheets.map((sheet, index) => {
           const isFlipped = index < currentSheetIndex;
           
           // Z-Index:
           // Unflipped (Right Stack): Top is first index? No, Top is currentSheetIndex.
           // Actually, if we are at sheet 0: Sheet 0 is visible. Sheet 1 is under it.
           // So Unflipped Stack: Descending visibility.
           // Flipped (Left Stack): Ascending visibility. (Sheet 0 is bottom, Sheet 1 is above it...)
           const zIndex = isFlipped ? index : (sheets.length - index);

           return (
             <div
               key={sheet.id}
               onClick={() => {
                 if (index === currentSheetIndex) onFlipNext();
                 if (index === currentSheetIndex - 1) onFlipPrev();
               }}
               style={{
                 position: 'absolute',
                 left: '50%', // Spine
                 top: 0,
                 width: PAGE_WIDTH,
                 height: PAGE_HEIGHT,
                 transition: 'transform 0.5s ease-in-out',
                 transform: isFlipped ? 'translateX(-100%)' : 'translateX(0%)',
                 zIndex: zIndex,
                 cursor: 'pointer',
               }}
               className="group shadow-xl"
             >
               {/* INNER CONTAINER FOR FACES */}
               {/* 
                   In Slide mode, we don't rotate. 
                   So how do we see the "Back" face? 
                   If isFlipped is TRUE, we are on the left. We should see the Back Face.
                   If isFlipped is FALSE, we are on the right. We should see the Front Face.
                   We can just conditionally hide/show faces.
                */}
                
               {/* FRONT FACE (Visible when NOT flipped) */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   opacity: isFlipped ? 0 : 1, // Fade out when flipped
                   pointerEvents: isFlipped ? 'none' : 'auto',
                   transition: 'opacity 0.2s 0.2s', // Delay fade out slightly so it slides then fades? Or instant?
                   // If we slide, we want it to look like the card is moving.
                   // If we fade midway, it's weird.
                   // Better: The div contains TWO faces side-by-side? No, width is PAGE_WIDTH.
                   // Let's just swap opacity at 50%?
                   backgroundColor: bgColor || '#FFFDF5'
                 }}
                 className="overflow-hidden border-4 border-l-4 border-black border-r-4 transition-all"
               >
                 {renderPage(sheet.front, 'right')}
                 {/* Shadow overlay */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
               </div>
               
               {/* BACK FACE (Visible when FLIPPED takes over) */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   opacity: isFlipped ? 1 : 0,
                   pointerEvents: isFlipped ? 'auto' : 'none',
                   transition: 'opacity 0.2s 0.2s',
                   backgroundColor: bgColor || '#FFFDF5'
                 }}
                 className="overflow-hidden border-4 border-r-4 border-black border-l-4 transition-all"
               >
                 {renderPage(sheet.back, 'left')}
                  {/* Shadow overlay */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
               </div>
             </div>
           );
         })}
      </div>
  );
}
