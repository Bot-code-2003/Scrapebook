'use client';
import React from 'react';
import { Image, Type, X, Sticker, Sparkles } from 'lucide-react';

export default function ComponentSelector({ onSelect, onClose }) {
  return (
        <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-64 bg-white border-r-4 border-black shadow-[10px_0px_0px_0px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-left duration-300">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
            >
                <X className="w-6 h-6" />
            </button>
            
            <header className="mb-8 mt-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">ADD CONTENT</h2>
                <div className="h-1 w-12 bg-[#A3E635]"></div>
            </header>

            <div className="flex flex-col gap-4">
                 <button 
                    onClick={() => onSelect('image')}
                    className="group border-4 border-black p-4 text-left hover:bg-[#A3E635] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black] transition-all"
                >
                    <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-black transition-colors">
                        <Image className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase">Photo</h3>
                    <p className="text-xs font-bold text-gray-500 mt-1 uppercase group-hover:text-black">Upload or add images</p>
                 </button>

                 <button 
                    onClick={() => onSelect('text')}
                    className="group border-4 border-black p-4 text-left hover:bg-[#FFD43B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black] transition-all"
                >
                    <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-black transition-colors">
                        <Type className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase">Text</h3>
                    <p className="text-xs font-bold text-gray-500 mt-1 uppercase group-hover:text-black">Add stories & notes</p>
                 </button>

                 {/* Coming Soon Options */}
                 <div className="border-4 border-gray-200 p-4 text-left opacity-50 cursor-not-allowed">
                    <div className="bg-gray-200 text-gray-400 w-12 h-12 flex items-center justify-center mb-3">
                        <Sticker className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase text-gray-400">Stickers</h3>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Coming Soon</p>
                 </div>
            </div>

            <div className="mt-auto pt-6 text-center">
                 <p className="text-xs font-mono text-gray-400">DIGIGIFT BUILDER v1.0</p>
            </div>
        </div>
  );
}
