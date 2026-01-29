'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Heart, Sparkles, User, Coffee, 
  Camera, PenLine, Palette, Volume2, BookOpen, Link2,
  Cake, Gift, Globe, MessageCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Avatar gifs for random selection
const AVATAR_GIFS = [
  'https://media1.tenor.com/m/EvV2yv9uuhEAAAAC/luffy-luffing.gif',
  'https://media1.tenor.com/m/l54b4QxkuRUAAAAC/luffy-luffy-one-piece.gif',
  'https://media1.tenor.com/m/6OJbJR-mRTsAAAAC/bleach-watching.gif',
  'https://media.tenor.com/KUXIWC9D5_UAAAAi/my-hero-academia-boku-no-hero-academia.gif',
  'https://media1.tenor.com/m/sVZ7b5BkkJAAAAAC/gojo-satoru-yakana.gif',
];

export default function Home() {
  const { user, loading } = useAuth();
  
  // Pick a random avatar on each page load
  const randomAvatar = useMemo(() => {
    return AVATAR_GIFS[Math.floor(Math.random() * AVATAR_GIFS.length)];
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100">
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "myscrapbook",
                "url": "https://myscrapbook.thestorybits.com",
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Create adorable, aesthetic digital scrapbooks with interactive features. The cutest way to make personalized gifts for birthdays, anniversaries, and long-distance relationships.",
                "featureList": [
                  "Interactive scratch cards",
                  "Secret envelope reveals",
                  "Polaroid photo galleries",
                  "3D page flip animation",
                  "Cute kawaii themes",
                  "Easy sharing via link"
                ],
                "screenshot": "https://myscrapbook.thestorybits.com/og-image.png",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "150"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is myscrapbook?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "myscrapbook is a free online tool to create cute, interactive digital scrapbooks. You can add photos, write notes, use scratch cards, and share your creation with a simple link."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is myscrapbook free to use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! myscrapbook is completely free to use. Create as many scrapbooks as you want and share them with anyone."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What occasions is myscrapbook good for?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "myscrapbook is perfect for birthdays, anniversaries, Valentine's Day, long-distance relationship gifts, thank you notes, graduation gifts, and any time you want to create a heartfelt, personalized gift."
                    }
                  }
                ]
              },
              {
                "@type": "Organization",
                "name": "myscrapbook",
                "url": "https://myscrapbook.thestorybits.com",
                "logo": "https://myscrapbook.thestorybits.com/heart-favicon.ico",
                "sameAs": [
                  "https://www.instagram.com/myscrapbook.app/"
                ]
              }
            ]
          })
        }}
      />

      {/* Simple Header */}
      <header className="px-6 py-5 flex justify-between items-center max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/heart-favicon.ico" 
            alt="Logo" 
            className="w-8 h-8 group-hover:rotate-12 transition-transform"
          />
          <span className="font-bold text-gray-700">myscrapbook</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {!loading && (
            user ? (
              <Link href="/profile" className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                {user.image ? (
                  <img src={user.image} alt="" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name?.charAt(0)}
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">
                sign in
              </Link>
            )
          )}
          <Link 
            href="/scrapbook"
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-all"
          >
            create →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero - Personal & Warm */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-rose-400 mb-6">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">a tiny passion project</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Make little books for the people you love.
          </h1>
          
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            myscrapbook is a simple tool to create cute, flippable digital scrapbooks. 
            Add photos, write messages, pick pretty themes — then share it with a link. 
            That's it.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/scrapbook"
              className="inline-flex items-center gap-2 bg-rose-400 text-white px-6 py-3 rounded-full font-medium hover:bg-rose-500 transition-all hover:scale-105"
            >
              <span>start making</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a 
              href="https://buymeacoffee.com/bobacreates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-all hover:scale-105"
            >
              <Coffee className="w-4 h-4" />
              <span>buy me a coffee</span>
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gray-200"></div>
          <Sparkles className="w-4 h-4 text-amber-300" />
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* About Section - Cute Story Card */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            the story
          </h2>
          
          <div className="relative">
            {/* Soft ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-transparent to-amber-100/40 rounded-3xl blur-xl opacity-80 pointer-events-none" />
            
            {/* Story Card with gradient border effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-amber-200 rounded-2xl opacity-50" />
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-7 m-[1px] shadow-sm">
                
                {/* Avatar & Intro */}
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={randomAvatar} 
                    alt="avatar" 
                    className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-rose-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">hey, it's me!</p>
                    <p className="text-sm text-gray-400">22 y/o · loves making cute things</p>
                  </div>
                </div>

                {/* Story text - clean and simple */}
                <div className="space-y-3 text-gray-500 leading-relaxed">
                  <p>
                    ai/ml engineer by day, but my heart's all about creating things that feel 
                    <span className="text-rose-400 font-medium"> warm </span> 
                    and 
                    <span className="text-amber-500 font-medium"> cozy</span>.
                  </p>
                  <p>
                    this is my little corner — where digital gifts actually <em className="text-gray-600 not-italic font-medium">feel</em> like gifts. 💌
                  </p>
                </div>

                {/* Minimal divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-rose-100 to-transparent" />

                {/* Cute tags - refined */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'hates corporate', icon: '🙃' },
                    { text: 'tea person', icon: '☕' },
                    { text: 'night owl', icon: '🌙' },
                    { text: 'cute only', icon: '🎀' }
                  ].map((tag, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-gray-50 to-white text-gray-500 border border-gray-100/80 hover:border-rose-200 hover:text-rose-500 hover:from-rose-50 hover:to-pink-50 transition-all duration-200 cursor-default"
                    >
                      <span>{tag.icon}</span>
                      <span>{tag.text}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Do - Flowing Prose Style */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            what you can do
          </h2>
          
          {/* Natural flowing sentence */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            drop in some{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-amber-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">📷</span>
              photos
            </span>
            , write little{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-rose-400 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">💌</span>
              notes
            </span>
            , pick a cute{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-violet-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">🎨</span>
              theme
            </span>
            , watch it{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-emerald-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">✨</span>
              flip in 3d
            </span>
            , hear the{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-sky-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">🔊</span>
              page sounds
            </span>
            , then{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-indigo-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">🔗</span>
              share it
            </span>
            {' '}with anyone, anywhere.
          </p>
        </section>

        {/* Perfect For - Flowing Prose Style */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            perfect for
          </h2>
          
          {/* Natural flowing sentence */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            celebrate{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-pink-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">🎂</span>
              birthdays
            </span>
            , remember{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-red-400 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">💕</span>
              anniversaries
            </span>
            , bridge the{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-blue-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">🌍</span>
              distance
            </span>
            , say{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-purple-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">💜</span>
              thank you
            </span>
            , or just{' '}
            <span className="group inline-flex items-baseline gap-1 text-gray-700 font-medium hover:text-teal-500 transition-colors cursor-default">
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">💭</span>
              because
            </span>
            {' '}you felt like it.
          </p>
        </section>

        {/* CTA Section - Sticky Note Style */}
        <section className="py-16 flex justify-center">
          <div className="group relative">
            {/* Soft shadow */}
            <div className="absolute inset-0 bg-gray-200/50 rounded-lg translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            
            {/* Paper card - clean & minimal */}
            <div className="relative bg-white p-8 pt-12 rounded-lg border border-gray-100 rotate-1 group-hover:rotate-0 transition-all duration-300 min-w-[280px]">
              
              {/* Real washi tape */}
              <img 
                src="/washi_tapes/washitape-abstract-pink.webp" 
                alt="" 
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-auto opacity-90"
              />
              
              {/* Content */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">psst...</p>
                <p className="text-gray-600 text-lg mb-5">
                  wanna make something cute? 💕
                </p>
                
                <Link 
                  href="/scrapbook"
                  className="inline-flex items-center gap-2 text-rose-400 font-medium hover:text-rose-500 transition-colors group/link"
                >
                  <span>yes, let's go</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gray-200"></div>
          <Coffee className="w-4 h-4 text-amber-400" />
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Personal Note / Footer */}
        <section className="text-center text-sm text-gray-400">
          <p className="mb-4">
            made with lots of chai ☕ and late nights 🌙
          </p>
          <p className="mb-6">
            if you like this, tell a friend. that means a lot. 💕
          </p>
          
          <div className="flex justify-center gap-6 text-gray-400">
            <a 
              href="https://www.instagram.com/myscrapbook.app/" 
              className="hover:text-rose-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              terms
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}