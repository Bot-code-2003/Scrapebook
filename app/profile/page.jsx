'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Plus, Loader2, LogOut, ArrowLeft, Bookmark, User, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Book Card Component - looks like a physical book
function BookCard({ book, isSaved, onDelete }) {
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
          
          {/* Delete Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(book);
            }}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full border border-black hover:bg-red-50 hover:text-red-500 transition-colors z-10 opacity-0 group-hover:opacity-100"
            title={isSaved ? "Remove from saved" : "Delete book"}
          >
            <Trash2 className="w-3 h-3" />
          </button>

          {/* Saved Badge - Only show if saved AND NOT hovered (to avoid overlap with delete) OR position differently if needed. 
              Actually, let's put the delete button in top-right and saved badge in top-left? 
              Or just let the delete button replace the saved badge on hover?
              The saved badge is checking `isSaved`. 
              Let's keep saved badge but maybe move it or just let them coexist. 
              The current saved badge is top-right. 
              Let's move saved badge to top-left if we want to avoid conflict, or just stack them.
           */}
           
          {/* Saved Badge */}
          {isSaved && (
            <div className="absolute top-2 left-2 bg-[#FFD43B] p-1.5 rounded-full border border-black z-10">
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
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar similar to Homepage */}
      <nav className="px-4 py-4 md:px-8 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 select-none group cursor-pointer hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold tracking-tight">Back to Home</span>
        </Link>
        <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              Sign out
            </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Profile Header - Clean & Minimal */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-6">
                {user.image ? (
                    <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full border border-gray-200 object-cover" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-3xl font-bold text-gray-400">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-gray-900">{user.name}</h1>
                    <p className="text-gray-500 font-medium text-lg">{user.email}</p>
                </div>
            </div>
            
            <div className="flex gap-4">
                 <Link 
                  href="/scrapbook"
                  className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg hover:translate-y-[-2px]"
                >
                  <Plus className="w-5 h-5" />
                  New Book
                </Link>
            </div>
        </div>

        {/* Tabs - Underlined Style */}
        <div className="mb-10">
          <div className="flex gap-8 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('my')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === 'my' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              My Creations <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{myBooks.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === 'saved' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Saved Collection <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{savedBooks.length}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="min-h-[400px]">
          {displayBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
              {activeTab === 'my' ? (
                <>
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
                      <Book className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You haven't made any books yet.</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                    Your studio is empty! Start creating memories today, it only takes a few minutes.
                  </p>
                  <Link 
                    href="/scrapbook"
                    className="text-lime-600 font-bold hover:underline"
                  >
                    Start your first masterpiece →
                  </Link>
                </>
              ) : (
                <>
                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
                      <Bookmark className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No saved books found.</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    When friends send you a digital gift, click "Save to Library" to keep it here forever.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
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
