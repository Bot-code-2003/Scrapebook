'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Plus, Loader2, LogOut, ArrowLeft, Bookmark, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Book Card Component - looks like a physical book
function BookCard({ book, isSaved }) {
  const coverImage = book.pages?.[0]?.content?.url;
  const bgColor = book.bgColor || '#FFFDF5';
  
  return (
    <Link 
      href={`/scrapbook/${book.shareId}`}
      className="group block"
    >
      {/* Book Container with 3D effect */}
      <div className="relative transition-all duration-300 group-hover:-translate-y-2">
        {/* Book Spine */}
        <div 
          className="absolute left-0 top-2 bottom-2 w-3 bg-gradient-to-r from-gray-400 to-gray-300 rounded-l-sm transform -skew-y-3 origin-left"
          style={{ backgroundColor: bgColor, filter: 'brightness(0.7)' }}
        />
        
        {/* Book Pages (side view) */}
        <div className="absolute left-2 top-1 bottom-1 w-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-r-xs">
          <div className="h-full w-full flex flex-col justify-evenly py-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-px bg-gray-300" />
            ))}
          </div>
        </div>
        
        {/* Book Cover */}
        <div 
          className="relative ml-3 aspect-[3/4] rounded-r-md overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_black] group-hover:shadow-[6px_6px_0px_0px_black] transition-shadow"
          style={{ backgroundColor: bgColor }}
        >
          {/* Cover Image or Pattern */}
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Book className="w-12 h-12 text-gray-300" />
            </div>
          )}
          
          {/* Saved Badge */}
          {isSaved && (
            <div className="absolute top-2 right-2 bg-[#FFD43B] p-1.5 rounded-full border border-black">
              <Bookmark className="w-3 h-3" />
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
      </div>
      
      {/* Book Info */}
      <div className="mt-4 ml-3">
        <h3 className="font-bold text-sm truncate group-hover:text-[#A3E635] transition-colors">
          {book.title || 'Untitled Scrapbook'}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(book.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [myBooks, setMyBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my'); // 'my' or 'saved'

  useEffect(() => {
    if (!authLoading && user) {
      fetchBooks();
    } else if (!authLoading && !user) {
      router.push('/login?redirect=/profile');
    }
  }, [user, authLoading, router]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/user/books');
      const data = await res.json();
      if (data.success) {
        setMyBooks(data.myBooks || []);
        setSavedBooks(data.savedBooks || []);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const displayBooks = activeTab === 'my' ? myBooks : savedBooks;

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Header */}
      <header className="px-4 py-4 md:px-6 bg-white border-b-4 border-black flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 border-2 border-black">
              <User className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter">Profile</h1>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors border-2 border-transparent hover:border-black px-3 py-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-bold uppercase">Logout</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* User Info Card */}
        <div className="bg-white border-4 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_black]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#A3E635] rounded-full flex items-center justify-center text-2xl font-black border-2 border-black">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="flex gap-6 mt-6 pt-6 border-t-2 border-gray-100">
            <div className="text-center">
              <span className="text-3xl font-black">{myBooks.length}</span>
              <p className="text-sm text-gray-500 font-bold uppercase">Created</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-black">{savedBooks.length}</span>
              <p className="text-sm text-gray-500 font-bold uppercase">Saved</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 font-bold uppercase border-2 border-black transition-all ${
              activeTab === 'my' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            <Book className="w-4 h-4 inline mr-2" />
            My Books ({myBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-3 font-bold uppercase border-2 border-black transition-all ${
              activeTab === 'saved' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            <Bookmark className="w-4 h-4 inline mr-2" />
            Saved ({savedBooks.length})
          </button>
        </div>

        {/* Create New Button (only for My Books tab) */}
        {activeTab === 'my' && (
          <div className="mb-8">
            <Link 
              href="/scrapbook"
              className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Plus className="w-5 h-5" />
              Create New Scrapbook
            </Link>
          </div>
        )}

        {/* Books Grid */}
        {displayBooks.length === 0 ? (
          <div className="text-center py-20 bg-white border-4 border-dashed border-gray-300">
            {activeTab === 'my' ? (
              <>
                <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-bold text-gray-500 mb-2">No scrapbooks yet</h2>
                <p className="text-gray-400 mb-6">Create your first scrapbook to get started!</p>
                <Link 
                  href="/scrapbook"
                  className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Create Scrapbook
                </Link>
              </>
            ) : (
              <>
                <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-bold text-gray-500 mb-2">No saved books</h2>
                <p className="text-gray-400">When you save scrapbooks shared with you, they'll appear here.</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayBooks.map((book) => (
              <BookCard 
                key={book._id} 
                book={book} 
                isSaved={activeTab === 'saved'}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
