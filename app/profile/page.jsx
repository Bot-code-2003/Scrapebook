'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Plus, Loader2, ArrowLeft, Bookmark, Trash2, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import SupportButton from '@/components/SupportButton';
import { useRouter } from 'next/navigation';

// Book Card Component - looks like a physical book
function BookCard({ book, isSaved, onDelete }) {
  const coverImage = book.pages?.[0]?.content?.url;
  const bgColor = book.bgColor || '#FFFDF5';
  
  return (
    <Link 
      href={`/scrapbook/${book.shareId}`}
      className="group block relative"
    >
      {/* Book Container with 3D effect */}
      <div className="relative transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-1">
        {/* Book Spine */}
        <div 
          className="absolute left-0 top-1 bottom-1 w-4 bg-gray-300 rounded-l-sm transform -skew-y-2 origin-left shadow-inner"
          style={{ backgroundColor: bgColor, filter: 'brightness(0.8)' }}
        />
        
        {/* Book Pages (side view) */}
        <div className="absolute left-3 top-1 bottom-1 w-2 bg-white border-l border-gray-200 z-0 shadow-sm" />
        
        {/* Book Cover */}
        <div 
          className="relative ml-4 aspect-[3/4] rounded-r-lg rounded-bl-sm overflow-hidden border border-gray-200/50 shadow-md group-hover:shadow-xl transition-shadow bg-white z-10"
          style={{ backgroundColor: bgColor }}
        >
          {/* Cover Image or Pattern */}
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={book.title}
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50/50 p-4 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                 <Book className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          )}
          
          {/* Delete Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(book);
            }}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur rounded-full border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm z-20"
            title={isSaved ? "Remove from saved" : "Delete book"}
          >
            <Trash2 className="w-4 h-4" />
          </button>
           
          {/* Saved Badge */}
          {isSaved && (
            <div className="absolute top-2 left-2 bg-rose-400 text-white p-1.5 rounded-full shadow-sm z-20">
              <Bookmark className="w-3 h-3 fill-current" />
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
        </div>
      </div>
      
      {/* Book Info */}
      <div className="mt-5 ml-4 text-center">
        <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-rose-500 transition-colors">
          {book.title || 'Untitled Book'}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(book.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
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

  const handleDeleteBook = async (book) => {
    const isMyBook = activeTab === 'my';
    const message = isMyBook 
      ? 'Are you sure you want to delete this book? This action cannot be undone.' 
      : 'Are you sure you want to remove this book from your saved collection?';
      
    if (!confirm(message)) return;

    try {
      if (isMyBook) {
         const res = await fetch(`/api/scrapbook/${book.shareId}`, { method: 'DELETE' });
         const data = await res.json();
         if (data.success) {
            setMyBooks(prev => prev.filter(b => b._id !== book._id));
         } else {
             alert(data.message || 'Failed to delete book');
         }
      } else {
         const res = await fetch(`/api/scrapbook/save-to-library?shareId=${book.shareId}`, { method: 'DELETE' });
         const data = await res.json();
         if (data.success) {
            setSavedBooks(prev => prev.filter(b => b._id !== book._id));
         } else {
             alert(data.message || 'Failed to remove book');
         }
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-300" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const displayBooks = activeTab === 'my' ? myBooks : savedBooks;

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#FFFBF7]/80 backdrop-blur-md border-b border-gray-100/50 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:-translate-x-1 transition-all" />
          <span className="font-bold text-gray-700">back home</span>
        </Link>
        <div className="flex items-center gap-6">
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-gray-400 hover:text-rose-400 transition-colors"
            >
              sign out
            </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="relative mb-16">
             {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-amber-100/50 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
            
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-sm flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                     {user.image ? (
                        <div className="relative">
                            <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm text-rose-400">
                                <Heart className="w-4 h-4 fill-current" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-rose-50 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-rose-300">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    
                    <div>
                         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-2">hey, {user.name.split(' ')[0]}!</h1>
                         <p className="text-gray-500 font-medium">welcome to your little studio ✨</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                     <SupportButton />
                     <Link 
                        href="/scrapbook"
                        className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Book</span>
                    </Link>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex bg-white p-1.5 rounded-full border border-gray-100 shadow-sm">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'my' 
                  ? 'bg-rose-50 text-rose-500 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              My Books <span className="ml-1 opacity-60 text-xs">({myBooks.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'saved' 
                   ? 'bg-amber-50 text-amber-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Saved <span className="ml-1 opacity-60 text-xs">({savedBooks.length})</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="min-h-[300px]">
          {displayBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {activeTab === 'my' ? (
                <>
                  <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-gray-50 rotate-3">
                      <Book className="w-10 h-10 text-rose-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">it's a bit quiet here...</h3>
                  <p className="text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
                    your studio is waiting for its first story. why not make something cute today?
                  </p>
                  <Link 
                    href="/scrapbook"
                    className="text-rose-400 font-bold hover:text-rose-500 hover:underline flex items-center gap-1 group"
                  >
                    start creating <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </Link>
                </>
              ) : (
                <>
                   <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-gray-50 -rotate-3">
                      <Bookmark className="w-10 h-10 text-amber-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">no saved treasures yet</h3>
                  <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                    when friends send you a gift, click "save to library" to keep it safe here forever.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 px-4">
              {displayBooks.map((book) => (
                <BookCard 
                  key={book._id} 
                  book={book} 
                  isSaved={activeTab === 'saved'}
                  onDelete={handleDeleteBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
