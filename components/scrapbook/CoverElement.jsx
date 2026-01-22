'use client';
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, PenTool } from 'lucide-react';

// Font style presets
const FONT_STYLES = [
  { 
    id: 'classic', 
    label: 'Classic', 
    headingFont: 'var(--font-space-grotesk)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '800',
    bodyWeight: '400'
  },
  { 
    id: 'handwritten', 
    label: 'Handwritten', 
    headingFont: 'var(--font-caveat)', 
    bodyFont: 'var(--font-caveat)',
    headingWeight: '700',
    bodyWeight: '400'
  },
  { 
    id: 'retro', 
    label: 'Retro', 
    headingFont: 'var(--font-cormorant)', 
    bodyFont: 'var(--font-cormorant)',
    headingWeight: '700',
    bodyWeight: '400'
  },
];

export default function CoverElement({ content, onUpdate, side, readOnly, onOpenDrawer }) {
  // content: { imageUrl, title, description, fontStyle, overlayColor, overlayOpacity, textColor }
  const [data, setData] = useState(content || { 
    imageUrl: null, 
    title: '', 
    description: '', 
    fontStyle: 'classic',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
    textColor: '#FFFFFF'
  });
  
  const [inputType, setInputType] = useState('file');
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if (content) {
      setData({
        imageUrl: content.imageUrl || null,
        title: content.title || '',
        description: content.description || '',
        fontStyle: content.fontStyle || 'classic',
        overlayColor: content.overlayColor || '#000000',
        overlayOpacity: content.overlayOpacity ?? 0.4,
        textColor: content.textColor || '#FFFFFF'
      });
    }
  }, [content]);

  const updateData = (updates) => {
    const newData = { ...data, ...updates };
    setData(newData);
    onUpdate(newData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) {
        alert("Image is too large (max 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput) {
      updateData({ imageUrl: urlInput });
      setUrlInput('');
    }
  };

  const handleFontChange = (fontStyleId) => {
    updateData({ fontStyle: fontStyleId });
  };

  const handleOverlayChange = (color, opacity) => {
    updateData({ overlayColor: color, overlayOpacity: opacity });
  };

  const handleTextColorChange = (color) => {
    updateData({ textColor: color });
  };

  const openCoverStyleDrawer = () => {
    if (onOpenDrawer) {
      onOpenDrawer('COVER_STYLE', {
        currentFontStyle: data.fontStyle || 'classic',
        currentOverlayColor: data.overlayColor || '#000000',
        currentOverlayOpacity: data.overlayOpacity ?? 0.4,
        currentTextColor: data.textColor || '#FFFFFF'
      }, { 
        onFontChange: handleFontChange, 
        onOverlayChange: handleOverlayChange,
        onTextColorChange: handleTextColorChange
      }, 'Cover Style');
    }
  };

  const currentFontStyle = FONT_STYLES.find(f => f.id === (data.fontStyle || 'classic')) || FONT_STYLES[0];
  const textSizeClass = currentFontStyle.id === 'handwritten' ? 'text-xl' : 'text-lg';

  // If no image uploaded yet, show upload UI
  if (!data.imageUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-100">
        {!readOnly && (
          <div className="w-full max-w-xs">
            <div className="text-center mb-4">
              <h3 className="text-lg font-black uppercase text-gray-600">
                {side === 'left' ? 'Front Cover' : 'Back Cover'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">Upload an image for your cover</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white/50 p-6 relative">
              {/* Toggle Type */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={() => setInputType('file')}
                  className={`text-xs font-bold uppercase px-2 py-1 rounded ${inputType === 'file' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  Upload
                </button>
                <button 
                  onClick={() => setInputType('url')}
                  className={`text-xs font-bold uppercase px-2 py-1 rounded ${inputType === 'url' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  URL
                </button>
              </div>

              {inputType === 'file' ? (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full py-8 hover:bg-gray-50 transition-colors rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm font-bold text-gray-500 uppercase">Upload Cover Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              ) : (
                <form onSubmit={handleUrlSubmit} className="flex flex-col items-center gap-3 pt-8">
                  <div className="bg-black text-white p-2 rounded-full">
                    <Upload className="w-6 h-6" />
                  </div>
                  <input 
                    type="url" 
                    placeholder="Paste image URL..." 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full border-b-2 border-gray-300 focus:border-black outline-none p-2 text-center bg-transparent placeholder-gray-400"
                  />
                  <button type="submit" className="text-xs font-black uppercase bg-[#A3E635] px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_black] hover:-translate-y-0.5 transition-transform">
                    Add Image
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
        
        {readOnly && (
          <div className="text-gray-300 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
          </div>
        )}
      </div>
    );
  }

  // Check if there's any text content
  const hasTextContent = (data.title && data.title.trim()) || (data.description && data.description.trim());

  // Image uploaded - show cover with text overlay
  return (
    <div className="w-full h-full relative overflow-hidden group">
      {/* Background Image */}
      <img 
        src={data.imageUrl} 
        alt="Cover" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark Overlay for text readability - ONLY when there's text */}
      {hasTextContent && (
        <div 
          className="absolute inset-0 transition-opacity"
          style={{ 
            backgroundColor: data.overlayColor || '#000000',
            opacity: data.overlayOpacity ?? 0.4
          }}
        />
      )}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
        {/* Edit Style Button */}
        {!readOnly && (
          <button 
            onClick={openCoverStyleDrawer}
            className="absolute top-4 right-4 bg-white/90 text-black border-2 border-black p-2 rounded-lg hover:bg-[#FFD43B] shadow-[2px_2px_0px_0px_black] z-30 transition-all"
            title="Edit Cover Style"
          >
            <PenTool className="w-4 h-4" />
          </button>
        )}

        {/* Title Input */}
        <input 
          type="text" 
          readOnly={readOnly}
          placeholder={!readOnly ? "TITLE HERE" : ""}
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          className={`w-full text-center bg-transparent border-b-2 border-transparent mb-4 text-3xl md:text-5xl
            ${!readOnly ? 'hover:border-white/30 focus:outline-none focus:border-[#A3E635]' : 'outline-none cursor-default'}
          `}
          style={{ 
            fontFamily: currentFontStyle.headingFont,
            fontWeight: currentFontStyle.headingWeight,
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            color: data.textColor || '#FFFFFF'
          }}
        />
        
        {/* Description Input */}
        {readOnly ? (
          <div 
            className={`w-full ${textSizeClass} whitespace-pre-wrap`}
            style={{ 
              fontFamily: currentFontStyle.bodyFont,
              fontWeight: currentFontStyle.bodyWeight,
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              color: data.textColor || '#FFFFFF',
              opacity: 0.9
            }}
          >
            {data.description}
          </div>
        ) : (
          <textarea
            placeholder="Description / Date..."
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className={`w-full bg-transparent resize-none leading-relaxed border-2 border-transparent p-0 rounded-md ${textSizeClass} h-24
              hover:border-dashed hover:border-white/20 focus:outline-none focus:border-[#A3E635]
            `}
            style={{ 
              fontFamily: currentFontStyle.bodyFont,
              fontWeight: currentFontStyle.bodyWeight,
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              color: data.textColor || '#FFFFFF',
              opacity: 0.9
            }}
          />
        )}
      </div>

      {/* Change Image Button */}
      {!readOnly && (
        <label className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg border-2 border-white hover:scale-110">
          <Upload className="w-4 h-4" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
}
