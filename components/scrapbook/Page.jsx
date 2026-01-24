'use client';
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ComponentSelector from './ComponentSelector';
import ImageElement from './ImageElement';
import TextElement from './TextElement';
import CoverElement from './CoverElement';
import GiftElement from './GiftElement';

export default function Page({ data, onUpdate, side, isCover, readOnly, bgPattern, bgColor, pageBorder, onOpenDrawer }) {
  // data: { id, type, content }
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectType = (type) => {
    onUpdate(type, null); // Set type, init content as null
    setShowSelector(false);
  };

  const handleContentUpdate = (newContent) => {
    onUpdate(data.type, newContent);
  };

  // Background Styles configuration
  const getBgStyle = () => {
      if (isCover) return {}; // Covers handle their own bg or use default
      switch (bgPattern) {
          case 'dots': return { backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'lines': return { backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #ccc 29px, #ccc 30px)', backgroundSize: '100% 100%' };
          case 'graphy': return { backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'graphy': return { backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'rabbit': return { backgroundImage: 'url("/svg/rabbit1.svg")', backgroundSize: '120px 120px' };
          case 'giraffe': return { backgroundImage: 'url("/svg/giraffe1.svg")', backgroundSize: '120px 120px' };
          case 'plain': return {};
          default: return { backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 30px' };
      }
  };

  const getBorderClass = (border) => {
      switch(border) {
          case 'solid': return 'border-2 border-black';
          case 'dashed': return 'border-2 border-dashed border-black';
          case 'cute-flower': return 'border-[8px] border-pink-300 border-dashed';
          default: return '';
      }
  };



  return (
    <div 
        className={`w-full h-full relative overflow-hidden group ${isCover ? 'bg-gray-100' : ''}`}
        style={{ backgroundColor: isCover ? undefined : (bgColor || '#FFFDF5') }}
    >
        {/* Background Texture */}
        {!isCover && bgPattern !== 'plain' && (
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={getBgStyle()}></div>
        )}

        {/* Page Border Overlay */}
        {!isCover && pageBorder && pageBorder !== 'none' && (
            <div 
                className={`absolute inset-1.5 md:inset-2 pointer-events-none z-20 ${getBorderClass(pageBorder)}`} 
             ></div>
        )}

        {/* EMPTY STATE */}
        {data.type === 'empty' && (
            <div className="w-full h-full flex items-center justify-center">
                {!readOnly && (
                    <button 
                        onClick={() => onOpenDrawer('COMPONENT', {}, handleSelectType, 'Add Content')}
                        className={`w-16 h-16 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-300 hover:border-black hover:text-black hover:scale-110 transition-all ${isCover ? 'w-24 h-24 border-black text-black opacity-50' : ''}`}
                    >
                        <Plus className={`${isCover ? 'w-12 h-12' : 'w-8 h-8'}`} />
                    </button>
                )}
                {isCover && !readOnly && (
                    <div className="absolute bottom-10 text-gray-400 font-bold uppercase tracking-widest text-sm pointer-events-none">
                        {side === 'left' ? 'Front Cover' : 'Back Cover'}
                    </div>
                )}
            </div>
        )}

        {/* FILLED STATE */}
        <div className="relative z-10 w-full h-full">
            {/* Image type */}
            {data.type === 'image' && (
                <ImageElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Text type (with background color for covers) */}
            {data.type === 'text' && (
                <TextElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Cover type (image + text overlay) - new option */}
            {data.type === 'cover' && (
                <CoverElement content={data.content} onUpdate={handleContentUpdate} side={side} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Gift type (hidden surprise) */}
            {data.type === 'gift' && (
                <GiftElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}
        </div>

        {/* DELETE CONTENT BUTTON */}
        {!readOnly && data.type !== 'empty' && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if(confirm('Are you sure you want to remove this content?')) {
                        onUpdate('empty', null);
                    }
                }}
                className="absolute top-4 left-4 p-2 bg-white text-red-500 border-2 border-transparent hover:border-red-500 rounded-lg shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-50 hover:bg-red-50"
                title="Remove Content"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        )}
    </div>
  );
}

