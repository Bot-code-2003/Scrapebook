'use client';
import React, { useState } from 'react';
import { X, Check, Palette, Type } from 'lucide-react';

// Font style presets - each uses the SAME font for heading and body (cleaner look)
const FONT_STYLES = [
  { 
    id: 'classic', 
    label: 'Classic', 
    emoji: '📖',
    headingFont: 'var(--font-space-grotesk)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '800',
    bodyWeight: '400'
  },
  { 
    id: 'handwritten', 
    label: 'Handwritten', 
    emoji: '✏️',
    headingFont: 'var(--font-caveat)', 
    bodyFont: 'var(--font-caveat)',
    headingWeight: '700',
    bodyWeight: '400'
  },
  { 
    id: 'retro', 
    label: 'Retro', 
    emoji: '🎞️',
    headingFont: 'var(--font-cormorant)', 
    bodyFont: 'var(--font-cormorant)',
    headingWeight: '700',
    bodyWeight: '400'
  },
];

// Preset Colors
const COLOR_PRESETS = [
  '#000000', '#1F2937', '#374151', '#4B5563', 
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#991B1B', '#9A3412', '#854D0E', '#166534',
  '#115E59', '#1E40AF', '#5B21B6', '#9D174D',
  '#FECACA', '#FED7AA', '#FEF08A', '#BBF7D0',
  '#A5F3FC', '#BFDBFE', '#DDD6FE', '#FBCFE8',
  '#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB',
];

export default function TextStyleEditorDrawer({ 
  currentFontStyle, 
  currentBgColor, 
  onFontChange, 
  onColorChange, 
  onClose,
  isCover = false
}) {
  const [activeTab, setActiveTab] = useState('font');
  const [localColor, setLocalColor] = useState(currentBgColor || '#000000');

  const handleColorChange = (color) => {
    setLocalColor(color);
    onColorChange(color);
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

      <header className="mb-6 mt-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Text Style</h2>
        <div className="h-1 w-12 bg-[#A3E635]"></div>
      </header>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 border-b-2 border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('font')}
          className={`flex items-center gap-2 px-4 py-2 font-bold uppercase text-sm transition-all ${
            activeTab === 'font' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Type className="w-4 h-4" />
          Fonts
        </button>
        {isCover && (
          <button
            onClick={() => setActiveTab('color')}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase text-sm transition-all ${
              activeTab === 'color' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            Color
          </button>
        )}
      </div>

      {/* Font Styles Tab */}
      {activeTab === 'font' && (
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pb-4">
          {FONT_STYLES.map((font) => (
            <button
              key={font.id}
              onClick={() => onFontChange(font.id)}
              className={`w-full text-left p-4 rounded-lg border-3 transition-all hover:scale-[1.02] ${
                currentFontStyle === font.id 
                  ? 'border-[#A3E635] bg-[#A3E635]/10 border-4' 
                  : 'border-gray-200 hover:border-gray-400 border-2'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{font.emoji}</span>
                <span className="font-bold text-sm text-gray-700">{font.label}</span>
                {currentFontStyle === font.id && (
                  <Check className="ml-auto w-5 h-5 text-[#A3E635]" />
                )}
              </div>
              <div 
                className="text-2xl truncate text-gray-800"
                style={{ 
                  fontFamily: font.headingFont,
                  fontWeight: font.headingWeight
                }}
              >
                Hello World
              </div>
              <div 
                className="text-sm text-gray-500 truncate mt-1"
                style={{ 
                  fontFamily: font.bodyFont,
                  fontWeight: font.bodyWeight
                }}
              >
                The quick brown fox jumps over...
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Color Tab (only for covers) */}
      {activeTab === 'color' && isCover && (
        <div className="flex flex-col gap-4 overflow-y-auto flex-1 pb-4">
          {/* Color Wheel / Native Picker */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <input
              type="color"
              value={localColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-16 h-16 cursor-pointer border-4 border-black rounded-lg shadow-[3px_3px_0px_0px_black]"
              title="Pick a color"
            />
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">HEX Code</label>
              <input
                type="text"
                value={localColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    handleColorChange(val);
                  }
                }}
                onBlur={(e) => {
                  let val = e.target.value;
                  if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    handleColorChange('#000000');
                  }
                }}
                className="w-full px-3 py-2 border-2 border-black font-mono text-lg uppercase shadow-[2px_2px_0px_0px_black]"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase">Preset Colors</div>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-110 ${
                    localColor === color 
                      ? 'border-[#A3E635] ring-2 ring-[#A3E635] ring-offset-1' 
                      : 'border-black hover:shadow-[2px_2px_0px_0px_black]'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100">
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
