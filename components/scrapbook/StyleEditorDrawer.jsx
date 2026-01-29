'use client';
import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function StyleEditorDrawer({ title, categories, currentStyle, onSelect, onClose, tapePosition, onTapePosChange, polaroidPosition, onPolaroidPosChange }) {
  // LOCAL state to track selected style (updates immediately on click)
  const [selectedStyle, setSelectedStyle] = useState(currentStyle);
  const [selectedTapePos, setSelectedTapePos] = useState(tapePosition || 'corners-4');
  const [selectedPolaroidPos, setSelectedPolaroidPos] = useState(polaroidPosition || 'default');

  // State to track which category is expanded
  const [expandedCat, setExpandedCat] = useState(null);

  // Sync if prop changes externally
  useEffect(() => {
    setSelectedStyle(currentStyle);
  }, [currentStyle]);

  useEffect(() => {
    setSelectedTapePos(tapePosition || 'corners-4');
  }, [tapePosition]);

  useEffect(() => {
    setSelectedPolaroidPos(polaroidPosition || 'default');
  }, [polaroidPosition]);

  // Auto-expand the category containing the current style on mount
  useEffect(() => {
    if (categories) {
        for (const cat of categories) {
            if (cat.options.find(opt => opt.id === selectedStyle)) {
                setExpandedCat(cat.id);
                break;
            }
        }
    }
  }, [selectedStyle, categories]);

  const toggleCategory = (catId) => {
    if (expandedCat === catId) {
        setExpandedCat(null);
    } else {
        setExpandedCat(catId);
    }
  };

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
    onSelect(styleId);
  };

  const handleTapePosSelect = (pos) => {
    setSelectedTapePos(pos);
    if (onTapePosChange) onTapePosChange(pos);
  };

  const handlePolaroidPosSelect = (pos) => {
    setSelectedPolaroidPos(pos);
    if (onPolaroidPosChange) onPolaroidPosChange(pos);
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
                <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
            </header>

            <div className="flex flex-col gap-3 overflow-y-auto pb-10 flex-1 px-1">
                {categories?.map(cat => {
                    const isExpanded = expandedCat === cat.id;
                    const isActiveCategory = cat.options.some(opt => opt.id === selectedStyle);

                    return (
                        <div key={cat.id} className={`border rounded-xl ${isExpanded ? 'border-gray-200 shadow-sm bg-white' : 'border-transparent bg-gray-50'}`}>
                            {/* Category Header */}
                            <button 
                                onClick={() => toggleCategory(cat.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                     <span className={`font-bold text-sm ${isActiveCategory ? 'text-rose-500' : 'text-gray-700'}`}>{cat.label}</span>
                                     {isActiveCategory && <div className="w-2 h-2 rounded-full bg-rose-400" />}
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
                                                    onClick={() => handleTapePosSelect(pos.id)}
                                                    className={`flex-1 text-[10px] font-bold uppercase py-1.5 rounded-md transition-all ${
                                                        selectedTapePos === pos.id
                                                            ? 'bg-white text-gray-900 shadow-sm'
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
                                                    onClick={() => handlePolaroidPosSelect(pos.id)}
                                                    className={`flex-1 text-[10px] font-bold uppercase py-1.5 rounded-md transition-all ${
                                                        selectedPolaroidPos === pos.id
                                                            ? 'bg-white text-gray-900 shadow-sm'
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
                                            onClick={() => handleStyleSelect(opt.id)}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-between group ${
                                                selectedStyle === opt.id 
                                                    ? 'bg-rose-50 text-rose-600' 
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <span>{opt.label}</span>
                                            {selectedStyle === opt.id && <Check className="w-4 h-4 text-rose-500" />}
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
                    className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
                 >
                    Done
                 </button>
            </div>
    </div>
  );
}
