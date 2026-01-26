import React from 'react';

// Helper to get image path from id
const getFrameImage = (id) => {
    // console.log('Getting frame image for:', id);
    if (!id) return null;
    
    switch(id) {
        case 'polaroid-blue-hearts': return '/polaroid/polaroid-blue-hearts.webp';
        case 'polaroid-doodles': return '/polaroid/polaroid-doodles.webp';
        case 'polaroid-indigo-hearts': return '/polaroid/polaroid-indigo-hearts.webp';
        case 'polaroid-oranges': return '/polaroid/polaroid-oranges.webp';
        case 'polaroid-pink-hearts': return '/polaroid/polaroid-pink-hearts.webp';
        default: return null;
    }
};

export default function PolaroidFrame({ variant, position = 'default' }) {
    const imageSrc = getFrameImage(variant);
    
    // console.log('PolaroidFrame Render:', { variant, imageSrc });

    if (!imageSrc) return null;

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <img 
                src={imageSrc} 
                alt="polaroid frame" 
                className=" h-full object-cover drop-shadow-2xl" 
                onError={(e) => console.error('Polaroid frame image failed to load:', imageSrc)}
            />
        </div>
    );
}
