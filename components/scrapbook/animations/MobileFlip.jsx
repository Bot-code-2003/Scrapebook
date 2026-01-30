'use client';
import React from 'react';

export default function MobileFlip({ 
    pages, 
    currentPageIndex, 
    onFlipNext, 
    onFlipPrev, 
    bgColor, 
    renderPage,
    getPageOrigin = () => 'origin-left',
    styleConfig = { border: '', rounded: '' }
}) {
    
  return (
      <div 
        className="relative w-full h-full"
        style={{ 
          perspective: '1500px',
          perspectiveOrigin: '0% 50%' // Eye is looking from the spine
        }}
      >
        {/* FLIPPING STACK */}
        {pages.map((page, index) => {
           // Logic: Pages with index < currentPageIndex are flipped (-180deg)
           const isFlipped = index < currentPageIndex;
           
           // Optimization: Only render pages close to current index to save memory/DOM?
           // For a scrapbook < 20 pages, rendering all is fine.
           
           // Z-Index: Unflipped stack (Right) descends. Flipped stack (Left) ascends.
           const zIndex = isFlipped ? index : (pages.length - index);
           
           const originClass = getPageOrigin(page);

           return (
             <div
               key={index}
               onClick={() => {
                 if (index === currentPageIndex) onFlipNext();
               }}
               className={`absolute top-0 left-0 w-full h-full preserve-3d cursor-pointer ${originClass}`}
               style={{
                 transformStyle: 'preserve-3d',
                 transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                 transition: `transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0s ${isFlipped ? '0.4s' : '0s'}`,
                 zIndex: zIndex,
               }}
             >
               {/* --------------------------- */}
               {/* FRONT FACE (Visible Page)   */}
               {/* --------------------------- */}
               <div
                 className={`absolute inset-0 bg-white overflow-hidden backface-hidden ${styleConfig.rounded} ${styleConfig.border}`}
                 style={{
                   backfaceVisibility: 'hidden',
                   WebkitBackfaceVisibility: 'hidden',
                   transform: 'rotateY(0deg)',
                 }}
               >
                 {renderPage(page, 'right')}
                 
                 {/* Spine Shadow */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none mix-blend-multiply" />
                 
                 {/* Lighting: Darken when flipping */}
                 <div 
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
                    style={{ opacity: isFlipped ? 0.4 : 0 }} 
                 />
               </div>
               
               {/* --------------------------- */}
               {/* BACK FACE (Flipped State)   */}
               {/* --------------------------- */}
               <div
                 className={`absolute inset-0 overflow-hidden backface-hidden ${styleConfig.rounded}`}
                 style={{
                   backfaceVisibility: 'hidden',
                   WebkitBackfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)',
                   backgroundColor: bgColor || '#f5f5f5' // The "Back" of the page
                 }}
               >
                 {/* This side goes off-screen to the left usually. 
                     We can put a subtle paper texture or the previous page's content reflected if we wanted,
                     but for "Sliver" aesthetic, a simple paper color is enough.
                 */}
                  <div className="w-full h-full opacity-10" 
                        style={{ 
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")',
                            backgroundSize: '200px' 
                        }} 
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
               </div>
             </div>
           );
         })}
      </div>
  );
}
