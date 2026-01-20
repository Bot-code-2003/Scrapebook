'use client';
import React from 'react';
import { X, Check } from 'lucide-react';

export default function StyleEditorDrawer({ title, categories, currentStyle, onSelect, onClose }) {
  // State to track which category is expanded
  const [expandedCat, setExpandedCat] = React.useState(null);

  // Auto-expand the category containing the current style on mount
  React.useEffect(() => {
    if (categories) {
        for (const cat of categories) {
            if (cat.options.find(opt => opt.id === currentStyle)) {
                setExpandedCat(cat.id);
                break;
            }
        }
    }
  }, [currentStyle, categories]);

  const toggleCategory = (catId) => {
    setExpandedCat(prev => prev === catId ? null : catId);
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r-4 border-black shadow-[10px_0px_0px_0px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-left duration-300">
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
            >
                <X className="w-6 h-6" />
            </button>
            
            <header className="mb-8 mt-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">{title || "Edit Style"}</h2>
                <div className="h-1 w-12 bg-[#A3E635]"></div>
            </header>

            <div className="flex flex-col gap-2 overflow-y-auto pb-10 flex-1">
                {categories?.map(cat => {
                    const isExpanded = expandedCat === cat.id;
                    const isActiveCategory = cat.options.some(opt => opt.id === currentStyle);

                    return (
                        <div key={cat.id} className="border-2 border-black bg-white">
                            {/* Category Header */}
                            <button 
                                onClick={() => toggleCategory(cat.id)}
                                className={`w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors ${isExpanded ? 'border-b-2 border-black' : ''}`}
                            >
                                <div className="flex items-center gap-2">
                                     <span className="font-black uppercase text-lg">{cat.label}</span>
                                     {isActiveCategory && <div className="w-2 h-2 rounded-full bg-[#A3E635] border border-black shadow-sm" />}
                                </div>
                                <span className="font-mono text-xl">{isExpanded ? '-' : '+'}</span>
                            </button>

                            {/* Options List (Accordion Body) */}
                            {isExpanded && (
                                <div className="p-2 bg-white flex flex-col gap-1">
                                    {cat.options.map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => onSelect(opt.id)}
                                            className={`w-full text-left px-4 py-3 font-bold uppercase text-sm transition-all flex items-center justify-between group ${
                                                currentStyle === opt.id 
                                                    ? 'bg-[#A3E635] text-black' 
                                                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>{opt.label}</span>
                                            {currentStyle === opt.id && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
             <div className="mt-auto pt-4 text-center border-t border-gray-100">
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
                 >
                    Done
                 </button>
            </div>
    </div>
  );
}
