'use client';
import React from 'react';
import { Image, Type, X, Sticker, Sparkles } from 'lucide-react';

export default function ComponentSelector({ onSelect, onClose }) {
  return (
        <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-72 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>
            
            <header className="mb-8 mt-2">
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Add Content</h2>
                <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
            </header>

            <div className="flex flex-col gap-4">
                 <button 
                    onClick={() => onSelect('image')}
                    className="group relative overflow-hidden bg-gray-50 border border-gray-200 p-5 rounded-2xl text-left hover:bg-white hover:border-lime-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Image className="w-24 h-24" />
                    </div>
                    <div className="bg-white text-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        <Image className="w-6 h-6 text-lime-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Photo</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1 group-hover:text-gray-600">Upload or add images</p>
                 </button>

                 <button 
                    onClick={() => onSelect('text')}
                    className="group relative overflow-hidden bg-gray-50 border border-gray-200 p-5 rounded-2xl text-left hover:bg-white hover:border-yellow-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Type className="w-24 h-24" />
                    </div>
                    <div className="bg-white text-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                        <Type className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Text</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1 group-hover:text-gray-600">Add stories & notes</p>
                 </button>

                 {/* Coming Soon Options */}
                 <div className="relative overflow-hidden bg-gray-50 border border-gray-100 p-5 rounded-2xl text-left opacity-60">
                    <div className="bg-gray-100 text-gray-300 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <Sticker className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400">Stickers</h3>
                    <div className="absolute top-4 right-4 bg-gray-200/50 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Soon
                    </div>
                 </div>
            </div>

            <div className="mt-auto pt-6 text-center border-t border-gray-50">
                 <p className="text-xs font-medium text-gray-300">New components coming soon</p>
            </div>
        </div>
  );
}
