'use client';
import React, { useState } from 'react';
import { Plus, Book, Sparkles } from 'lucide-react';
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
  const [pageBorder, setPageBorder] = useState('none'); // options: none, solid, dashed, dotted, doodle, cute-heart, cute-star
  const [soundId, setSoundId] = useState('page-flip'); // options: none, page-flip
  const [title, setTitle] = useState('My Scrapbook');

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

  const BORDER_OPTIONS = [
      { id: 'none', label: 'None', preview: 'border-0' },
      { id: 'solid', label: 'Single', preview: 'border-2 border-black' },
      { id: 'double', label: 'Double', preview: 'border-4 border-double border-black' },
      { id: 'dashed', label: 'Dashed', preview: 'border-2 border-dashed border-black' },
      { id: 'dotted', label: 'Dotted', preview: 'border-2 border-dotted border-black' },
      { id: 'doodle', label: 'Doodle', preview: 'border-2 border-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px]' },
      { id: 'cute-flower', label: 'Flowers', preview: 'border-[6px] border-pink-300 border-dashed' },
      { id: 'cute-rainbow', label: 'Rainbow', preview: 'border-[4px] border-transparent bg-clip-border' },
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
        body: JSON.stringify({ pages, bgPattern, bgColor, pageBorder, title, soundId }),
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
    <div className="h-screen flex flex-col overflow-hidden relative bg-gray-50 selection:bg-lime-100 selection:text-lime-900">
      {/* Share Modal */}
      {shareUrl && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 transform transition-all scale-100">
              <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Scrapbook Ready!</h2>
              <p className="mb-8 text-gray-500 text-center leading-relaxed">Your digital scrapbook has been saved. Share this link with your lucky recipient!</p>
              
              <div className="flex gap-2 mb-6">
                 <input 
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="flex-1 border border-gray-200 p-3 rounded-xl font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
                 />
                 <button 
                    onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        alert('Link copied!');
                    }}
                    className="bg-lime-400 text-black px-5 font-bold rounded-xl hover:bg-lime-500 transition-colors shadow-sm"
                 >
                    Copy
                 </button>
              </div>

              <button 
                  onClick={() => setShareUrl(null)}
                  className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
              >
                  Close
              </button>
           </div>
        </div>
      )}

      {/* Header */}
      <header className="px-4 py-4 md:px-6 flex justify-between items-center sticky top-0 z-50 bg-white/80 border-b border-gray-100 shadow-sm/50 backdrop-blur-md">
        <div className="flex items-center shrink-0">
             <Link href="/" className="flex items-center gap-2 select-none group cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-lime-100 text-lime-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                     <Book className="w-6 h-6" />
                </div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">Scrapbook.</span>
             </Link>
        </div>
        <div className="flex gap-2 md:gap-3 shrink-0">
             {isPreview && (
                 <button 
                    onClick={() => setIsPreview(false)}
                    className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all"
                 >
                    <span className="hidden sm:inline">Back to </span>Edit
                 </button>
             )}
             
            {!isPreview && (
                 <button 
                    onClick={() => openDrawer('THEME', { bgPattern, bgColor, soundId }, () => {}, 'Page Theme')}
                    className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all hover:shadow-sm"
                 >
                    <Palette className="w-4 h-4" />
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
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-lime-500/20 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                  isPreview 
                    ? 'bg-lime-400 text-black hover:bg-lime-500' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
                {isSaving ? 'Saving...' : (isPreview ? 'Share Link' : 'Preview')}
            </button>
        </div>
      </header>
    
      {/* Background Toolbar */}


      {/* Main Workspace */}
      <main className={`flex-1 overflow-auto relative flex flex-col items-center py-12 transition-colors duration-500 ${isPreview ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
          
          
          {/* Title Input */}
          {!isPreview && (
            <div className="mb-8 w-full max-w-md flex flex-col items-center z-10 relative px-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-center text-2xl md:text-3xl font-bold tracking-tight bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-900 focus:outline-none placeholder-gray-300 w-full pb-2 text-gray-900 transition-all"
                    placeholder="Untitled Scrapbook"
                />
            </div>
          )}

          <div className={`${isPreview ? 'scale-90' : ''} transition-transform duration-500`}>
              {isPreview ? (
                <BookPreview pages={pages} bgPattern={bgPattern} bgColor={bgColor} pageBorder={pageBorder} soundId={soundId} animId={animId} />
              ) : (
                <BookLayout 
                    pages={pages} 
                    onUpdatePage={updatePage} 
                    onRemovePair={removePagePair} 
                    readOnly={false} 
                    bgPattern={bgPattern} 
                    bgColor={bgColor}
                    pageBorder={pageBorder}
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
                   pageBorder={pageBorder}
                   setPageBorder={setPageBorder}
                   soundId={soundId}
                   setSoundId={setSoundId}
                   animId={animId}
                   setAnimId={setAnimId}
                   bgOptions={BG_OPTIONS}
                   colorOptions={COLOR_OPTIONS}
                   borderOptions={BORDER_OPTIONS}
                   soundOptions={SOUND_OPTIONS}
                   animOptions={ANIM_OPTIONS}
                   onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'TEXT_STYLE' && (
              <TextStyleEditorDrawer
                  currentFontStyle={activeDrawer.data.currentFontStyle}
                  currentBgColor={activeDrawer.data.currentBgColor}
                  currentTextColor={activeDrawer.data.currentTextColor}
                  isCover={activeDrawer.data.isCover}
                  onFontChange={(fontStyleId) => activeDrawer.onAction.onFontChange(fontStyleId)}
                  onColorChange={(color) => activeDrawer.onAction.onColorChange(color)}
                  onTextColorChange={(color) => activeDrawer.onAction.onTextColorChange?.(color)}
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
              <div className="mt-12 pb-24">
                <button 
                    onClick={addPagePair}
                    className="group flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-gray-100"
                >
                    <div className="w-6 h-6 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center group-hover:bg-lime-200 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span>Add Pages</span>
                </button>
              </div>
          )}
      </main>
    </div>
  );
}
