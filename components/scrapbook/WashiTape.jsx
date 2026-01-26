import React from 'react';

// Helper to get image path from id
const getTapeImage = (id) => {
    switch(id) {
        case 'tape-abstract-pink': return '/washi tapes/washitape-abstract-pink.webp';
        case 'tape-blue-hearts': return '/washi tapes/washitape-blue-hearts.webp';
        case 'tape-indigo-hearts': return '/washi tapes/washitape-indigo-hearts.webp';
        case 'tape-oranges': return '/washi tapes/washitape-oranges.webp';
        case 'tape-pink-hearts': return '/washi tapes/washitape-pink-hearts.webp';
        default: return null;
    }
};

export default function WashiTape({ variant, position = 'corners-4' }) {
  const imageSrc = getTapeImage(variant);
  
  // If it's one of the old code-based ones, keep them or remove? 
  // User said "remove existing washitapes", so we only support new ones + maybe strawberry if they didn't explicitly say remove strawberry? "remove the existing washitapes" usually implies all previous ones.
  // However, the "Strawberry" one was just made and highly customized. 
  // Let's keep strawberry as a special case if needed, but primarily implement the new image ones.
  // Actually, I will remove the old cases as requested.

  if (!imageSrc) return null;

  // Render based on position
  // Positions: 'top' (top center), 'corners-2' (top-left, bottom-right), 'corners-4' (all 4)
  
  const TapeImg = ({ className, style }) => (
      <img src={imageSrc} className={`absolute z-20 object-contain drop-shadow-sm opacity-90 ${className}`} style={style} alt="tape" />
  );

  return (
    <>
        {position === 'top' && (
             <TapeImg className="-top-4 left-1/2 -translate-x-1/2 w-32 h-12 rotate-[-2deg]" />
        )}

        {(position === 'corners-2' || position === 'corners-4') && (
            <>
                <TapeImg className="-top-4 -left-4 w-24 h-12 rotate-[-45deg]" />
                <TapeImg className="-bottom-4 -right-4 w-24 h-12 rotate-[-45deg]" />
            </>
        )}

        {position === 'corners-4' && (
            <>
                <TapeImg className="-top-4 -right-4 w-24 h-12 rotate-[45deg]" />
                <TapeImg className="-bottom-4 -left-4 w-24 h-12 rotate-[45deg]" />
            </>
        )}
    </>
  );
}
