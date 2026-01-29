'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Shield, Eye, Cookie, Heart } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100">
      {/* Navigation */}
      <nav className="px-6 py-6 max-w-4xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>back to home</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-sm border border-rose-200/50">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-6">
            your secrets are <span className="text-rose-400">safe</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            we pinky promise to take care of your data. here is exactly how we handle your digital memories.
          </p>
        </div>

        {/* Content Card with Glow Effect */}
        <div className="relative">
            {/* Soft ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-transparent to-amber-100/40 rounded-3xl blur-xl opacity-80 pointer-events-none" />
            
            {/* Gradient Border Card */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-amber-200 rounded-3xl opacity-50" />
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 m-[1px] shadow-sm space-y-12">
                  
                  {/* Section 1 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">what we collect</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                      we keep it simple. when you log in with google, we only save your <span className="text-gray-700 font-medium">name, email, and profile picture</span>. 
                      we also store the beautiful <span className="text-gray-700 font-medium">scrapbooks</span> you create, including the photos and text you add to them, so you can access them forever.
                    </p>
                  </section>

                  {/* Section 2 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center border border-purple-100">
                        <Eye className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">how we use it</h2>
                    </div>
                    <div className="pl-14 space-y-4 text-gray-500 leading-relaxed">
                        <p>we use your data strictly to:</p>
                        <ul className="space-y-2">
                            {[
                                'create your personal account',
                                'save your scrapbooks so they don\'t disappear',
                                'show you your "my creations" dashboard',
                                'allow you to share links with friends'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-rose-300 mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                         <p className="border-l-2 border-rose-200 pl-4 italic text-gray-400 bg-rose-50/30 py-2 pr-2 rounded-r-lg">
                            <strong className="text-rose-500 not-italic">we do not sell your data.</strong> your memories are yours, not a product.
                        </p>
                    </div>
                  </section>

                  {/* Section 3 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                        <Cookie className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">cookies</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                     we use tiny digital cookies just to keep you logged in. that's it. no creepy tracking across the internet.
                    </p>
                  </section>

                  {/* Contact */}
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                     <p className="text-gray-400 text-sm mb-2">
                        questions? hugs? concerns?
                     </p>
                     <a 
                        href="mailto:futurepiratekingxx@gmail.com" 
                        className="inline-flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors bg-rose-50 px-4 py-2 rounded-full border border-rose-100 hover:border-rose-200"
                    >
                        <Heart className="w-4 h-4 fill-current" />
                        futurepiratekingxx@gmail.com
                     </a>
                  </div>

                </div>
            </div>
        </div>
        
        <p className="text-center text-gray-300 text-xs mt-12 font-medium tracking-wide lowercase">
            last updated: january 2026
        </p>
      </main>
    </div>
  );
}
