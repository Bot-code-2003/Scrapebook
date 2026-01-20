'use client';
import React from 'react';
import { X, Check } from 'lucide-react';

export default function BackgroundEditorDrawer({ bgPattern, setBgPattern, bgColor, setBgColor, soundId, setSoundId, animId, setAnimId, bookStyle, setBookStyle, bgOptions, colorOptions, soundOptions, animOptions, bookStyleOptions, onClose }) {
  return (
    <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r-4 border-black shadow-[10px_0px_0px_0px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-left duration-300 overflow-y-auto">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
            >
                <X className="w-6 h-6" />
            </button>
            
            <header className="mb-8 mt-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">PAGE THEME</h2>
                <div className="h-1 w-12 bg-[#A3E635]"></div>
                <p className="text-gray-500 text-sm mt-2 font-medium">Customize the look of your scrapbook pages.</p>
            </header>

            <div className="flex flex-col gap-8 pb-10">
                
                {/* BOOK STYLE SECTION */}
                {bookStyleOptions && (
                <div>
                     <h3 className="font-black uppercase text-sm tracking-widest text-gray-400 mb-4">Book Style</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {bookStyleOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setBookStyle(opt.id)}
                                className={`p-3 border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                                    bookStyle === opt.id 
                                        ? 'border-black bg-white shadow-[4px_4px_0px_0px_black] -translate-y-1' 
                                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                }`}
                            >
                                {/* Mini book preview */}
                                <div className={`w-8 h-10 bg-gray-100 ${opt.preview}`}></div>
                                <span className="font-bold uppercase text-xs">{opt.label}</span>
                            </button>
                        ))}
                     </div>
                </div>
                )}

                {/* TEXTURES SECTION */}
                <div>
                    <h3 className="font-black uppercase text-sm tracking-widest text-gray-400 mb-4">Paper Texture</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {bgOptions.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setBgPattern(opt.id)}
                                className={`p-3 border-2 flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                                    bgPattern === opt.id 
                                        ? 'border-black bg-white shadow-[4px_4px_0px_0px_black] -translate-y-1' 
                                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                }`}
                            >
                                {/* Miniature Texture Preview Area */}
                                <div 
                                    className="w-full flex-1 border border-gray-100 mb-1"
                                    style={{
                                        background: opt.value === 'none' ? '#f5f5f5' : (opt.value.includes('url') ? opt.value : undefined),
                                        backgroundColor: '#FAFAFA',
                                    }}
                                >
                                    {opt.id === 'dots' && <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
                                    {opt.id === 'lines' && <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 10px' }}></div>}
                                </div>
                                <span className="font-bold uppercase text-xs">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* COLORS SECTION */}
                <div>
                     <h3 className="font-black uppercase text-sm tracking-widest text-gray-400 mb-4">Paper Color</h3>
                     <div className="flex flex-col gap-3">
                        {colorOptions.map(opt => (
                            <button 
                                key={opt.id}
                                onClick={() => setBgColor(opt.value)}
                                className={`flex items-center gap-4 p-3 border-2 transition-all ${
                                    bgColor === opt.value
                                        ? 'border-black bg-white shadow-[4px_4px_0px_0px_black] -translate-y-1'
                                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                }`}
                            >   
                                <div 
                                    className="w-10 h-10 rounded-full border-2 border-gray-100 shadow-sm"
                                    style={{ backgroundColor: opt.value }}
                                ></div>
                                <span className="font-bold uppercase text-sm">{opt.label}</span>
                                {bgColor === opt.value && <Check className="ml-auto w-4 h-4" />}
                            </button>
                        ))}
                     </div>
                </div>

                {/* ANIMATION SECTION */}
                <div>
                     <h3 className="font-black uppercase text-sm tracking-widest text-gray-400 mb-4">Flip Style</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {animOptions?.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setAnimId(opt.id)}
                                className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                                    animId === opt.id 
                                        ? 'border-black bg-white shadow-[4px_4px_0px_0px_black] -translate-y-1' 
                                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                }`}
                            >
                                <span className="text-2xl">{opt.icon}</span>
                                <span className="font-bold uppercase text-xs">{opt.label}</span>
                            </button>
                        ))}
                     </div>
                </div>

                {/* SOUNDS SECTION */}
                <div>
                     <h3 className="font-black uppercase text-sm tracking-widest text-gray-400 mb-4">Ambience</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {soundOptions?.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => {
                                    setSoundId(opt.id);
                                    // Play sound immediately if one is selected
                                    if(opt.src) {
                                        const audio = new Audio(opt.src);
                                        audio.play().catch(e => console.error(e));
                                    }
                                }}
                                className={`p-4 border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                                    soundId === opt.id 
                                        ? 'border-black bg-white shadow-[4px_4px_0px_0px_black] -translate-y-1' 
                                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                }`}
                            >
                                <span className="text-2xl">{opt.id === 'none' ? '🔇' : '🔊'}</span>
                                <span className="font-bold uppercase text-xs">{opt.label}</span>
                            </button>
                        ))}
                     </div>
                </div>

            </div>
            
             <div className="mt-auto pt-4 text-center border-t border-gray-100">
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
                 >
                    Apply Theme
                 </button>
            </div>
    </div>
  );
}
