'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Book, Plus, Loader2, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MyBooksPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      fetchBooks();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/scrapbook/my-books');
      const data = await res.json();
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
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
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_black] max-w-md w-full text-center">
          <Book className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-black uppercase mb-2">My Books</h1>
          <p className="text-gray-600 mb-6">Please log in to view your saved scrapbooks.</p>
          <Link 
            href="/login"
            className="inline-block bg-[#A3E635] text-black px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

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
              <Book className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter">My Books</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">
            Hi, <strong>{user.name}</strong>
          </span>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-bold uppercase">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Create New Button */}
        <div className="mb-8">
          <Link 
            href="/scrapbook"
            className="inline-flex items-center gap-2 bg-[#A3E635] text-black px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Plus className="w-5 h-5" />
            Create New Scrapbook
          </Link>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-20">
            <Book className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-500 mb-2">No scrapbooks yet</h2>
            <p className="text-gray-400">Create your first scrapbook to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link 
                key={book._id} 
                href={`/scrapbook/${book.shareId}`}
                className="group bg-white border-4 border-black p-4 hover:shadow-[8px_8px_0px_0px_black] hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                {/* Preview Thumbnail */}
                <div 
                  className="aspect-[4/3] mb-4 border-2 border-gray-200 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: book.bgColor || '#FFFDF5' }}
                >
                  {book.pages[0]?.content?.url ? (
                    <img 
                      src={book.pages[0].content.url} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Book className="w-12 h-12 text-gray-300" />
                  )}
                </div>
                <h3 className="font-bold text-lg truncate group-hover:text-[#A3E635] transition-colors">
                  {book.title || 'Untitled Scrapbook'}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(book.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
