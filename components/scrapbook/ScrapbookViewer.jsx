'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import BookPreview from './BookPreview';
import { Bookmark, X, Loader2, Check, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function ScrapbookViewer({ scrapbook }) {
  const { user, loading: authLoading } = useAuth();
  const [showCTA, setShowCTA] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [checkingIfSaved, setCheckingIfSaved] = useState(true);
  const [error, setError] = useState('');

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
