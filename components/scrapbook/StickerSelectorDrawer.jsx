import React, { useState } from 'react';
import { X, Smile, ChevronDown, ChevronRight } from 'lucide-react';

const STICKER_CATEGORIES = [
    {
        id: 'flowers',
        label: 'Flowers 🌸',
        items: [
            '/stickers/flowers/aesthetic-flower.webp',
            '/stickers/flowers/bear-with-flower.webp',
            '/stickers/flowers/bunny-flower-1.webp',
            '/stickers/flowers/bunny-flower.webp',
            '/stickers/flowers/cactus-flower.webp',
            '/stickers/flowers/pink-flower-1.webp',
            '/stickers/flowers/pink-flower-2.webp',
            '/stickers/flowers/pink-flower.webp',
            '/stickers/flowers/pink-sticker-flower.webp',
            '/stickers/flowers/rat-give-flowers.webp',
            '/stickers/flowers/red-flower.webp',
        ]
    },
    {
        id: 'animals',
        label: 'Animals 🐾',
        items: [
            '/stickers/animals/bear-with-flower.webp',
            '/stickers/animals/bunny-flower.webp',
            '/stickers/animals/cat-on-cat.webp',
            '/stickers/animals/cute-duck.webp',
            '/stickers/animals/fat-bird.webp',
            '/stickers/animals/fat-cat.webp',
            '/stickers/animals/hello-kitty.webp',
            '/stickers/animals/piggy.webp',
            '/stickers/animals/pink-bunny.webp',
            '/stickers/animals/rat-give-flowers.webp',
        ]
    }
];

export default function StickerSelectorDrawer({ onClose, onSelect }) {
    // Default expanding the first category
    const [expandedCategory, setExpandedCategory] = useState('flowers');

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    return (
        <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300">
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>
            
            <header className="mb-8 mt-2">
                <div className="flex items-center gap-2 mb-2">
                     <Smile className="w-6 h-6 text-rose-500" />
                     <h2 className="text-2xl font-bold tracking-tight text-gray-900">Add Sticker</h2>
                </div>
                <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto px-1 flex flex-col gap-3 pb-4">
                 {STICKER_CATEGORIES.map((category) => {
                     const isExpanded = expandedCategory === category.id;
                     return (
                        <div key={category.id} className={`border rounded-xl overflow-hidden transition-all ${isExpanded ? 'border-gray-200 bg-white shadow-sm' : 'border-transparent bg-gray-50'}`}>
                            <button 
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <span className={`font-bold text-sm ${isExpanded ? 'text-rose-500' : 'text-gray-700'}`}>
                                    {category.label}
                                </span>
                                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                            </button>
                            
                            {isExpanded && (
                                <div className="p-4 pt-0 border-t border-gray-50 bg-white max-h-80 overflow-y-auto">
                                    <div className="grid grid-cols-2 gap-3 pt-3">
                                        {category.items.map((url, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => {
                                                    onSelect(url);
                                                    onClose();
                                                }}
                                                className="aspect-square flex items-center justify-center p-2 rounded-xl border border-gray-100 hover:border-rose-300 hover:bg-rose-50 transition-all hover:scale-105 group bg-white shadow-sm"
                                            >
                                                <img src={url} alt="sticker" className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-md" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                     );
                 })}
            </div>
            
            <div className="mt-auto pt-4 text-center border-t border-gray-100">
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
                 >
                    Done
                 </button>
            </div>
        </div>
    );
}
