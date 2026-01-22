'use client';
import React from 'react';

export default function BinderFlip({ 
    sheets, 
    currentSheetIndex, 
    onFlipNext, 
    onFlipPrev, 
    bgColor, 
    renderPage 
}) {
    
  // Dimensions 
  const PAGE_WIDTH = 500;
  const PAGE_HEIGHT = 700;
  // Spread width includes the gap we create. 
  // Gap = 2 * RING_RADIUS. 
  // transformOrigin = -RING_RADIUS.
  const RING_RADIUS = 30; 
  const SPREAD_WIDTH = PAGE_WIDTH * 2 + (RING_RADIUS * 2);

  return (
      <div 
        className="relative flex items-center justify-center transform scale-[0.45] md:scale-100 transition-transform duration-300 origin-center"
        style={{ 
          width: SPREAD_WIDTH, 
          height: PAGE_HEIGHT,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* BINDER RINGS VISUALIZATION (Optional) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[60px] -ml-[30px] z-0 flex flex-col justify-evenly py-10 opacity-20 pointer-events-none">
            {[1,2,3,4].map(i => (
                <div key={i} className="w-full h-8 border-4 border-black rounded-full"></div>
            ))}
        </div>

        {/* FLIPPING STACK */}
        {sheets.map((sheet, index) => {
           const isFlipped = index < currentSheetIndex;
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
                 right: RING_RADIUS + PAGE_WIDTH, // Start at the right page pos? No.
                 // We want the Right Pages to have left edge at Center + Radius?
                 // No, standard book: Right pages are anchored to Spine (Center).
                 // Binder: Right pages anchored to Right Ring Edge.
                 // Let's use right: 0 relative to a container half-width?
                 // Let's stick to absolute positioning relative to center spine.
                 
                 // If container is SPREAD_WIDTH wide. Center is at SPREAD_WIDTH / 2.
                 // Right Page Left Edge = Center + RING_RADIUS?
                 // No, if origin is -30px (Left), it implies the pivot is 30px left of the element.
                 // If the element is positioned at Right of Center, and pivot is Center...
                 // Then element Left Edge = Center + 30px.
                 // Pivot (Center) is 30px to Left of Element. Correct.
                 
                 // So we position the element at:
                 left: '50%',
                 marginLeft: RING_RADIUS, // Shift right by radius
                 
                 width: PAGE_WIDTH,
                 height: PAGE_HEIGHT,
                 transformStyle: 'preserve-3d',
                 transformOrigin: `-${RING_RADIUS}px center`, // Pivot is at the Spine (which is 30px left of this element)
                 transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                 transition: 'transform 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
                 zIndex: zIndex,
                 cursor: 'pointer',
               }}
               className="group"
             >
               {/* FRONT FACE (Right Page) */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(0deg)',
                   backgroundColor: bgColor || '#FFFDF5'
                 }}
                 className={`overflow-hidden border-4 border-l-0 border-black border-y-4 border-r-4 rounded-r-md`}
               >
                 {renderPage(sheet.front, 'right')}
                 <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/5 border-l-2 border-black/10"></div>
                 <div className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-600" style={{ opacity: isFlipped ? 0.3 : 0 }} />
               </div>
               
               {/* BACK FACE (Left Page) */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)',
                   backgroundColor: bgColor || '#FFFDF5'
                 }}
                 className={`overflow-hidden border-4 border-r-0 border-black border-y-4 border-l-4 rounded-l-md`}
               >
                 {renderPage(sheet.back, 'left')}
                 {/* Hole Punch Visuals on Spine Edge */}
                 <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/5 border-r-2 border-black/10"></div>
                 <div className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-600" style={{ opacity: index < currentSheetIndex - 1 ? 0.1 : 0 }} />
               </div>
             </div>
           );
         })}
      </div>
  );
}
