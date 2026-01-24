'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, AlertCircle, Heart, UserCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-gray-900 font-sans selection:bg-lime-200">
      {/* Navigation */}
      <nav className="px-6 py-6 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            House <span className="text-lime-500">Rules</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto">
            The fine print, but made human. By using MyScrapbook, here is what you agree to.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-12">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">Be Nice & Creative</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
              MyScrapbook is a place for joy and memories. Please don't create or share content that is hurtful, illegal, overly inappropriate, or mean. We want to keep this corner of the internet safe and cute!
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">Your Account</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
              You are responsible for your account. Since we use Google Login, keeping your Google account safe keeps your MyScrapbook safe too. If you think someone is using your account without permission, let us know!
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">Content Ownership</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
             <strong>You own your photos and memories.</strong> By uploading them, you grant us permission to host and display them for you. We don't claim ownership over your personal creations.
            </p>
          </section>
          
           {/* Section 4 */}
           <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">The Legal Stuff</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
             We do our absolute best to keep the service running smoothly 24/7. However, MyScrapbook is provided "as is," and we can't promise that it will never have a hiccup. We aren't liable for any lost data, though we have backups to prevent that!
            </p>
          </section>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
             <p className="text-gray-500 text-sm">
                Got a weird legal question? <br />
                <a href="mailto:madisettydharmadeep@gmail.com" className="text-black font-bold hover:underline decoration-lime-400 decoration-2">
                    madisettydharmadeep@gmail.com
                </a>
             </p>
          </div>

        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
            Last Updated: January 2026
        </p>
      </main>
    </div>
  );
}
