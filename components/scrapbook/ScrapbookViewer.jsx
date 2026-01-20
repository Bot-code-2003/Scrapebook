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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#222] overflow-hidden relative">
      {/* Book Preview */}
      <BookPreview 
        pages={scrapbook.pages} 
        bgPattern={scrapbook.bgPattern} 
        bgColor={scrapbook.bgColor}
        animId={scrapbook.animId}
        bookStyle={scrapbook.bookStyle}
      />

      {/* Save CTA Button (bottom right) */}
      {!authLoading && !checkingIfSaved && !saved && (
        <button 
          onClick={() => setShowCTA(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-black px-4 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
        >
          <Bookmark className="w-5 h-5" />
          <span className="hidden sm:inline">Save This Book</span>
        </button>
      )}

      {/* Saved Confirmation */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#A3E635] text-black px-4 py-3 font-bold uppercase border-2 border-black flex items-center gap-2">
          <Check className="w-5 h-5" />
          Saved to Library!
        </div>
      )}

      {/* CTA Modal */}
      {showCTA && !saved && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-6 md:p-8 rounded-lg max-w-md w-full border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] relative">
            <button 
              onClick={() => setShowCTA(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="bg-[#A3E635] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
                <Bookmark className="w-8 h-8 text-black" />
              </div>
              
              <h2 className="text-2xl font-black uppercase mb-2">
                {user ? 'Save to Your Library' : 'Want to Keep This?'}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {user 
                  ? `Save "${scrapbook.title}" to your library so you can revisit it anytime.`
                  : 'Create a free account to save this scrapbook to your personal library and access it anytime!'
                }
              </p>

              {error && (
                <div className="bg-red-50 border-2 border-red-500 text-red-600 p-3 mb-4 font-medium text-sm">
                  {error}
                </div>
              )}

              {user ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-[#A3E635] text-black py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : 'Save to My Library'}
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    href={`/signup?redirect=${encodeURIComponent(`/scrapbook/${scrapbook.shareId}`)}`}
                    className="w-full bg-[#A3E635] text-black py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/scrapbook/${scrapbook.shareId}`)}`}
                    className="w-full bg-white text-black py-3 font-bold uppercase border-2 border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
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
