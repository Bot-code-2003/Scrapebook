'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import BookPreview from './BookPreview';
import { Bookmark, X, Loader2, Check, LogIn, Book, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ScrapbookViewer({ scrapbook }) {
  const { user, loading: authLoading } = useAuth();
  const [showCTA, setShowCTA] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [checkingIfSaved, setCheckingIfSaved] = useState(true);
  const [error, setError] = useState('');
  
  // Loading Stage Logic
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(1);

  useEffect(() => {
      const sequence = async () => {
          setLoadingStage(1); // "Finding your story..."
          await new Promise(r => setTimeout(r, 800));
          
          setLoadingStage(2); // "Unwrapping bindings..."
          await new Promise(r => setTimeout(r, 800));
          
          setLoadingStage(3); // "Adding magic dust..."
          await new Promise(r => setTimeout(r, 800));
          
          setIsLoading(false);
      };
      sequence();
  }, []);

  // Check if user has already saved this book
  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) {
        setCheckingIfSaved(false);
        return;
      }
      
      try {
        const res = await fetch(`/api/scrapbook/check-saved?shareId=${scrapbook.shareId}`);
        const data = await res.json();
        if (data.success && data.isSaved) {
          setSaved(true);
        }
      } catch (error) {
        console.error('Failed to check if saved:', error);
      } finally {
        setCheckingIfSaved(false);
      }
    };

    if (!authLoading) {
      checkIfSaved();
    }
  }, [user, authLoading, scrapbook.shareId]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setError('');
    
    try {
      const res = await fetch('/api/scrapbook/save-to-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shareId: scrapbook.shareId }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSaved(true);
        setShowCTA(false);
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-900 overflow-hidden relative">
      {/* Book Preview */}
      {/* Loading Animation Overlay */}
      {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900">
              <div className="flex flex-col items-center gap-8 max-w-sm w-full animate-in fade-in zoom-in duration-500">
                  
                  {/* Animated Icon */}
                  <div className="relative">
                      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                          {loadingStage === 1 && <Search className="w-10 h-10 text-lime-400 animate-bounce" />}
                          {loadingStage === 2 && <Book className="w-10 h-10 text-pink-400 animate-pulse" />}
                          {loadingStage === 3 && <Sparkles className="w-10 h-10 text-blue-400 animate-spin-slow" />}
                      </div>
                  </div>

                  {/* Steps List */}
                  <div className="w-full space-y-4">
                      {/* Step 1 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-all duration-500 ${loadingStage >= 1 ? 'bg-white/5 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${loadingStage > 1 ? 'bg-lime-400 border-lime-400 text-black' : (loadingStage === 1 ? 'border-lime-400 text-lime-400' : 'border-white/10 text-white/10')}`}>
                              {loadingStage > 1 ? <Check className="w-3 h-3" /> : '1'}
                          </div>
                          <span className={`font-bold ${loadingStage === 1 ? 'text-white' : 'text-white/50'}`}>Finding your story...</span>
                      </div>

                      {/* Step 2 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-all duration-500 delay-100 ${loadingStage >= 2 ? 'bg-white/5 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${loadingStage > 2 ? 'bg-pink-400 border-pink-400 text-black' : (loadingStage === 2 ? 'border-pink-400 text-pink-400' : 'border-white/10 text-white/10')}`}>
                              {loadingStage > 2 ? <Check className="w-3 h-3" /> : '2'}
                          </div>
                          <span className={`font-bold ${loadingStage === 2 ? 'text-white' : 'text-white/50'}`}>Unwrapping bindings...</span>
                      </div>

                      {/* Step 3 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-all duration-500 delay-200 ${loadingStage >= 3 ? 'bg-white/5 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${loadingStage > 3 ? 'bg-blue-400 border-blue-400 text-black' : (loadingStage === 3 ? 'border-blue-400 text-blue-400' : 'border-white/10 text-white/10')}`}>
                              {loadingStage > 3 ? <Check className="w-3 h-3" /> : '3'}
                          </div>
                          <span className={`font-bold ${loadingStage === 3 ? 'text-white' : 'text-white/50'}`}>Adding magic dust...</span>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Book Preview (Hidden during loading) */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full`}>
        <BookPreview 
            pages={scrapbook.pages} 
            bgPattern={scrapbook.bgPattern} 
            bgColor={scrapbook.bgColor}
            pageBorder={scrapbook.pageBorder}
            soundId={scrapbook.soundId}
            animId={scrapbook.animId}
            bookStyle={scrapbook.bookStyle}
            showControls={false}
        />
      </div>

      {/* Branding Link */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-40 flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 pr-5 pl-2 py-2 rounded-full hover:bg-white/10 transition-all group"
      >
        <div className="w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center shadow-lg shadow-lime-400/20 group-hover:scale-110 transition-transform">
            <Book className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none mb-0.5">Made With</span>
            <span className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors leading-none">MyScrapebook</span>
        </div>
      </Link>

      {/* Save CTA Button (bottom right) */}
      {!authLoading && !checkingIfSaved && !saved && (
        <button 
          onClick={() => setShowCTA(true)}
          className="fixed bottom-8 right-8 z-50 bg-white text-black px-6 py-3 font-bold rounded-full shadow-lg shadow-black/20 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2 group"
        >
          <Bookmark className="w-5 h-5 group-hover:fill-current" />
          <span className="hidden sm:inline">Save This Book</span>
        </button>
      )}

      {/* Saved Confirmation */}
      {saved && (
        <div className="fixed bottom-8 right-8 z-50 bg-lime-400 text-lime-900 px-6 py-3 font-bold rounded-full shadow-lg shadow-lime-900/20 flex items-center gap-2 animate-in slide-in-from-bottom duration-500">
          <Check className="w-5 h-5" />
          Saved to Library
        </div>
      )}

      {/* CTA Modal */}
      {showCTA && !saved && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white p-6 md:p-8 rounded-2xl max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowCTA(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              <div className="bg-lime-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border border-lime-100 shadow-sm">
                <Bookmark className="w-8 h-8 text-black" />
              </div>
              
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">
                {user ? 'Save to Your Library' : 'Want to Keep This?'}
              </h2>
              
              <p className="text-gray-500 mb-8 leading-relaxed">
                {user 
                  ? `Save "${scrapbook.title || 'Untitled'}" to your library so you can revisit it anytime.`
                  : 'Create a free account to save this scrapbook to your personal library and access it anytime!'
                }
              </p>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium">
                  {error}
                </div>
              )}

              {user ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-black text-white py-3.5 font-bold rounded-xl shadow-lg shadow-black/10 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : 'Save to My Library'}
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    href={`/signup?redirect=${encodeURIComponent(`/scrapbook/${scrapbook.shareId}`)}`}
                    className="w-full bg-lime-400 text-lime-950 py-3.5 font-bold rounded-xl shadow-lg shadow-lime-400/20 hover:bg-lime-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/scrapbook/${scrapbook.shareId}`)}`}
                    className="w-full bg-white text-gray-900 py-3.5 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    I Have an Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
