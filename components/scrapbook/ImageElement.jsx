'use client';
import React, { useState } from 'react';
import { Image as ImageIcon, Upload, PenTool, X, Check, Play, SkipBack, SkipForward, Heart, Music, ArrowLeft, ArrowRight, Search, Sparkles, Palette, Type } from 'lucide-react';
import StyleEditorDrawer from './StyleEditorDrawer';

// Redefine Styles as Categories - Super Cute Edition
const STYLE_CATEGORIES = [
    {
        id: 'basic',
        label: 'Basic',
        options: [
            { id: 'original', label: 'Original', class: 'border-none shadow-none', containerClass: 'w-full h-full flex items-center justify-center' },
            { id: 'rounded', label: 'Rounded Corners', class: 'rounded-2xl shadow-sm', containerClass: 'w-full h-full flex items-center justify-center' },
            { id: 'shadow', label: 'Drop Shadow', class: 'shadow-xl rounded-sm', containerClass: 'w-full h-full flex items-center justify-center' },
        ]
    },
    {
        id: 'polaroid',
        label: 'Polaroid',
        options: [
            { id: 'polaroid', label: 'Classic White', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-tilted', label: 'Tilted Left', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl rotate-[-3deg] w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-right', label: 'Tilted Right', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl rotate-[3deg] w-[80%] h-[80%] flex items-center justify-center' },
            { id: 'polaroid-hanging', label: 'Hanging Wire', class: 'w-full h-full object-cover', containerClass: 'bg-white p-3 pb-12 shadow-xl w-full h-full flex items-center justify-center rotate-[-2deg]', patternType: 'hanging' },
            { 
                id: 'polaroid-doodle', 
                label: 'Doodle Stripe', 
                class: 'w-[90%] h-[100%] object-cover bg-white border-2 border-slate-700/50 rounded-sm rotate-1', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-4 pb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] rotate-2',
                patternType: 'doodle-stripe' 
            },
            { 
                id: 'polaroid-doodle-pink', 
                label: 'Doodle Pink', 
                class: 'w-[90%] h-[100%] object-cover bg-white border-2 border-slate-700/50 rounded-sm rotate-[-1deg]', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-4 pb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] rotate-[-2deg]',
                patternType: 'doodle-pink' 
            },
            { 
                id: 'polaroid-kawaii-bow', 
                label: 'Kawaii Bow', 
                class: 'w-[95%] h-[100%] object-cover rounded-2xl border-4 border-white shadow-sm', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-5 pb-16 shadow-xl bg-[#F3E8FF] rounded-3xl rotate-[-2deg]',
                patternType: 'kawaii-bow' 
            },
            { 
                id: 'polaroid-floral-yellow', 
                label: 'Floral Yellow', 
                class: 'w-[85%] h-[100%] object-cover border-2 border-amber-800/20 bg-white rotate-1', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-5 pb-16 shadow-lg rotate-1',
                patternType: 'floral-yellow' 
            },
            { 
                id: 'polaroid-floral-pink', 
                label: 'Floral Pink', 
                class: 'w-[85%] h-[100%] object-cover border-2 border-rose-800/20 bg-white rotate-[-1deg]', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-5 pb-16 shadow-lg rotate-[-1deg]',
                patternType: 'floral-pink' 
            },
            { 
                id: 'polaroid-minimal-heart', 
                label: 'Love Lavender', 
                class: 'w-[85%] h-[100%] object-cover border-4 border-white bg-white', 
                containerClass: 'relative w-full h-full flex items-center justify-center p-4 pb-16 shadow-xl bg-[#E9D5FF] rotate-[2deg]',
                patternType: 'minimal-heart' 
            },

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

            { 
                id: 'tape', 
                label: 'Coral Tape', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[90%] h-auto shadow-md bg-white p-2',
                tapeType: 'coral'
            },
            { 
                id: 'tape-corners', 
                label: 'Lime Corners', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[90%] h-auto shadow-md bg-white p-2',
                tapeType: 'lime-corners'
            },
            { 
                id: 'tape-sakura', 
                label: 'Sakura Pink', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[90%] h-auto shadow-md bg-white p-2',
                tapeType: 'sakura'
            },
            { 
                id: 'tape-matcha', 
                label: 'Matcha Green', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[90%] h-auto shadow-md bg-white p-2',
                tapeType: 'matcha'
            },
            { 
                id: 'tape-pastel', 
                label: 'Pastel Dream', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[90%] h-auto shadow-md bg-white p-2',
                tapeType: 'pastel'
            },
            { 
                id: 'tape-strawberry-4', 
                label: 'Strawberry 4 Corners', 
                class: 'rounded-sm relative z-0', 
                containerClass: 'relative w-[85%] h-auto shadow-lg bg-white p-4',
                hasFourCorners: true
            },
        ]

    },
    {
        id: 'music',
        label: 'Music Player',
        options: [
             { 
                 id: 'player-blue', 
                 label: 'Retro Blue', 
                 class: 'w-full h-full object-cover rounded-lg border-2 border-white/50 bg-sky-200 flex-1 min-h-0', 
                 containerClass: 'bg-[#60A5FA] p-4 pb-4 shadow-xl w-[90%] h-[90%] rounded-xl flex flex-col gap-3',
                 patternType: 'player-blue' 
             },
             { 
                 id: 'player-peach', 
                 label: 'Peach Jam', 
                 class: 'w-full h-full object-cover rounded-lg border-2 border-[#7F1D1D]/10 bg-orange-100 flex-1 min-h-0', 
                 containerClass: 'bg-[#FECACA] p-4 pb-4 shadow-xl w-[90%] h-[90%] rounded-xl flex flex-col gap-3 border-2 border-[#FCA5A5]',
                 patternType: 'player-peach' 
             },
        ]
    },
    {
        id: 'browser',
        label: 'Cute Browser',
        options: [
             { 
                 id: 'browser-pink', 
                 label: 'Pinky Web', 
                 class: 'w-full h-full object-cover border-2 border-pink-200 bg-white', 
                 containerClass: 'bg-pink-50 p-1 pb-1 shadow-xl w-[85%] h-auto rounded-xl flex flex-col gap-1 border-2 border-pink-200',
                 patternType: 'browser-pink' 
             },
             { 
                 id: 'browser-paint', 
                 label: 'Dreamy Paint', 
                 class: 'w-full h-full object-cover border-2 border-purple-200 bg-white rounded-sm', 
                 containerClass: 'bg-purple-50 p-2 pb-8 shadow-xl w-[85%] h-[85%] rounded-lg flex flex-col relative border-2 border-purple-200',
                 patternType: 'browser-paint' 
             },
        ]
    },
    {
        id: 'brutal',
        label: 'Brutal',
        options: [
             { id: 'brutal', label: 'Neo Brutal', class: 'border-4 border-black', containerClass: 'bg-[#A3E635] p-2 shadow-[8px_8px_0px_0px_black] w-[90%] h-auto' },
             { id: 'brutal-bw', label: 'Mono Brutal', class: 'border-4 border-black grayscale', containerClass: 'bg-white p-2 shadow-[8px_8px_0px_0px_black] w-[90%] h-auto' },
             { 
                 id: 'brutal-glitch', 
                 label: 'Tech Glitch', 
                 class: 'w-full h-full object-cover grayscale contrast-125 border-4 border-black', 
                 containerClass: 'relative bg-[#00FFFF] p-2 shadow-[8px_8px_0px_0px_#FF00FF] w-[90%] h-auto border-4 border-black',
                 patternType: 'glitch' 
             },
             { 
                 id: 'brutal-caution', 
                 label: 'Caution Tape', 
                 class: 'w-full h-full object-cover border-4 border-black grayscale sepia-[.5]', 
                 containerClass: 'relative bg-[#FBBF24] p-6 shadow-[8px_8px_0px_0px_black] w-[90%] h-auto border-4 border-black',
                 patternType: 'caution' 
             },
        ]
    }
];

// ... (previous imports)

export default function ImageElement({ content, onUpdate, isCover, readOnly, onOpenDrawer }) {
  // Helpers to find flatten style config
  const getStyleConfig = (styleId) => {
      for (const cat of STYLE_CATEGORIES) {
          const found = cat.options.find(opt => opt.id === styleId);
          if (found) return found;
      }
      return STYLE_CATEGORIES[0].options[0]; // Default to original
  };
  // Parse content
  const initialUrl = typeof content === 'string' ? content : content?.url;
  const initialStyleId = typeof content === 'object' ? content?.style : 'original';
  const initialText = (typeof content === 'object' && content?.text) ? content.text : { title: '', subtitle: '' };

  const [preview, setPreview] = useState(initialUrl || null);
  const [currentStyle, setCurrentStyle] = useState(initialStyleId || 'original');
  const [textData, setTextData] = useState(initialText);
  const [isEditingText, setIsEditingText] = useState(false);
  
  const [inputType, setInputType] = useState('file'); // 'file' or 'url'
  const [urlInput, setUrlInput] = useState('');

  const handleUrlSubmit = (e) => {
      e.preventDefault();
      if(urlInput) {
          setPreview(urlInput);
          updateParent(urlInput, currentStyle, textData);
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
         updateParent(base64, currentStyle, textData);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateParent = (url, style, text) => {
    onUpdate({ url, style, text });
  };

  const handleStyleSelect = (styleId) => {
      setCurrentStyle(styleId);
      updateParent(preview, styleId, textData);
  };

  const handleTextUpdate = (field, value) => {
      const newText = { ...textData, [field]: value };
      setTextData(newText);
      updateParent(preview, currentStyle, newText);
  };

  const activeStyleConfig = getStyleConfig(currentStyle);
  const hasText = textData.title || textData.subtitle;

  if (preview) {
    return (
      <div className={`w-full h-full flex items-center justify-center group relative ${isCover ? 'p-0' : 'p-10'}`}>
        
        {/* Render Image with Style Container */}
        <div 
          className={`transition-all duration-300 relative ${isCover ? 'w-full h-full' : activeStyleConfig.containerClass}`}
        >



             

             {/* ----------------- HANGING STYLE RENDER ----------------- */}
             {activeStyleConfig.patternType === 'hanging' && (
                <>
                  {/* Wire - slightly curved or straight across */}
                  <div className="absolute -top-6 left-[-100%] right-[-100%] h-0.5 bg-gray-600/60 rotate-1 pointer-events-none" />
                  
                  {/* Left Clip */}
                  <div className="absolute -top-4 left-[20%] w-6 h-10 z-20 flex flex-col items-center group-hover:-translate-y-1 transition-transform origin-top">
                     {/* Metal part */}
                     <div className="w-1 h-4 bg-gray-400 rounded-full absolute -top-2" />
                     {/* Wooden Peg Body */}
                     <div className="w-full h-full bg-[#E5B686] rounded-sm border-l-2 border-r-2 border-[#D4A373] flex flex-col shadow-md relative">
                        <div className="w-full h-1/2 border-b border-[#D4A373]/50" />
                     </div>
                  </div>

                  {/* Right Clip */}
                  <div className="absolute -top-4 right-[20%] w-6 h-10 z-20 flex flex-col items-center group-hover:-translate-y-1 transition-transform origin-top">
                     <div className="w-1 h-4 bg-gray-400 rounded-full absolute -top-2" />
                     <div className="w-full h-full bg-[#E5B686] rounded-sm border-l-2 border-r-2 border-[#D4A373] flex flex-col shadow-md relative">
                        <div className="w-full h-1/2 border-b border-[#D4A373]/50" />
                     </div>
                  </div>
                </>
             )}

             {/* ----------------- DOODLE STRIPE RENDER ----------------- */}
             {activeStyleConfig.patternType === 'doodle-stripe' && (
                <>
                   {/* Background Stripes */}
                   <div 
                        className="absolute inset-0 rounded-lg border-2 border-slate-800 z-0 bg-blue-200"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)'
                        }}
                   />
                   
                   {/* Sketchy Outline Effect (Second Border) */}
                   <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 rounded-lg border border-slate-800/60 z-0 pointer-events-none rotate-[-0.5deg]" />

                   {/* Clip */}
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-10 z-20 flex flex-col items-center">
                        <div className="w-full h-full bg-[#FCD34D] rounded-t-md rounded-b-sm border-2 border-slate-800 shadow-sm relative">
                             <div className="absolute top-1 left-1 right-1 h-1 bg-white/40 rounded-full" />
                        </div>
                   </div>

                   {/* Heart Decoration */}
                   <div className="absolute bottom-3 left-3 z-20 transform -rotate-12">
                        <Heart className="w-6 h-6 fill-red-400 text-slate-800 stroke-[2]" />
                   </div>
                </>
             )}

             {/* ----------------- DOODLE PINK RENDER ----------------- */}
             {activeStyleConfig.patternType === 'doodle-pink' && (
                <>
                   {/* Background Stripes (Horizontal) */}
                   <div 
                        className="absolute inset-0 rounded-lg border-2 border-slate-800 z-0 bg-pink-200"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)'
                        }}
                   />
                   
                   {/* Sketchy Outline Effect */}
                   <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 rounded-lg border border-slate-800/60 z-0 pointer-events-none rotate-[0.5deg]" />

                   {/* Clip */}
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-10 z-20 flex flex-col items-center">
                        <div className="w-full h-full bg-[#FCD34D] rounded-t-lg rounded-b-md border-2 border-slate-800 shadow-sm relative">
                             <div className="absolute top-1 left-1 right-1 h-1 bg-white/40 rounded-full" />
                        </div>
                   </div>

                   {/* Heart Decoration (Purple on Pink) */}
                   <div className="absolute bottom-3 right-3 z-20 transform rotate-12">
                        <Heart className="w-6 h-6 fill-purple-400 text-slate-800 stroke-[2]" />
                   </div>
                </>
             )}

             {/* ----------------- KAWAII BOW RENDER ----------------- */}
             {activeStyleConfig.patternType === 'kawaii-bow' && (
                <>
                   {/* Polka Background Pattern */}
                   <div 
                        className="absolute inset-0 rounded-3xl z-0 opacity-60"
                        style={{
                            backgroundImage: 'radial-gradient(#D8B4FE 2px, transparent 2px)',
                            backgroundSize: '16px 16px'
                        }}
                   />
                   
                   {/* Decorative Dashed Border */}
                   <div className="absolute inset-2 border-2 border-dashed border-purple-300 rounded-2xl z-0 pointer-events-none" />

                   {/* Big Bow at Top */}
                   <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl z-20 filter drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
                        🎀
                   </div>

                   {/* Sparkles */}
                   <div className="absolute top-3 left-3 text-purple-400 animate-pulse">
                        <Sparkles className="w-5 h-5 fill-purple-200" />
                   </div>
                   <div className="absolute bottom-16 right-3 text-purple-400">
                        <Sparkles className="w-4 h-4 fill-white" />
                   </div>
                   
                   {/* Cute Label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full border border-purple-200 shadow-sm">
                        <span className="text-[10px] text-purple-500 font-black tracking-widest uppercase">Cutie Keep</span>
                    </div>
                </>
             )}

             {/* ----------------- FLORAL HANGING STYLES ----------------- */}
             {['floral-yellow', 'floral-pink'].includes(activeStyleConfig.patternType) && (
                <>
                    {/* Wire */}
                    <div className="absolute -top-12 left-[-100%] right-[-100%] h-0.5 bg-gray-700/80 rotate-[-1deg] pointer-events-none" />

                     {/* Clip */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-12 z-20 flex flex-col items-center group-hover:-translate-y-1 transition-transform origin-top">
                        <div className={`w-full h-full rounded-sm border-2 border-black/20 shadow-md relative ${activeStyleConfig.patternType === 'floral-yellow' ? 'bg-[#92400E]' : 'bg-[#D97706]'}`}>
                             <div className="w-full h-1/2 border-b border-black/10" />
                        </div>
                   </div>

                   {/* Background Patterns */}
                   {activeStyleConfig.patternType === 'floral-yellow' && (
                       <div 
                         className="absolute inset-0 z-0 bg-[#FEF3C7] border border-amber-900/50 rounded-sm"
                         style={{
                             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(217, 119, 6, 0.1) 10px, rgba(217, 119, 6, 0.1) 20px)'
                         }} 
                       />
                   )}
                   {activeStyleConfig.patternType === 'floral-pink' && (
                       <div 
                         className="absolute inset-0 z-0 bg-[#FCE7F3] border border-rose-900/50 rounded-sm"
                         style={{
                             backgroundImage: 'linear-gradient(rgba(225, 29, 72, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 29, 72, 0.1) 1px, transparent 1px)',
                             backgroundSize: '20px 20px'
                         }} 
                       />
                   )}

                   {/* Floral Overlay */}
                   <div className="absolute bottom-[20px] right-[-5px] z-30 w-24 h-24 pointer-events-none">
                       {activeStyleConfig.patternType === 'floral-yellow' ? (
                           <img src="/svg/plaroid-flower1.svg" alt="flower decoration" className="w-full h-full object-contain drop-shadow-md" />
                       ) : (
                           <img src="/svg/plaroid-plant1.svg" alt="plant decoration" className="w-full h-full object-contain drop-shadow-md" />
                       )}
                   </div>
                   
                   {/* Tape holding the flower */}
                    <div className="absolute bottom-6 right-8 w-12 h-4 bg-white/60 rotate-[-45deg] z-40 shadow-sm backdrop-blur-sm" />

                </>
             )}

             {/* ----------------- MINIMAL HEART HANGING ----------------- */}
             {activeStyleConfig.patternType === 'minimal-heart' && (
                <>
                    {/* Wire */}
                    <div className="absolute -top-12 left-[-100%] right-[-100%] h-0.5 bg-gray-700/80 rotate-1 pointer-events-none" />

                     {/* Single Central Clip */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-12 z-20 flex flex-col items-center group-hover:-translate-y-1 transition-transform origin-top">
                        <div className="w-full h-full bg-[#E5B686] rounded-sm border-2 border-[#D4A373] shadow-md relative">
                             <div className="w-full h-1/2 border-b border-[#D4A373]/50" />
                        </div>
                   </div>

                   {/* Heart Decoration */}
                   <div className="absolute top-2 right-2 z-30 transform rotate-12">
                       <Heart className="w-8 h-8 fill-[#F472B6] text-white stroke-2 drop-shadow-sm" />
                   </div>
                </>
             )}

             {/* ----------------- UNIFIED TAPE RENDERING ----------------- */}

             {/* ----------------- UNIFIED TAPE RENDERING ----------------- */}

             {/* ----------------- UNIFIED TAPE RENDERING ----------------- */}
             
             {/* 1. Coral Tape (Top Center) */}
             {activeStyleConfig.tapeType === 'coral' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#FF6B6B]/80 rotate-[-2deg] shadow-sm z-20" />
             )}

             {/* 2. Lime Corners (Diagonal) */}
             {(activeStyleConfig.tapeType === 'lime-corners') && (
               <>
                 <div className="absolute -top-2 -right-2 w-16 h-6 bg-[#A3E635]/80 rotate-[45deg] shadow-sm z-20" />
                 <div className="absolute -bottom-2 -left-2 w-16 h-6 bg-[#A3E635]/80 rotate-[45deg] shadow-sm z-20" />
               </>
             )}

             {/* 3. Sakura Pink (Gradient Top) */}
             {activeStyleConfig.tapeType === 'sakura' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 opacity-90 rotate-[-1deg] shadow-sm border-y border-pink-400/30 z-20" />
             )}

             {/* 4. Matcha Green (Gradient Top) */}
             {activeStyleConfig.tapeType === 'matcha' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 opacity-90 rotate-[1deg] shadow-sm border-y border-green-400/30 z-20" />
             )}

             {/* 5. Pastel Dream (Gradient Top) */}
             {activeStyleConfig.tapeType === 'pastel' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 opacity-90 rotate-[-1deg] shadow-sm border-y border-purple-300/30 z-20" />
             )}

             {/* 6. Strawberry 4 Corners (Transparent Red) - kept distinct flag or could convert to tapeType='strawberry-4' */}
             {activeStyleConfig.hasFourCorners && (
               <>
                 <div className="absolute -top-2 -left-2 w-14 h-6 bg-[#F87171]/80 rotate-[-45deg] shadow-sm z-20" />
                 <div className="absolute -top-2 -right-2 w-14 h-6 bg-[#F87171]/80 rotate-[45deg] shadow-sm z-20" />
                 <div className="absolute -bottom-2 -left-2 w-14 h-6 bg-[#F87171]/80 rotate-[45deg] shadow-sm z-20" />
                 <div className="absolute -bottom-2 -right-2 w-14 h-6 bg-[#F87171]/80 rotate-[-45deg] shadow-sm z-20" />
               </>
             )}
             <img 
                src={preview} 
                alt="Scrapbook item" 
                className={`max-w-full max-h-full transition-all duration-300 relative z-10 ${isCover ? 'w-full h-full object-cover' : activeStyleConfig.class}`}
            />

            {/* ----------------- COVER TEXT OVERLAY ----------------- */}
            {isCover && (hasText || isEditingText) && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center transition-all bg-black/30">
                    
                    {isEditingText ? (
                        <div className="flex flex-col gap-4 w-full max-w-lg animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                             <textarea 
                                value={textData.title}
                                onChange={(e) => handleTextUpdate('title', e.target.value)}
                                placeholder="Add a Title"
                                className="bg-transparent border-b-2 border-white/50 text-white text-xl md:text-3xl font-black uppercase text-center focus:outline-none focus:border-white placeholder-white/50 drop-shadow-md resize-none h-auto overflow-hidden min-h-[3rem]"
                                rows={1}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                autoFocus
                             />
                             <textarea 
                                value={textData.subtitle}
                                onChange={(e) => handleTextUpdate('subtitle', e.target.value)}
                                placeholder="Add a short description or date..."
                                className="bg-transparent border-b-2 border-white/50 text-white text-lg md:text-xl font-bold text-center focus:outline-none focus:border-white placeholder-white/50 resize-none min-h-[4rem] drop-shadow-md font-mono"
                             />
                             <button 
                                onClick={() => setIsEditingText(false)}
                                className="bg-[#A3E635] text-black font-bold uppercase py-2 px-4 rounded-full self-center hover:scale-110 transition-transform shadow-lg border-2 border-black"
                             >
                                Done
                             </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 drop-shadow-lg" onClick={() => !readOnly && setIsEditingText(true)}>
                             {textData.title && (
                                <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight whitespace-pre-wrap px-4">
                                    {textData.title}
                                </h2>
                             )}
                             {textData.subtitle && (
                                <p className="text-lg md:text-xl font-bold text-white/90 font-mono">
                                    {textData.subtitle}
                                </p>
                             )}
                        </div>
                    )}
                </div>
            )}

            {/* ----------------- RETRO PLAYER CONTROLS ----------------- */}
            
            {/* Blue Player Controls */}
            {activeStyleConfig.patternType === 'player-blue' && (
                <div className="w-full h-16 bg-blue-400/50 rounded-lg mt-1 flex flex-col justify-center px-4 gap-2 relative overflow-hidden">
                    {/* Progress */}
                    <div className="w-full h-1.5 bg-blue-700/20 rounded-full relative">
                         <div className="absolute left-0 top-0 h-full w-2/3 bg-white rounded-full"></div>
                         <div className="absolute left-[66%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                    {/* Buttons */}
                    <div className="flex items-center justify-between text-white/90">
                        <span className="text-[10px] font-mono opacity-80">02:14</span>
                        <div className="flex items-center gap-3">
                            <SkipBack className="w-4 h-4 fill-white" />
                            <div className="p-1.5 bg-white rounded-full text-blue-500 shadow-sm">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                            <SkipForward className="w-4 h-4 fill-white" />
                        </div>
                        <span className="text-[10px] font-mono opacity-80">-01:20</span>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-1 right-2 w-full flex justify-end pointer-events-none opacity-20">
                         <Music className="w-8 h-8 text-white -rotate-12" />
                    </div>
                </div>
            )}

            {/* Peach Player Controls */}
            {activeStyleConfig.patternType === 'player-peach' && (
                <div className="w-full h-14 bg-red-400/10 rounded-lg mt-1 flex items-center justify-between px-3 gap-2 border border-red-900/5">
                    <div className="flex flex-col">
                        <div className="flex items-end gap-0.5 h-6 mb-1">
                             {[4, 8, 3, 6, 9, 5, 7, 3, 6, 4, 8, 5].map((h, i) => (
                                 <div key={i} className="w-1 bg-[#EF4444]/60 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                             ))}
                        </div>
                        <span className="text-[9px] font-bold text-red-900/60 uppercase tracking-widest">Now Playing</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#EF4444] fill-[#EF4444]/20" />
                        <div className="w-10 h-10 bg-[#EF4444] rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                             <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                    </div>
                </div>
            )}
            {/* ----------------- CUTE BROWSER STYLES ----------------- */}

            {/* Pinky Window Browser */}
            {activeStyleConfig.patternType === 'browser-pink' && (
                <div className="absolute top-0 left-0 w-full p-2 z-20">
                    <div className="flex items-center gap-1 mb-1">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-pink-300 border border-pink-400" />
                            <div className="w-2 h-2 rounded-full bg-yellow-300 border border-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-green-300 border border-green-400" />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-md border border-pink-200 px-2 py-1 flex items-center gap-2 mb-1 shadow-sm">
                        <div className="flex gap-1 text-pink-300">
                             <ArrowLeft className="w-3 h-3" />
                             <ArrowRight className="w-3 h-3" />
                        </div>
                        <div className="flex-1 bg-pink-50 rounded-full h-3 relative">
                            <div className="absolute top-0 left-2 bottom-0 flex items-center">
                                <span className="text-[6px] text-pink-400 font-mono">cutie.net/love</span>
                            </div>
                        </div>
                        <Search className="w-3 h-3 text-pink-300" />
                    </div>
                </div>
            )}

            {/* Dreamy Paint Window */}
            {activeStyleConfig.patternType === 'browser-paint' && (
                <>
                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-6 bg-purple-100/50 rounded-t-lg border-b border-purple-200 flex items-center justify-between px-2 z-20">
                         <div className="flex gap-1">
                             <Heart className="w-3 h-3 fill-pink-300 text-pink-400" />
                             <Heart className="w-3 h-3 fill-purple-300 text-purple-400" />
                             <Heart className="w-3 h-3 fill-blue-300 text-blue-400" />
                         </div>
                         <span className="text-[8px] font-bold text-purple-400 uppercase tracking-widest">Painty</span>
                    </div>

                    {/* Bottom Tools */}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-purple-100/80 rounded-b-lg border-t border-purple-200 flex items-center px-3 justify-between z-20">
                         <div className="flex gap-1">
                              <div className="w-4 h-4 rounded-full bg-[#FF9AA2] border border-white shadow-sm" />
                              <div className="w-4 h-4 rounded-full bg-[#FFB7B2] border border-white shadow-sm" />
                              <div className="w-4 h-4 rounded-full bg-[#FFDAC1] border border-white shadow-sm" />
                              <div className="w-4 h-4 rounded-full bg-[#E2F0CB] border border-white shadow-sm" />
                         </div>
                         <div className="bg-white p-1 rounded hover:scale-110 transition-transform">
                              <Palette className="w-4 h-4 text-purple-400" />
                         </div>
                    </div>

                    {/* Little Butterfly Decoration */}
                    <div className="absolute -top-2 -right-2 text-xl filter drop-shadow-md animate-pulse z-30">
                        🦋
                    </div>
                    <div className="absolute -bottom-1 -left-2 text-lg filter drop-shadow-md z-30 rotate-12">
                        🌸
                    </div>
                </>
            )}

            {/* ----------------- BRUTAL STYLES REINFORCEMENT ----------------- */}
            
            {/* Glitch Effect Layers */}
            {activeStyleConfig.patternType === 'glitch' && (
                <>
                    {/* Cyan Offset */}
                    <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 mix-blend-multiply opacity-50 translate-x-1 translate-y-1 pointer-events-none z-20" />
                    {/* Magenta Offset */}
                    <div className="absolute top-0 left-0 w-full h-full bg-magenta-400 mix-blend-multiply opacity-50 -translate-x-1 -translate-y-1 pointer-events-none z-20" />
                    
                    {/* Scanlines */}
                    <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />

                    <div className="absolute -bottom-4 -right-4 bg-black text-[#00FFFF] px-2 font-mono text-xs font-bold border-2 border-[#00FFFF]">
                        ERR_092
                    </div>
                </>
            )}

            {/* Caution Tape Style */}
            {activeStyleConfig.patternType === 'caution' && (
                <>
                    {/* Striped Background within padding */}
                    <div 
                        className="absolute inset-0 z-0 pointer-events-none opacity-50"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #FBBF24 10px, #FBBF24 20px)'
                        }}
                    />
                    
                    {/* Inner frame background for image */}
                    <div className="absolute inset-4 bg-black z-0" />
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-[#FBBF24] px-4 py-1 font-black uppercase tracking-widest border-2 border-[#FBBF24] z-30 rotate-1">
                        WARNING
                    </div>
                    
                    <div className="absolute bottom-0 right-4 translate-y-1/2 bg-white text-black px-2 py-0.5 font-bold border-2 border-black z-30 -rotate-2">
                         KEEP OUT
                    </div>
                </>
            )}
        </div>

        {/* CONTROLS */}
        {!readOnly && (
            <>
                {/* Debug Badge (Temporary - remove if visible) */}
                {isCover && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 rounded-full pointer-events-none z-50">
                        COVER MODE
                    </div>
                )}

                {/* 1. Edit Style Button (Pen) - Non-Covers Only */}
                {!isCover && (
                    <button 
                        onClick={() => onOpenDrawer('STYLE', { categories: STYLE_CATEGORIES, currentStyle }, handleStyleSelect, 'Image Style')}
                        className={`absolute top-4 right-4 bg-white text-black border-2 border-black p-2 rounded-lg hover:bg-[#FFD43B] shadow-[2px_2px_0px_0px_black] z-50 transition-all`}
                        title="Edit Style"
                    >
                        <PenTool className="w-4 h-4" />
                    </button>
                )}

                {/* 2. Add/Edit Text Button - Covers Only */}
                {isCover && (
                    <button 
                        onClick={() => setIsEditingText(true)}
                        className={`absolute top-4 right-4 bg-white text-black border-2 border-black py-2 px-3 rounded-lg hover:bg-[#A3E635] shadow-[2px_2px_0px_0px_black] z-50 transition-all flex items-center gap-2 ${isEditingText ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        title="Add Text"
                    >
                        <Type className="w-4 h-4" />
                        <span className="text-xs font-black uppercase">Add Text</span>
                    </button>
                )}

                {/* 3. Change Image Button - All */}
                {!isEditingText && (
                    <label className={`absolute bottom-4 right-4 bg-black text-white p-2 rounded-full cursor-pointer transition-all z-40 shadow-lg border-2 border-white hover:scale-110 ${!isCover ? 'opacity-100 md:opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                )}
            </>
        )}



      </div>
    );
  }



  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
        {!readOnly && (
            <div className="w-full h-full border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors rounded-lg bg-white/50 flex flex-col items-center justify-center p-4 relative">
                
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
