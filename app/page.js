'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Book, Plus, ArrowRight, Scissors, User, LogOut, Sparkles, Heart, Zap, Star, 
  Cake, Gift, Palette, FileText, Send, Scroll, PenTool, Paperclip, 
  Volume2, Ship, Plane, PartyPopper, MessageCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BookPreview from '@/components/scrapbook/BookPreview';
import { HOME_BOOK } from '@/app/constants/home-book';
import MidSection from '@/components/homepage/MidSection.jsx';

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="min-h-screen text-black font-sans selection:text-black">
      
      {/* NAVBAR - REFINED */}
      <nav className="px-4 py-4 md:px-6 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 shadow-sm/50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 select-none group cursor-pointer">
          <div className="w-10 h-10 bg-lime-100 text-lime-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <Book className="w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Scrapbook</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
            {!loading && (
              user ? (
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link 
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 font-medium hover:bg-gray-50 rounded-full transition-all text-sm text-gray-700"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )
            )}
            
            <Link 
                href="/scrapbook"
                className="bg-black text-white px-5 py-2.5 md:px-6 md:py-2.5 rounded-full font-bold hover:bg-gray-800 transition-all text-sm md:text-base whitespace-nowrap flex items-center gap-2 shadow-lg shadow-black/20 hover:shadow-xl hover:scale-105"
            >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create</span>
                <span className="sm:hidden">New</span>
            </Link>
        </div>
      </nav>

      {/* HERO SECTION - REFINED */}
      <main className="relative overflow-hidden">
        {/* Background Pattern - Softer */}
        
        <div className="relative max-w-[1600px] mx-auto px-4 py-10">
          
          {/* Top Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 border border-black/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>The most meaningful way to send a message</span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-16 md:mb-20">
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
              Not just a text.
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-black">
                  It's a digital gift.
                </span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-200 -z-10 rounded-sm transform -rotate-1"></span>
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-xl text-gray-600 leading-relaxed">
                Create a digital scrapbook — one page at a time — and send it as a meaningful flipping book. No sign up needed to start.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/scrapbook"
                className="group relative inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105"
              >
                <span>Create a Book</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Takes 5 mins • Free forever</span>
              </div>
            </div>

            {/* Trust Pills - Simplified */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
              {[
                "No Account Required",
                "Share with a Link",
                "Interactive 3D Flip"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Preview Container */}
          {/* <div className="relative max-w-5xl mx-auto"> */}
            {/* <div className="relative rounded-2xl shadow-xl border border-gray-100 p-4 md:p-8"> */}
              {/* <div className="relative w-full aspect-[16/10] max-h-[700px]">
                <div className="absolute inset-0 flex items-center justify-center scale-[0.85] md:scale-100"> */}
                  <BookPreview 
                    pages={HOME_BOOK.pages}
                    bgPattern={HOME_BOOK.bgPattern}
                    bgColor={HOME_BOOK.bgColor}
                    pageBorder={HOME_BOOK.pageBorder}
                    animId={HOME_BOOK.animId}
                    bookStyle={HOME_BOOK.bookStyle}
                    soundId="page-flip"
                    defaultPage={1}
                  />
                {/* </div>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>
      </main>

      <MidSection />

      {/* CUSTOMIZATION - REFINED */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Handmade Feel, Digital Ease
            </h2>
            <p className="text-lg text-gray-500">Every detail is designed to feel personal.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Controls */}
            <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black text-lime-400 rounded-xl flex items-center justify-center font-bold text-lg">
                  YOU
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What You Control</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { icon: <Palette className="w-6 h-6" />, text: "Page templates & patterns" },
                  { icon: <Scroll className="w-6 h-6" />, text: "Paper textures & feel" },
                  { icon: <PenTool className="w-6 h-6" />, text: "Handwritten fonts & vibes" },
                  { icon: <Paperclip className="w-6 h-6" />, text: "Washi tapes & stickers" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-gray-700">
                    <span className="p-2 rounded-lg shadow-sm text-black">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Experience */}
            <div className="p-10 bg-pink-50 rounded-3xl border border-pink-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  THEM
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What They Feel</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { icon: <Book className="w-6 h-6" />, text: "Real 3D page-flip animation" },
                  { icon: <Volume2 className="w-6 h-6" />, text: "Real page flip sounds" },
                  { icon: <Book className="w-6 h-6" />, text: "The feeling of a real book" },
                  { icon: <Heart className="w-6 h-6" />, text: "Pure emotional impact" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-gray-800">
                    <span className="p-2 rounded-lg shadow-sm text-pink-500">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE MOMENT - REFINED */}
      <section className="py-24 md:py-32 px-4 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
        }}></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-200 to-lime-400 mb-8 tracking-tight">
            They Don't Scroll It.
            <br />
            They Open It.
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base font-medium text-white/80">
            {[
              "Opens Like Real Book",
              "Click → Flip → Smile",
              "No App Required"
            ].map((text, i) => (
              <div key={i} className="bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <blockquote className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-md max-w-3xl mx-auto">
            <p className="text-xl md:text-3xl font-serif leading-relaxed mb-6 italic text-gray-100">
              "I didn't expect to feel this emotional from a website. It felt like holding a real gift."
            </p>
            <footer className="text-sm font-bold uppercase tracking-widest text-lime-400/80">
              — Early User
            </footer>
          </blockquote>
        </div>
      </section>

      {/* EXAMPLE BOOKS - REFINED */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Real Books. Real People.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: <Ship className="w-12 h-12 text-gray-800" />, title: "My One Piece Journey", bg: "bg-gray-50 from-gray-50 to-gray-100" },
              { icon: <MessageCircle className="w-12 h-12 text-pink-500" />, title: "Pages I Never Said Out Loud", bg: "bg-pink-50 from-pink-50 to-pink-100" },
              { icon: <Plane className="w-12 h-12 text-blue-500" />, title: "Our First Trip Together", bg: "bg-blue-50 from-blue-50 to-blue-100" },
              { icon: <PartyPopper className="w-12 h-12 text-yellow-500" />, title: "You're 22 Today", bg: "bg-yellow-50 from-yellow-50 to-yellow-100" }
            ].map((book, i) => (
              <div key={i} className={`rounded-xl p-8 bg-gradient-to-br ${book.bg} flex flex-col items-center justify-center text-center h-64 hover:scale-105 transition-transform cursor-pointer border border-transparent hover:border-black/5 shadow-sm`}>
                <div className="mb-6 p-4 rounded-full shadow-sm">{book.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{book.title}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/scrapbook"
              className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-black/20"
            >
              <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
              <span>Create Your Book</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON - REFINED */}
      <section className="py-20 md:py-32 px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Why This Beats A Text Message
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-sm md:text-base">
            <div className="grid grid-cols-2 font-bold tracking-wider text-center border-b border-gray-100">
              <div className="p-4 bg-gray-50 text-gray-400 uppercase text-xs md:text-sm">WhatsApp / IG</div>
              <div className="p-4 bg-lime-50 text-lime-600 uppercase text-xs md:text-sm">Your Scrapbook</div>
            </div>
            
            {[
              { bad: "Lost in chat history", good: "A dedicated permanent book" },
              { bad: "Skipped in seconds", good: "Slowly flipped & savored" },
              { bad: "Temporary feeling", good: "Forever accessible" },
              { bad: "Generic format", good: "Deeply personal layout" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-gray-100 last:border-b-0">
                <div className="p-6 md:p-8 bg-gray-50/50 text-gray-400 flex items-center justify-center md:justify-start">
                  <span className="md:mr-3 text-lg md:text-xl">✕</span>
                  <span className="hidden md:inline">{row.bad}</span>
                  <span className="md:hidden text-center text-xs">{row.bad}</span>
                </div>
                <div className="p-6 md:p-8 text-gray-900 font-medium flex items-center justify-center md:justify-start">
                  <span className="md:mr-3 text-lg md:text-xl text-lime-500">✓</span>
                  <span className="hidden md:inline">{row.good}</span>
                  <span className="md:hidden text-center text-xs">{row.good}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg md:text-xl font-medium text-gray-500 italic">
              Some memories deserve more.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA - REFINED */}
      <section className="py-24 md:py-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            Make Something They'll Never Delete.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12">
            Start with one page. End with a book they'll remember forever.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Link 
              href="/scrapbook"
              className="group inline-flex items-center gap-3 bg-lime-400 text-black rounded-full px-10 py-5 text-xl font-bold shadow-lg shadow-lime-200 hover:scale-105 transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-2 font-medium text-sm text-gray-500">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              2,400+ books created this week
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - REFINED */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-lime-100 text-lime-600 flex items-center justify-center rounded-lg">
                  <Book className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">Scrapbook</span>
              </div>
              <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
                Turning digital gifts into physical emotions. The world's first digital wrapping service for the things that matter.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><Link href="/scrapbook" className="hover:text-black transition-colors">Create Book</Link></li>
                <li><Link href="/templates" className="hover:text-black transition-colors">Templates</Link></li>
                <li><Link href="/showcase" className="hover:text-black transition-colors">Showcase</Link></li>
                <li><Link href="/pricing" className="hover:text-black transition-colors">Pricing (Free)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Connect</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><a href="#" className="hover:text-black transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                <li><a href="mailto:hello@wrapper.com" className="hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs font-medium">
              © {new Date().getFullYear()} WRAPPER CO. NO RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 text-gray-400 text-xs font-medium">
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY "FEEDBACK" BUTTON */}
      <button className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full px-5 py-2.5 font-bold text-xs shadow-lg hover:bg-gray-800 transition-all hidden md:flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Give Feedback
      </button>
    </div>
  );
}