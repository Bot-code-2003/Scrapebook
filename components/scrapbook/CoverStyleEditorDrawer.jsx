'use client';
import React, { useState, useEffect } from 'react';
import { X, Check, Type, Layers, Palette } from 'lucide-react';

// Font style presets
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

// Overlay color presets
const OVERLAY_COLORS = [
  { id: 'black', value: '#000000', label: 'Black' },
  { id: 'navy', value: '#1e3a5f', label: 'Navy' },
  { id: 'wine', value: '#722f37', label: 'Wine' },
  { id: 'forest', value: '#1a4d2e', label: 'Forest' },
  { id: 'purple', value: '#4a1a6b', label: 'Purple' },
  { id: 'brown', value: '#3d2914', label: 'Brown' },
];

// Text color presets
const TEXT_COLOR_PRESETS = [
  '#FFFFFF', '#F8F8F8', '#E0E0E0', '#FFD700',
  '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493',
  '#00FFFF', '#87CEEB', '#ADD8E6', '#B0E0E6',
  '#98FB98', '#90EE90', '#00FA9A', '#7CFC00',
  '#FFE4B5', '#FFDAB9', '#FFA07A', '#FA8072',
  '#DDA0DD', '#EE82EE', '#DA70D6', '#BA55D3',
];

export default function CoverStyleEditorDrawer({ 
  currentFontStyle, 
  currentOverlayColor, 
  currentOverlayOpacity,
  currentTextColor,
  onFontChange, 
  onOverlayChange,
  onTextColorChange, 
  onClose
}) {
  const [activeTab, setActiveTab] = useState('font');
  const [localColor, setLocalColor] = useState(currentOverlayColor || '#000000');
  const [localOpacity, setLocalOpacity] = useState(currentOverlayOpacity ?? 0.4);
  const [localTextColor, setLocalTextColor] = useState(currentTextColor || '#FFFFFF');
  
  // LOCAL state for selected font (updates immediately on click)
  const [selectedFont, setSelectedFont] = useState(currentFontStyle || 'classic');

  // Sync if prop changes
  useEffect(() => {
    setSelectedFont(currentFontStyle || 'classic');
  }, [currentFontStyle]);

  const handleFontSelect = (fontId) => {
    setSelectedFont(fontId);
    onFontChange && onFontChange(fontId);
  };

  const handleColorChange = (color) => {
    setLocalColor(color);
    onOverlayChange(color, localOpacity);
  };

  const handleOpacityChange = (opacity) => {
    setLocalOpacity(opacity);
    onOverlayChange(localColor, opacity);
  };

  const handleTextColorChange = (color) => {
    setLocalTextColor(color);
    if (onTextColorChange) {
      onTextColorChange(color);
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

      <header className="mb-6 mt-2">
        <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Cover Style</h2>
        <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
      </header>

      {/* Tab Switcher */}
      <div className="flex gap-1 mb-6 border-b border-gray-100 pb-1 flex-wrap">
        <button
          onClick={() => setActiveTab('font')}
          className={`flex items-center gap-1.5 px-3 py-2 font-medium text-xs transition-all border-b-2 ${
            activeTab === 'font' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Type className="w-3 h-3" />
          Fonts
        </button>
        <button
          onClick={() => setActiveTab('textcolor')}
          className={`flex items-center gap-1.5 px-3 py-2 font-medium text-xs transition-all border-b-2 ${
            activeTab === 'textcolor' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Palette className="w-3 h-3" />
          Text Color
        </button>
        <button
          onClick={() => setActiveTab('overlay')}
          className={`flex items-center gap-1.5 px-3 py-2 font-medium text-xs transition-all border-b-2 ${
            activeTab === 'overlay' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers className="w-3 h-3" />
          Overlay
        </button>
      </div>

      {/* Font Styles Tab */}
      {activeTab === 'font' && (
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pb-4">
          {FONT_STYLES.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontSelect(font.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedFont === font.id 
                  ? 'border-rose-400 bg-rose-50/50 shadow-sm ring-1 ring-rose-400' 
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{font.emoji}</span>
                <span className={`font-bold text-sm ${selectedFont === font.id ? 'text-rose-600' : 'text-gray-700'}`}>{font.label}</span>
                {selectedFont === font.id && (
                  <Check className="ml-auto w-5 h-5 text-rose-500" />
                )}
              </div>
              <div 
                className="text-2xl truncate text-gray-900"
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

      {/* Text Color Tab */}
      {activeTab === 'textcolor' && (
        <div className="flex flex-col gap-4 overflow-y-auto flex-1 pb-4">
          {/* Color Picker + Hex Input */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <input
              type="color"
              value={localTextColor}
              onChange={(e) => handleTextColorChange(e.target.value)}
              className="w-14 h-14 cursor-pointer rounded-lg border-0 bg-transparent p-0 overflow-hidden shadow-sm"
              title="Pick a text color"
            />
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase tracking-wide">HEX Code</label>
              <input
                type="text"
                value={localTextColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    handleTextColorChange(val);
                  }
                }}
                onBlur={(e) => {
                  let val = e.target.value;
                  if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    handleTextColorChange('#FFFFFF');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Preset Colors</div>
            <div className="grid grid-cols-6 gap-2">
              {TEXT_COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleTextColorChange(color)}
                  className={`w-9 h-9 rounded-full border transition-all hover:scale-110 ${
                    localTextColor.toUpperCase() === color.toUpperCase()
                      ? 'border-gray-300 ring-2 ring-rose-400 ring-offset-2' 
                      : 'border-black/5 hover:border-black/20 hover:shadow-sm'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mt-2">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Preview</div>
            <div className="relative h-28 rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-inner">
              <span 
                className="font-bold text-xl"
                style={{ color: localTextColor, textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
              >
                Your Title Text
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Tab */}
      {activeTab === 'overlay' && (
        <div className="flex flex-col gap-6 overflow-y-auto flex-1 pb-4">
          {/* Overlay Color */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Overlay Color</div>
            <div className="grid grid-cols-3 gap-3">
              {OVERLAY_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:scale-105 ${
                    localColor === color.value 
                      ? 'border-rose-400 bg-rose-50 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs font-bold text-gray-600">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Opacity */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">
              Overlay Darkness: {Math.round(localOpacity * 100)}%
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.1"
              value={localOpacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>Light</span>
              <span>Dark</span>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4">
            <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Preview</div>
            <div className="relative h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80)' }} />
              <div 
                className="absolute inset-0 transition-colors duration-300"
                style={{ 
                  backgroundColor: localColor,
                  opacity: localOpacity
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="font-bold text-lg" 
                  style={{ 
                    color: localTextColor,
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)' 
                  }}
                >
                  Sample Text
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100">
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
