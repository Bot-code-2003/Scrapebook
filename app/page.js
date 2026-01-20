'use client';
import React from 'react';
import Link from 'next/link';
import { Book, Plus, ArrowRight, Scissors, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans selection:bg-black selection:text-[#A3E635]">
      
      {/* NAVBAR */}
      <nav className="border-b-4 border-black px-4 py-3 md:px-6 md:py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2 select-none group cursor-pointer">
          <Book className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">Scrapbook.</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
            {/* User Profile */}
            {!loading && (
              user ? (
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 border-2 border-black px-3 py-2 font-bold hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-[#A3E635] rounded-full flex items-center justify-center text-xs font-black border border-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm uppercase">{user.name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="flex items-center gap-2 border-2 border-black px-3 py-2 font-bold hover:bg-gray-50 transition-colors text-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline uppercase">Log In</span>
                </Link>
              )
            )}
            
            <Link 
                href="/scrapbook"
                className="bg-[#A3E635] text-black border-2 border-black px-4 py-2 md:px-6 font-black uppercase shadow-[2px_2px_0px_0px_black] md:shadow-[4px_4px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] md:hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] md:hover:translate-x-[2px] md:hover:translate-y-[2px] transition-all text-xs md:text-base whitespace-nowrap"
            >
                <span className="hidden sm:inline">Start </span>Create
            </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center">
          
          <div className="mb-6 inline-block bg-[#FFD43B] border-2 border-black px-4 py-1 font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_black] rotate-[-2deg]">
             No Design Skills Needed
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            YOUR MEMORIES <br/>
            <span className="text-white bg-black px-2 decoration-4 underline-offset-8">UNFILTERED.</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-gray-600 max-w-2xl mb-12">
            The simplest way to build a digital scrapbook. 
            One page, one thought. <span className="underline decoration-wavy decoration-[#FF6B6B]">Strictly simple.</span>
          </p>

          <Link 
            href="/scrapbook"
            className="group relative inline-flex items-center gap-4 bg-white text-black border-4 border-black px-12 py-6 text-2xl font-black shadow-[12px_12px_0px_0px_#A3E635] hover:shadow-[6px_6px_0px_0px_#A3E635] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
          >
            <span>CREATE SCRAPBOOK</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>

          {/* Feature Showcase */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
              <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black]">
                  <div className="bg-[#FF6B6B] w-12 h-12 border-2 border-black flex items-center justify-center mb-4">
                      <Scissors className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2">Simplicity First</h3>
                  <p className="font-medium text-gray-600">One component per page. No clutter, no chaos. Just your content.</p>
              </div>
              <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black]">
                  <div className="bg-[#A3E635] w-12 h-12 border-2 border-black flex items-center justify-center mb-4">
                      <Book className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2">Book Layout</h3>
                  <p className="font-medium text-gray-600">View your memories as spreads. Flip through moments side-by-side.</p>
              </div>
              <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black]">
                  <div className="bg-[#FFD43B] w-12 h-12 border-2 border-black flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2">Zero Friction</h3>
                  <p className="font-medium text-gray-600">Just click plus. Choose Image or Text. Done. It's that easy.</p>
              </div>
          </div>

      </main>

      <footer className="py-10 text-center font-bold text-gray-400 border-t-4 border-black mt-20 bg-white">
          <p>© {new Date().getFullYear()} SCRAPBOOK BUILDER. KEEP IT SIMPLE.</p>
      </footer>
    </div>
  );
}