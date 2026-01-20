'use client';
import React, { useState } from 'react';
import { Image as ImageIcon, Upload, PenTool, X, Check } from 'lucide-react';
import StyleEditorDrawer from './StyleEditorDrawer';

// Redefine Styles as Categories
const STYLE_CATEGORIES = [
    {
        id: 'basic',
        label: 'Basic',
        options: [
            { id: 'original', label: 'Original', class: 'border-none shadow-none', containerClass: '' },
            { id: 'rounded', label: 'Rounded Corners', class: 'rounded-2xl shadow-sm', containerClass: '' },
            { id: 'shadow', label: 'Drop Shadow', class: 'shadow-xl rounded-sm', containerClass: '' },
        ]
    },
    {
        id: 'polaroid',
        label: 'Polaroid',
        options: [
            { id: 'polaroid', label: 'Classic White', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-tilted', label: 'Tilted Left', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl rotate-[-3deg] w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-right', label: 'Tilted Right', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl rotate-[3deg] w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-love', label: 'Love Letter', class: 'w-full h-full object-cover', containerClass: "bg-[#FFF0F5] p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236%22%20height%3D%2236%22%20viewBox%3D%220%200%2036%2036%22%3E%3Cpath%20transform%3D%22translate(8%2C8)%22%20fill%3D%22%23ec4899%22%20fill-opacity%3D%220.4%22%20d%3D%22M10%203.22l-.61-.6a5.5%205.5%200%200%200-7.78%207.77L10%2018.78l8.39-8.4a5.5%205.5%200%200%200-7.78-7.77l-.61.61z%22%2F%3E%3C%2Fsvg%3E')] bg-repeat" },
            { id: 'polaroid-sunny', label: 'Sunny Day', class: 'w-full h-full object-cover', containerClass: 'bg-[#FEFCE8] p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center relative after:content-["☀️"] after:absolute after:bottom-4 after:text-2xl' },
            { id: 'polaroid-purple-flora', label: 'Purple Flora', class: 'w-full h-full object-cover', containerClass: "bg-[#E9D5FF] p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center relative after:content-['💐'] after:absolute after:bottom-2 after:right-2 after:text-6xl after:rotate-[-10deg] after:drop-shadow-sm bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%222%22%20fill%3D%22white%22%20fill-opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E')] bg-repeat" },
            { id: 'polaroid-pink-garden', label: 'Pink Garden', class: 'w-full h-full object-cover', containerClass: "bg-[#FBCFE8] p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center relative after:content-['🌷'] after:absolute after:bottom-2 after:right-2 after:text-6xl after:rotate-[10deg] after:drop-shadow-sm bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M40%200H0V40%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-opacity%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat" },
            { id: 'polaroid-snowman', label: 'Snowman', class: 'w-full h-full object-cover', containerClass: "bg-[#E0F2FE] p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center relative after:content-[''] after:absolute after:bottom-2 after:right-[-20px] after:w-24 after:h-24 after:rotate-[5deg] after:bg-[url('/svg/snowman1.svg')] after:bg-contain after:bg-no-repeat after:rotate-[5deg] after:drop-shadow-sm bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%224%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%3C%2Fsvg%3E')] bg-repeat" },
        ]
    },
    {
        id: 'sticker',
        label: 'Sticker',
        options: [
            { id: 'sticker', label: 'White Border', class: 'rounded-xl', containerClass: 'p-2 bg-white ring-4 ring-white shadow-lg w-[90%] h-auto' },
            { id: 'sticker-c', label: 'Circle', class: 'rounded-full aspect-square object-cover', containerClass: 'p-2 bg-white ring-4 ring-white shadow-lg w-[80%] h-auto rounded-full' },
        ]
    },
    {
        id: 'tape',
        label: 'Washi Tape',
        options: [
            { id: 'tape', label: 'Tape Top', class: '', containerClass: 'relative after:content-[""] after:absolute after:-top-3 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-8 after:bg-[#FF6B6B]/80 after:rotate-[-2deg] after:shadow-sm w-[90%] h-auto shadow-md bg-white p-2' },
            { id: 'tape-corners', label: 'Tape Corners', class: '', containerClass: 'relative after:content-[""] after:absolute after:-top-2 after:-right-2 after:w-16 after:h-6 after:bg-[#A3E635]/80 after:rotate-[45deg] after:shadow-sm before:content-[""] before:absolute before:-bottom-2 before:-left-2 before:w-16 before:h-6 before:bg-[#A3E635]/80 before:rotate-[45deg] before:shadow-sm w-[90%] h-auto shadow-md bg-white p-2' },
        ]
    },
    {
        id: 'brutal',
        label: 'Brutal',
        options: [
             { id: 'brutal', label: 'Neo Brutal', class: 'border-4 border-black', containerClass: 'bg-[#A3E635] p-2 shadow-[8px_8px_0px_0px_black] w-[90%] h-auto' },
             { id: 'brutal-bw', label: 'Mono Brutal', class: 'border-4 border-black grayscale', containerClass: 'bg-white p-2 shadow-[8px_8px_0px_0px_black] w-[90%] h-auto' },
        ]
    }
];

export default function ImageElement({ content, onUpdate, isCover, readOnly, onOpenDrawer }) {
  // Helpers to find flatten style config
  const getStyleConfig = (styleId) => {
      for (const cat of STYLE_CATEGORIES) {
          const found = cat.options.find(opt => opt.id === styleId);
          if (found) return found;
      }
      return STYLE_CATEGORIES[0].options[0]; // Default to original
  };
  // Parse content which might be string (legacy) or object {url, style}
  const initialUrl = typeof content === 'string' ? content : content?.url;
  const initialStyleId = typeof content === 'object' ? content?.style : 'original';

  const [preview, setPreview] = useState(initialUrl || null);
  const [currentStyle, setCurrentStyle] = useState(initialStyleId || 'original');
  const [inputType, setInputType] = useState('file'); // 'file' or 'url'
  const [urlInput, setUrlInput] = useState('');

  const handleUrlSubmit = (e) => {
      e.preventDefault();
      if(urlInput) {
          setPreview(urlInput);
          updateParent(urlInput, currentStyle);
      }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) { // Optional: 2MB limit check
          alert("Image is too large (max 2MB)");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
         const base64 = reader.result;
         setPreview(base64);
         updateParent(base64, currentStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateParent = (url, style) => {
    // If it's a cover, we enforce original style effectively, or just don't use the style object if we don't want to.
    // But keeping it consistent is fine.
    onUpdate({ url, style });
  };

  const handleStyleSelect = (styleId) => {
      setCurrentStyle(styleId);
      updateParent(preview, styleId);
      // Don't close immediately so they can try others? Or close? Let's keep open.
  };

  const activeStyleConfig = getStyleConfig(currentStyle);

  if (preview) {
    return (
      <div className={`w-full h-full flex items-center justify-center group relative ${isCover ? 'p-0' : 'p-4'}`}>
        
        {/* Render Image with Style Container */}
        <div className={`transition-all duration-300 relative ${isCover ? 'w-full h-full' : activeStyleConfig.containerClass}`}>
             <img 
                src={preview} 
                alt="Scrapbook item" 
                className={`max-w-full max-h-full transition-all duration-300 ${isCover ? 'w-full h-full object-cover' : activeStyleConfig.class}`}
            />
        </div>

        {/* CONTROLS (Only if not cover) */}
        {!isCover && !readOnly && (
            <>
                {/* Edit Style Button (Pen) */}
                <button 
                    onClick={() => onOpenDrawer('STYLE', { categories: STYLE_CATEGORIES, currentStyle }, handleStyleSelect, 'Image Style')}
                    className={`absolute top-4 right-4 bg-white text-black border-2 border-black p-2 rounded-lg hover:bg-[#FFD43B] shadow-[2px_2px_0px_0px_black] z-30 transition-all`}
                    title="Edit Style"
                >
                    <PenTool className="w-4 h-4" />
                </button>

                {/* Change Image Button */}
                <label className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg border-2 border-white hover:scale-110">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            </>
        )}



      </div>
    );
  }



  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
        {!readOnly && (
            <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-white/50 flex flex-col items-center justify-center p-4 relative">
                
                {/* Toggle Type */}
                <div className="absolute top-2 right-2 flex gap-2">
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
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 transition-colors">
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-sm font-bold text-gray-500 uppercase">Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                ) : (
                    <form onSubmit={handleUrlSubmit} className="flex flex-col items-center gap-2 w-full px-4">
                         <div className="bg-black text-white p-2 rounded-full mb-1">
                            <Upload className="w-6 h-6" />
                        </div>
                        <input 
                            type="url" 
                            placeholder="Paste image URL..." 
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="w-full border-b-2 border-gray-300 focus:border-black outline-none p-1 text-center bg-transparent placeholder-gray-400"
                        />
                         <button type="submit" className="mt-2 text-xs font-black uppercase bg-[#A3E635] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_black] hover:-translate-y-0.5 transition-transform">
                            Add Image
                        </button>
                    </form>
                )}
            </div>
        )}
    </div>
  );
}
