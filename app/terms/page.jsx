'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, AlertCircle, Heart, UserCheck } from 'lucide-react';

export default function TermsPage() {
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
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3 shadow-sm border border-rose-200/50">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight mb-6">
            house <span className="text-rose-400">rules</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            the fine print, but made human. by using myscrapbook, here is what you agree to.
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
                      <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center border border-pink-100">
                        <Heart className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">neutral tool & platform</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                      myscrapbook is a <span className="text-gray-700 font-medium">neutral creation tool</span>. we provide the canvas, but you are the artist. <span className="text-gray-700 font-medium">we do not pre-screen, select, or monitor user-generated content</span> uploaded to the service.
                    </p>
                  </section>

                  {/* Section 2 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">user responsibility</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                      you are <span className="text-rose-500 font-bold">solely and legally responsible</span> for the content you upload. if you use images from third-party sources (like pinterest, google, or other artists), you certify that you have the right to use them. we act purely as a passive conduit and assume no liability for your content.
                    </p>
                  </section>

                  {/* Section 3 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">takedown & repeat infringers</h2>
                    </div>
                    <div className="text-gray-500 leading-relaxed pl-14 space-y-3">
                        <p>
                            <span className="text-gray-700 font-bold">Content Removal:</span> if you believe your copyright is being infringed, please email us with details. upon receipt of a valid notice, we will remove the infringing content promptly.
                        </p>
                        <p>
                            <span className="text-gray-700 font-bold">Repeat Infringer Policy:</span> we take intellectual property rights seriously. we will terminate the accounts of users who are determined to be repeat infringers of copyright.
                        </p>
                    </div>
                  </section>
                  
                   {/* Section 4 */}
                   <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100">
                        <Scale className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">safe harbor status</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                     we operate as a service provider under applicable safe harbor laws (such as the DMCA). the service is provided "as is," and strictly enables users to store and view their own private content.
                    </p>
                  </section>

                  {/* Contact */}
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                     <p className="text-gray-400 text-sm mb-2 font-medium">
                        legal & copyright inquiries
                     </p>
                     <a 
                        href="mailto:futurepiratekingxx@gmail.com" 
                        className="inline-flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors bg-rose-50 px-4 py-2 rounded-full border border-rose-100 hover:border-rose-200"
                    >
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
