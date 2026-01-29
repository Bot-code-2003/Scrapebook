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
                      <h2 className="text-xl font-bold text-gray-700">be nice & creative</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                      myscrapbook is a place for joy and memories. please don't create or share content that is hurtful, illegal, overly inappropriate, or mean. we want to keep this corner of the internet <span className="text-rose-400 font-medium">safe</span> and <span className="text-rose-400 font-medium">cute!</span>
                    </p>
                  </section>

                  {/* Section 2 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">your account</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                      you are responsible for your account. since we use google login, keeping your google account safe keeps your myscrapbook safe too. if you think someone is using your account without permission, let us know!
                    </p>
                  </section>

                  {/* Section 3 */}
                  <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">content ownership</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                     <span className="text-gray-700 font-bold">you own your photos and memories.</span> by uploading them, you grant us permission to host and display them for you. we don't claim ownership over your personal creations.
                    </p>
                  </section>
                  
                   {/* Section 4 */}
                   <section>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100">
                        <Scale className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">the legal stuff</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed pl-14">
                     we do our absolute best to keep the service running smoothly 24/7. however, myscrapbook is provided "as is," and we can't promise that it will never have a hiccup. we aren't liable for any lost data, though we have backups to prevent that!
                    </p>
                  </section>

                  {/* Contact */}
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                     <p className="text-gray-400 text-sm mb-2">
                        got a weird legal question?
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
