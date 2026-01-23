'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Book, Plus, ArrowRight, Scissors, User, X, Sparkles, Heart, Zap, Star, 
  Cake, Gift, Palette, FileText, Send, Scroll, PenTool, Paperclip, 
  Volume2, Ship, Plane, PartyPopper, MessageCircle, Type, Smartphone, Bookmark
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BookPreview from '@/components/scrapbook/BookPreview';
import { HOME_BOOK } from '@/app/constants/home-book';
import MidSection from '@/components/homepage/MidSection.jsx';

// Book Card Component - looks like a physical book
function BookCard({ book, onClick }) {
  const coverImage = book.pages?.[0]?.content?.url;
  const bgColor = book.bgColor || '#FFFDF5';
  
  return (
    <div 
      onClick={onClick}
      className="group block cursor-pointer select-none"
    >
      {/* Book Container with 3D effect */}
      <div className="relative transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-1">
        {/* Book Spine */}
        <div 
          className="absolute left-0 top-2 bottom-2 w-4 bg-gradient-to-r from-gray-400 to-gray-300 rounded-l-sm transform -skew-y-3 origin-left"
          style={{ backgroundColor: bgColor, filter: 'brightness(0.7)' }}
        />
        
        {/* Book Pages (side view) */}
        <div className="absolute left-2.5 top-1 bottom-1 w-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-r-xs z-0">
          <div className="h-full w-full flex flex-col justify-evenly py-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-px bg-gray-300" />
            ))}
          </div>
        </div>
        
        {/* Book Cover */}
        <div 
          className="relative ml-4 aspect-[3/4] rounded-r-md overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_black] group-hover:shadow-[12px_12px_0px_0px_black] transition-shadow w-[260px] md:w-[300px] z-10"
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
              <Book className="w-20 h-20 text-gray-300" />
            </div>
          )}
           
          {/* Binding/Crease effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </div>
      </div>
      
      {/* Book Info */}
      <div className="mt-8 ml-4 text-center">
        <h3 className="font-black text-2xl truncate group-hover:text-lime-600 transition-colors">
          {book.title || 'Untitled Scrapbook'}
        </h3>
        <p className="text-sm font-medium text-gray-400 mt-2">{book.pages?.length || 0} Pages • Custom Made</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [openedBookIndex, setOpenedBookIndex] = useState(null);

  return (
    <div className="min-h-screen text-black font-sans selection:text-black">
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "MyScrapbook",
            "applicationCategory": "DesignApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Create stunning aesthetic scrapbooks and cute digital albums with beautiful templates. Design personalized memory books, digital photo albums, and creative scrapbook gifts.",
            "operatingSystem": "Web Browser",
            "keywords": "cute digital album, aesthetic scrapbook, digital scrapbook maker, online scrapbook creator, digital memory book, virtual photo album, personalized digital gift",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "2400"
            },
            "featureList": [
              "3D Page Flipping Animation",
              "Customizable Templates",
              "Washi Tape Decorations",
              "Multiple Font Styles",
              "Image Upload",
              "Text Customization",
              "Share Links",
              "Mobile Responsive"
            ]
          })
        }}
      />
      
      {/* NAVBAR - REFINED */}
      <nav className="px-4 py-4 md:px-6 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 shadow-sm/50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 select-none group cursor-pointer">
          <div className="w-10 h-10 bg-lime-100 text-lime-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <Book className="w-6 h-6" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">MyScrapbook</span>
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
      <main className="relative overflow-hidden py-10">
        
        {/* Background Pattern - Softer */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-lime-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-[1600px] mx-auto px-4">
          
          {/* Top Badge */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-gray-200/50 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>The #1 Platform for Digital Albums & Scrapbooks</span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-10 relative z-10">
            
            {/* Flower Decoration Left */}
            <img 
                src="/svg/flower1.svg" 
                alt="" 
                className="absolute left-[10%] top-[20%] w-16 h-16 sm:w-24 sm:h-24 opacity-80 md:opacity-100 rotate-[-15deg] hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300" 
            />

             {/* Flower Decoration Right */}
             <img 
                src="/svg/flower1.svg" 
                alt="" 
                className="absolute right-[10%] top-[40%] w-12 h-12 sm:w-20 sm:h-20 opacity-60 md:opacity-100 rotate-[35deg] hidden lg:block animate-in fade-in zoom-in duration-1000 delay-500 scale-x-[-1]" 
            />

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 leading-[0.9] sm:leading-[0.9]">
              Not just a text.
              <br />
              <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  It's a digital gift.
                </span>
                <span className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-3 sm:h-6 bg-lime-300/60 -z-10 rounded-full transform -rotate-1 skew-x-6 mix-blend-multiply"></span>
              </span>
            </h1>

            {/* Subheadline */}
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-medium">
                Create a <span className="font-bold text-gray-800">cute digital album</span> and <span className="font-bold text-gray-800">aesthetic scrapbook</span> — one page at a time — and gift it as a stunning <span className="font-serif italic text-gray-500">interactive memory book.</span>
              </p>
            </div>

            {/* CTA Buttons - Clean & Centered */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20">
              <Link 
                href="/scrapbook"
                className="group relative inline-flex items-center gap-3 bg-black text-white rounded-full px-10 py-5 text-xl font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-black/20"
              >
                <span>Make a Book</span>
                <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>

  {/* Book Preview Container */}
  {/* Book Preview Container */}
          <div className="relative max-w-6xl mx-auto mt-8 perspective-1000 min-h-[500px] flex items-center justify-center">
              
              {/* Grid of Books - Always Visible */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full px-4">
                {HOME_BOOK.slice(0, 3).map((book, index) => (
                  <div key={index} className={`flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 ${index === 2 ? 'hidden md:flex' : ''}`} style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <BookCard 
                        book={book} 
                        onClick={() => setOpenedBookIndex(index)}
                      />
                    </div>
                    <p className="mt-6 text-gray-500 font-medium text-sm">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{['Travel', 'Music', 'Holiday'][index] || 'Scrapbook'}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Modal Overlay for Open Book */}
              {openedBookIndex !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setOpenedBookIndex(null)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center">
                        <button 
                            onClick={() => setOpenedBookIndex(null)}
                            className="absolute top-4 right-4 md:top-0 md:-right-12 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="w-full h-full flex items-center justify-center scale-75 md:scale-90 lg:scale-100 transition-transform">
                             <BookPreview 
                                pages={HOME_BOOK[openedBookIndex].pages}
                                bgPattern={HOME_BOOK[openedBookIndex].bgPattern}
                                bgColor={HOME_BOOK[openedBookIndex].bgColor}
                                pageBorder={HOME_BOOK[openedBookIndex].pageBorder}
                                animId={HOME_BOOK[openedBookIndex].animId}
                                bookStyle={HOME_BOOK[openedBookIndex].bookStyle}
                                soundId="page-flip"
                                defaultPage={0}
                                showControls={false}
                              />
                        </div>
                    </div>
                </div>
              )}
          </div>
        </div>
      </main>

      <MidSection />

      {/* CUSTOMIZATION - REFINED */}
      {/* CUSTOMIZATION - REFINED */}
      <section className="py-24 px-4 bg-stone-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
              Aesthetic Scrapbook Maker. <span className="text-gray-400 font-serif italic font-normal">Digital Album Creator.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              MyScrapbook combines the nostalgia of physical scrapbooking with the magic of modern design. Create cute digital albums with no glue required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* The Creator Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-[2rem] shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative p-10 h-full bg-white rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                    <PenTool className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You Create</h3>
                <p className="text-gray-500 mb-8 text-sm">The studio is yours. Everything is customizable.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full text-left">
                    {[
                        { title: "Paper Textures", desc: "Grainy, soft, or crumpled", icon: <Scroll className="w-5 h-5" /> },
                        { title: "Washi Tapes", desc: "Stick 'em on corners", icon: <Paperclip className="w-5 h-5" /> },
                        { title: "Fun Fonts", desc: "Handwritten styles", icon: <Type className="w-5 h-5" /> },
                        { title: "Stickers", desc: "Cute doodles & assets", icon: <Star className="w-5 h-5" /> }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl hover:bg-lime-50 transition-colors group/item">
                            <div className="text-gray-400 group-hover/item:text-lime-500 mb-2">{item.icon}</div>
                            <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* The Receiver Side */}
            <div className="relative group mt-8 md:mt-0">
               <div className="absolute inset-0 bg-zinc-900 rounded-[2rem] shadow-xl -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
               <div className="relative p-10 h-full bg-zinc-900 rounded-[2rem] border border-zinc-800 flex flex-col items-center text-center text-white">
                <div className="w-16 h-16 bg-pink-500 text-white rounded-2xl flex items-center justify-center mb-6 -rotate-3 shadow-lg shadow-pink-500/30">
                    <Heart className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">They Feel</h3>
                <p className="text-zinc-400 mb-8 text-sm">An immersive experience that feels real.</p>
                
                <div className="space-y-4 w-full">
                    {[
                        { text: "3D Page Flipping Animation", icon: <Book className="w-5 h-5" /> },
                        { text: "ASMR Paper Sounds", icon: <Volume2 className="w-5 h-5" /> },
                        { text: "Works on any Phone", icon: <Smartphone className="w-5 h-5" /> }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <div className="text-pink-400">{item.icon}</div>
                            <span className="font-medium text-zinc-200">{item.text}</span>
                        </div>
                    ))}
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON - REFINED */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">
              Why A Digital Album Beats A Text Message
            </h2>
            <p className="text-lg text-gray-500">Some memories are too precious for a blue bubble.</p>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-16 h-16 bg-black text-white rounded-full items-center justify-center font-black text-xl border-4 border-white shadow-xl">
              VS
            </div>

            {/* The Text Message Way */}
            <div className="p-8 md:p-12 rounded-3xl bg-gray-50 border border-gray-100 text-center opacity-80 hover:opacity-100 transition-opacity">
               <div className="w-16 h-16 mx-auto bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mb-6">
                 <MessageCircle className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-500 mb-8 uppercase tracking-widest">The Usual Way</h3>
               
               <ul className="space-y-6 text-left">
                 {[
                   { text: "Buried in the chat history forever", icon: "📉" },
                   { text: "Consumed in 3 seconds", icon: "⚡" },
                   { text: "Just another notification", icon: "🔔" },
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-gray-500 font-medium">
                     <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm grayscale">{item.icon}</span>
                     <span>{item.text}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* The MyScrapebook Way */}
            <div className="p-8 md:p-12 rounded-3xl bg-lime-50 border border-lime-100 text-center shadow-2xl scale-105 relative z-0">
               <div className="absolute top-0 right-0 p-4">
                  <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Better</span>
               </div>
               <div className="w-16 h-16 mx-auto bg-black text-lime-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20">
                 <Gift className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-widest">MyScrapbook</h3>
               
               <ul className="space-y-6 text-left">
                 {[
                   { text: "Saved to both your dashboards", icon: "💎" },
                   { text: "Interactive 3D unboxing", icon: "⏳" },
                   { text: "Forever accessible library", icon: "🎁" },
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-gray-900 font-bold">
                     <span className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-full text-sm">{item.icon}</span>
                     <span>{item.text}</span>
                   </li>
                 ))}
               </ul>
            </div>

          </div>
          
          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl font-serif text-gray-400 italic">
              "It’s not just a file. It’s a feeling."
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA - REFINED */}
      <section className="py-24 md:py-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            Create Your Cute Digital Album & Aesthetic Scrapbook Today.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12">
            Start with one page. End with a personalized memory book they'll cherish forever.
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
              2,400+ digital albums created this week
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
                <span className="text-xl font-bold tracking-tight text-gray-900">MyScrapbook</span>
              </div>
              <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
                Create beautiful aesthetic scrapbooks, cute digital albums, and personalized memory books. Transform your photos and memories into interactive gifts that last forever.
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
                <li><a href="mailto:hello@myscrapebook.com" className="hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs font-medium">
              © {new Date().getFullYear()} MYSCRAPEBOOK. ALL RIGHTS RESERVED.
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