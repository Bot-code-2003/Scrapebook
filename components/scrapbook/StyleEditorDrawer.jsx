'use client';
import React from 'react';
import { X, Check } from 'lucide-react';

export default function StyleEditorDrawer({ title, categories, currentStyle, onSelect, onClose, tapePosition, onTapePosChange, polaroidPosition, onPolaroidPosChange }) {
  // State to track which category is expanded
  const [expandedCat, setExpandedCat] = React.useState(null);

  // Auto-expand the category containing the current style on mount
  React.useEffect(() => {
    if (categories) {
        for (const cat of categories) {
            if (cat.options.find(opt => opt.id === currentStyle)) {
                setExpandedCat(cat.id);
                // If it's the tape category, keep it expanded
                break;
            }
        }
    }
  }, [currentStyle, categories]);

  const toggleCategory = (catId) => {
    if (expandedCat === catId) {
        setExpandedCat(null); // Close if already open
    } else {
        setExpandedCat(catId); // Open new one (closing others)
    }
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
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">{title || "Edit Style"}</h2>
                <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
            </header>

            <div className="flex flex-col gap-3 overflow-y-auto pb-10 flex-1 px-1">
                {categories?.map(cat => {
                    const isExpanded = expandedCat === cat.id;
                    const isActiveCategory = cat.options.some(opt => opt.id === currentStyle);

                    return (
                        <div key={cat.id} className={`border rounded-xl ${isExpanded ? 'border-gray-200 shadow-sm bg-white' : 'border-transparent bg-gray-50'}`}>
                            {/* Category Header */}
                            <button 
                                onClick={() => toggleCategory(cat.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                     <span className={`font-bold text-sm ${isActiveCategory ? 'text-lime-600' : 'text-gray-700'}`}>{cat.label}</span>
                                     {isActiveCategory && <div className="w-2 h-2 rounded-full bg-lime-400" />}
                                </div>
                                <span className="text-gray-400">
                                    {isExpanded ? <span className="text-lg leading-none">−</span> : <span className="text-lg leading-none">+</span>}
                                </span>
                            </button>

                            {/* Options List (Accordion Body) */}
                            {isExpanded && (
                                <div className="p-2 border-t border-gray-100 bg-white flex flex-col gap-1">
                                    {/* Tape Position Selector (Only for Tape Category) */}
                                    {cat.id === 'tape' && onTapePosChange && (
                                        <div className="flex bg-gray-100 p-1 rounded-lg mb-2 mx-2 mt-2">
                                            {[
                                                { id: 'top', label: 'Top' },
                                                { id: 'corners-2', label: '2 Corner' },
                                                { id: 'corners-4', label: '4 Corner' }
                                            ].map((pos) => (
                                                <button
                                                    key={pos.id}
                                                    onClick={() => onTapePosChange(pos.id)}
                                                    className={`flex-1 text-[10px] font-bold uppercase py-1.5 rounded-md transition-all ${
                                                        (tapePosition || 'corners-4') === pos.id
                                                            ? 'bg-white text-black shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                    }`}
                                                >
                                                    {pos.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Polaroid Position Selector (Only for Polaroid Category) */}
                                    {cat.id === 'polaroid' && onPolaroidPosChange && (
                                        <div className="flex bg-gray-100 p-1 rounded-lg mb-2 mx-2 mt-2">
                                            {[
                                                { id: 'default', label: 'Stoic' },
                                                { id: 'left', label: 'Left' },
                                                { id: 'right', label: 'Right' }
                                            ].map((pos) => (
                                                <button
                                                    key={pos.id}
                                                    onClick={() => onPolaroidPosChange(pos.id)}
                                                    className={`flex-1 text-[10px] font-bold uppercase py-1.5 rounded-md transition-all ${
                                                        (polaroidPosition || 'default') === pos.id
                                                            ? 'bg-white text-black shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                    }`}
                                                >
                                                    {pos.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {cat.options.map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => onSelect(opt.id)}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-between group ${
                                                currentStyle === opt.id 
                                                    ? 'bg-lime-50 text-lime-700' 
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <span>{opt.label}</span>
                                            {currentStyle === opt.id && <Check className="w-4 h-4 text-lime-600" />}
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
                    className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/5"
                 >
                    Done
                 </button>
            </div>
    </div>
  );
}
