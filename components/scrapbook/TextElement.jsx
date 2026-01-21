'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PenTool } from 'lucide-react';

// Font style presets - each uses the SAME font for heading and body (cleaner look)
const FONT_STYLES = [
  { 
    id: 'classic', 
    label: 'Classic', 
    emoji: '📖',
    headingFont: 'var(--font-space-grotesk)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '800',
    bodyWeight: '400'
  },
  { 
    id: 'handwritten', 
    label: 'Handwritten', 
    emoji: '✏️',
    headingFont: 'var(--font-caveat)', 
    bodyFont: 'var(--font-caveat)',
    headingWeight: '700',
    bodyWeight: '400'
  },
  { 
    id: 'retro', 
    label: 'Retro', 
    emoji: '🎞️',
    headingFont: 'var(--font-cormorant)', 
    bodyFont: 'var(--font-cormorant)',
    headingWeight: '700',
    bodyWeight: '400'
  },
];

// Export for use in drawer
export { FONT_STYLES };

export default function TextElement({ content, onUpdate, isCover, readOnly, onOpenDrawer }) {
  const [data, setData] = useState(content || { heading: '', body: '', bgColor: '#000000', fontStyle: 'classic', textColor: null });

  // Use refs to track latest data/prop to avoid stale closures in callbacks passed to Drawer
  const dataRef = useRef(data);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // Sync with external content changes
  useEffect(() => {
    if (content) {
      const newData = { 
        ...content, 
        bgColor: content.bgColor || '#000000',
        fontStyle: content.fontStyle || 'classic',
        textColor: content.textColor || (isCover ? null : '#000000') // Default to black for inner pages, null for covers (auto)
      };
      setData(newData);
      dataRef.current = newData;
    }
  }, [content, isCover]);

  // Also sync ref when state changes locally
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleChange = (field, value) => {
    // Use ref to get the absolute latest data, ignoring closure staleness
    const currentData = dataRef.current;
    const newData = { ...currentData, [field]: value };
    
    setData(newData);
    dataRef.current = newData;
    
    if (onUpdateRef.current) {
        onUpdateRef.current(newData);
    }
  };

  const handleColorChange = (color) => {
    handleChange('bgColor', color);
  };

  const handleTextColorChange = (color) => {
    handleChange('textColor', color);
  };

  const handleFontChange = (fontStyleId) => {
    handleChange('fontStyle', fontStyleId);
  };

  // Get contrasting text color based on background
  const getTextColor = (bgColor) => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Handle opening the text style drawer
  const openTextStyleDrawer = () => {
    if (onOpenDrawer) {
      onOpenDrawer('TEXT_STYLE', {
        currentFontStyle: data.fontStyle || 'classic',
        currentBgColor: data.bgColor || '#000000',
        currentTextColor: data.textColor || (isCover ? getTextColor(data.bgColor || '#000000') : '#000000'),
        isCover: isCover
      }, { onFontChange: handleFontChange, onColorChange: handleColorChange, onTextColorChange: handleTextColorChange }, 'Text Style');
    }
  };

  const coverBgColor = data.bgColor || '#000000';
  // Use explicit textColor if set, otherwise calculate contrast for covers, otherwise black
  const computedTextColor = data.textColor || (isCover ? getTextColor(coverBgColor) : '#000000');
  
  // Get current font style
  const currentFontStyle = FONT_STYLES.find(f => f.id === (data.fontStyle || 'classic')) || FONT_STYLES[0];

  return (
    <div 
      className={`w-full h-full flex flex-col justify-center items-center text-center relative ${isCover ? 'p-12' : 'p-8'}`}
      style={isCover ? { backgroundColor: coverBgColor, color: computedTextColor } : { color: computedTextColor }}
    >
        {/* Edit Style Button - Opens Sidebar Drawer */}
        {!readOnly && (
          <button 
            onClick={openTextStyleDrawer}
            className={`absolute top-4 right-4 bg-white text-black border-2 border-black p-2 rounded-lg hover:bg-[#FFD43B] shadow-[2px_2px_0px_0px_black] z-30 transition-all ${
              isCover ? 'bg-white/90 hover:bg-[#FFD43B]' : ''
            }`}
            title="Edit Text Style"
          >
            <PenTool className="w-4 h-4" />
          </button>
        )}

        {(!readOnly || data.heading) && (
          <textarea 
              readOnly={readOnly}
              placeholder={!readOnly ? (isCover ? "TITLE HERE" : "HEADLINE GOES HERE") : ""}
              value={data.heading}
              onChange={(e) => handleChange('heading', e.target.value)}
              className={`w-full text-center bg-transparent border-b-2 border-transparent mb-4 placeholder-current/50 resize-none overflow-hidden
                  ${isCover ? 'text-3xl md:text-4xl' : 'text-3xl placeholder-gray-300'}
                  ${!readOnly ? 'hover:border-current/30 focus:outline-none focus:border-[#A3E635]' : 'outline-none cursor-default'}
              `}
              rows={1}
              onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
              }}
              style={{ 
                color: computedTextColor,
                fontFamily: currentFontStyle.headingFont,
                fontWeight: currentFontStyle.headingWeight
              }}
          />
        )}
        
        {readOnly ? (
             <div 
               className={`w-full whitespace-pre-wrap leading-relaxed p-4
                  ${isCover ? 'text-lg opacity-80' : 'text-lg text-gray-700'}
               `}
               style={{ 
                 fontFamily: currentFontStyle.bodyFont,
                 fontWeight: currentFontStyle.bodyWeight
               }}
             >
                {data.body}
             </div>
        ) : (
            <textarea
                placeholder={isCover ? "Description / Date..." : "Write your story here..."}
                value={data.body}
                onChange={(e) => handleChange('body', e.target.value)}
                className={`w-full bg-transparent resize-none leading-relaxed border-2 border-transparent p-4 rounded-md
                    ${isCover ? 'text-lg opacity-80 h-48 placeholder-current/40' : 'flex-1 text-lg text-gray-700 placeholder-gray-300'}
                    hover:border-dashed hover:border-current/20 focus:outline-none focus:border-[#A3E635]
                `}
                style={{ 
                  color: computedTextColor,
                  fontFamily: currentFontStyle.bodyFont,
                  fontWeight: currentFontStyle.bodyWeight
                }}
            />
        )}
    </div>
  );
}
