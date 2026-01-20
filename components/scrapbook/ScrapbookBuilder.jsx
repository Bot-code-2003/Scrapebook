'use client';
import React, { useState } from 'react';
import { Plus, Book } from 'lucide-react';
import BookLayout from './BookLayout';
import BookPreview from './BookPreview';
import Link from 'next/link';
import ComponentSelector from './ComponentSelector';
import StyleEditorDrawer from './StyleEditorDrawer';
import TextStyleEditorDrawer from './TextStyleEditorDrawer';
import CoverStyleEditorDrawer from './CoverStyleEditorDrawer';
import BackgroundEditorDrawer from './BackgroundEditorDrawer';
import { Palette } from 'lucide-react';

export default function ScrapbookBuilder() {
  // State for pages
  // Each page object: { id: string, type: 'empty' | 'image' | 'text', content: any }
  // We initialize with 2 empty pages.
  const [pages, setPages] = useState([
    { id: 'p1', type: 'empty', content: null },
    { id: 'p2', type: 'empty', content: null },
    { id: 'p3', type: 'empty', content: null },
    { id: 'p4', type: 'empty', content: null },
  ]);
  const [isPreview, setIsPreview] = useState(false);
  const [bgPattern, setBgPattern] = useState('graphy'); // options: graphy, dots, lines, plain
  const [bgColor, setBgColor] = useState('#FFFDF5');
  const [soundId, setSoundId] = useState('page-flip'); // options: none, page-flip

  const [animId, setAnimId] = useState('default'); // options: default, slide

  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  
  // GLOBAL DRAWER STATE
  // { type: 'NONE' | 'COMPONENT' | 'STYLE', data: any, onAction: func, title: string }
  const [activeDrawer, setActiveDrawer] = useState({ type: 'NONE', data: {}, onAction: () => {} });

  const openDrawer = (type, data = {}, onAction = () => {}, title = '') => {
    setActiveDrawer({ type, data, onAction, title });
  };
  
  const closeDrawer = () => {
    setActiveDrawer({ type: 'NONE', data: {}, onAction: () => {} });
  };

  const BG_OPTIONS = [
    { id: 'graphy', label: 'Grid', value: 'url("https://www.transparenttextures.com/patterns/graphy.png")' },
    { id: 'dots', label: 'Dots', value: 'radial-gradient(#000 1px, transparent 1px)' },
    { id: 'lines', label: 'Lined', value: 'linear-gradient(#000 1px, transparent 1px)' },
    { id: 'plain', label: 'Plain', value: 'none' },
    { id: 'floral', label: 'Floral', value: 'url("/svg/flower1.svg")' },
    { id: 'forest', label: 'Forest', value: 'url("/svg/tree1.svg")' },
    { id: 'snowman', label: 'Snowman', value: 'url("/svg/snowman1.svg")' },
    { id: 'giraffe', label: 'Giraffe', value: 'url("/svg/giraffe1.svg")' },
  ];

  const COLOR_OPTIONS = [
      { id: 'white', value: '#FFFDF5', label: 'Cream' },
      { id: 'pink', value: '#FDF2F8', label: 'Pink' },
      { id: 'lavender', value: '#F3E8FF', label: 'Lavender' },
      { id: 'blue', value: '#EFF6FF', label: 'Blue' },
      { id: 'ice', value: '#E0F2FE', label: 'Ice' },
      { id: 'yellow', value: '#FEFCE8', label: 'Yellow' },
      { id: 'peach', value: '#FFEDD5', label: 'Peach' },
      { id: 'green', value: '#F0FDF4', label: 'Green' },
      { id: 'mint', value: '#D1FAE5', label: 'Mint' },
  ];

  const SOUND_OPTIONS = [
      { id: 'none', label: 'Silent', src: null },
      { id: 'page-flip', label: 'Paper Snap', src: '/sounds/page-flip.m4a' },
  ];

  const ANIM_OPTIONS = [
    { id: 'default', label: 'Classic Flip', icon: '📖' },
    { id: 'slide', label: 'Card Slide', icon: '🃏' },
    { id: 'binder', label: 'Ring Binder', icon: '📒' },
  ];

  const addPagePair = () => {
    const newId1 = `p${pages.length + 1}`;
    const newId2 = `p${pages.length + 2}`;
    setPages([
      ...pages,
      { id: newId1, type: 'empty', content: null },
      { id: newId2, type: 'empty', content: null },
    ]);
  };

  const updatePage = (pageId, type, content) => {
      setPages(prev => prev.map(p => 
          p.id === pageId ? { ...p, type, content } : p
      ));
  };

  const removePagePair = (index) => {
      // Index refers to the spread index (0 for pages 1-2, 1 for 3-4, etc.)
      const newPages = [...pages];
      newPages.splice(index * 2, 2);
      setPages(newPages);
  };

  const handleShare = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/scrapbook/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages, bgPattern, bgColor }),
      });
      const data = await res.json();
      if (data.success) {
        setShareUrl(`${window.location.origin}/scrapbook/${data.shareId}`);
      } else {
        alert('Failed to save scrapbook. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Share Modal */}
      {shareUrl && (
        <div className="absolute inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
           <div className="bg-white p-8 rounded-lg max-w-md w-full border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
              <h2 className="text-2xl font-black uppercase mb-4 text-center">Scrapbook Ready!</h2>
              <p className="mb-6 text-gray-600 text-center">Your digital scrapbook has been saved. Share this link with your lucky recipient!</p>
              
              <div className="flex gap-2">
                 <input 
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="flex-1 border-2 border-black p-2 font-mono text-sm bg-gray-50 rounded"
                 />
                 <button 
                    onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        alert('Link copied!');
                    }}
                    className="bg-[#A3E635] text-black border-2 border-black px-4 font-bold uppercase hover:bg-green-400"
                 >
                    Copy
                 </button>
              </div>

              <button 
                  onClick={() => setShareUrl(null)}
                  className="mt-6 w-full py-3 bg-black text-white font-bold uppercase hover:bg-gray-800"
              >
                  Close
              </button>
           </div>
        </div>
      )}

      {/* Header */}
      <header className="px-3 py-3 md:px-6 md:py-4 bg-white border-b-4 border-black flex justify-between items-center z-20 sticky top-0">
        <div className="flex items-center shrink-0">
             <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                <div className="bg-black text-white p-1.5 md:p-2 border-2 border-black group-hover:bg-[#A3E635] group-hover:text-black transition-colors">
                     <Book className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:underline decoration-4 underline-offset-4">
                    Scrapbook.
                </h1>
             </Link>
        </div>
        <div className="flex gap-2 md:gap-4 shrink-0">
             {isPreview && (
                 <button 
                    onClick={() => setIsPreview(false)}
                    className="flex items-center gap-2 bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-bold uppercase hover:bg-gray-800 transition-colors"
                 >
                    <span className="hidden sm:inline">Back to </span>Edit
                 </button>
             )}
             
            {!isPreview && (
                 <button 
                    onClick={() => openDrawer('THEME', { bgPattern, bgColor, soundId }, () => {}, 'Page Theme')}
                    className="flex items-center gap-2 border-2 border-black bg-white text-black px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-bold uppercase hover:bg-gray-50 transition-colors"
                 >
                    <Palette className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Theme</span>
                 </button>
            )}

            <button 
                onClick={() => {
                    if (isPreview) {
                        handleShare();
                    } else {
                        setIsPreview(true);
                    }
                }}
                disabled={isSaving}
                className={`border-2 border-black px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-bold uppercase shadow-[2px_2px_0px_0px_black] md:shadow-[4px_4px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] md:hover:shadow-[2px_2px_0px_0px_black] md:hover:translate-x-[2px] md:hover:translate-y-[2px] transition-all disabled:opacity-50 ${isPreview ? 'bg-white text-black' : 'bg-[#A3E635] text-black'}`}
            >
                {isSaving ? 'Saving...' : (isPreview ? 'Share Link' : 'Preview')}
            </button>
        </div>
      </header>
    
      {/* Background Toolbar */}


      {/* Main Workspace */}
      <main className={`flex-1 overflow-auto relative flex flex-col items-center py-10 transition-colors duration-500 ${isPreview ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}>
          
          <div className={`${isPreview ? 'scale-90' : ''} transition-transform duration-500`}>
              {isPreview ? (
                <BookPreview pages={pages} bgPattern={bgPattern} bgColor={bgColor} soundId={soundId} animId={animId} />
              ) : (
                <BookLayout 
                    pages={pages} 
                    onUpdatePage={updatePage} 
                    onRemovePair={removePagePair} 
                    readOnly={false} 
                    bgPattern={bgPattern} 
                    bgColor={bgColor}
                    onOpenDrawer={openDrawer}
                />
              )}
          </div>

          {/* GLOBAL DRAWER RENDERER */}
          {activeDrawer.type === 'COMPONENT' && (
              <ComponentSelector 
                  onSelect={(type) => {
                      activeDrawer.onAction(type);
                      closeDrawer();
                  }} 
                  onClose={closeDrawer} 
              />
          )}

          {activeDrawer.type === 'STYLE' && (
              <StyleEditorDrawer
                  title={activeDrawer.title}
                  categories={activeDrawer.data.categories}
                  currentStyle={activeDrawer.data.currentStyle}
                  onSelect={(styleId) => activeDrawer.onAction(styleId)}
                  onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'THEME' && (
              <BackgroundEditorDrawer
                   bgPattern={bgPattern}
                   setBgPattern={setBgPattern}
                   bgColor={bgColor}
                   setBgColor={setBgColor}
                   soundId={soundId}
                   setSoundId={setSoundId}
                   animId={animId}
                   setAnimId={setAnimId}
                   bgOptions={BG_OPTIONS}
                   colorOptions={COLOR_OPTIONS}
                   soundOptions={SOUND_OPTIONS}
                   animOptions={ANIM_OPTIONS}
                   onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'TEXT_STYLE' && (
              <TextStyleEditorDrawer
                  currentFontStyle={activeDrawer.data.currentFontStyle}
                  currentBgColor={activeDrawer.data.currentBgColor}
                  isCover={activeDrawer.data.isCover}
                  onFontChange={(fontStyleId) => activeDrawer.onAction.onFontChange(fontStyleId)}
                  onColorChange={(color) => activeDrawer.onAction.onColorChange(color)}
                  onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'COVER_STYLE' && (
              <CoverStyleEditorDrawer
                  currentFontStyle={activeDrawer.data.currentFontStyle}
                  currentOverlayColor={activeDrawer.data.currentOverlayColor}
                  currentOverlayOpacity={activeDrawer.data.currentOverlayOpacity}
                  currentTextColor={activeDrawer.data.currentTextColor}
                  onFontChange={(fontStyleId) => activeDrawer.onAction.onFontChange(fontStyleId)}
                  onOverlayChange={(color, opacity) => activeDrawer.onAction.onOverlayChange(color, opacity)}
                  onTextColorChange={(color) => activeDrawer.onAction.onTextColorChange?.(color)}
                  onClose={closeDrawer}
              />
          )}

          {/* Add Page Button */}
          {!isPreview && (
              <div className="mt-12 pb-20">
                <button 
                    onClick={addPagePair}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold uppercase border-4 border-white shadow-[0px_0px_0px_4px_black] hover:bg-[#A3E635] hover:text-black transition-colors"
                >
                    <Plus className="w-6 h-6" /> Add Page Pair
                </button>
              </div>
          )}
      </main>
    </div>
  );
}
