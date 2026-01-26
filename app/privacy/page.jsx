'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Shield, Eye, Cookie } from 'lucide-react';

export default function PrivacyPage() {
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
          <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Your Secrets are <span className="text-lime-500">Safe</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto">
            We pinky promise to take care of your data. Here is exactly how we handle your digital memories.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-12">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">What We Collect</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
              We keep it simple. When you log in with Google, we only save your <strong>name, email, and profile picture</strong>. 
              We also store the beautiful <strong>scrapbooks</strong> you create, including the photos and text you add to them, so you can access them forever.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">How We Use It</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
              We use your data strictly to:
            </p>
            <ul className="list-disc pl-16 mt-2 space-y-2 text-gray-600">
                <li>Create your personal account.</li>
                <li>Save your scrapbooks so they don't disappear.</li>
                <li>Show you your "My Creations" dashboard.</li>
                <li>Allow you to share links with friends.</li>
            </ul>
             <p className="text-gray-600 leading-relaxed pl-11 mt-4">
                <strong>We do NOT sell your data.</strong> Your memories are yours, not a product.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                <Cookie className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold">Cookies</h2>
            </div>
            <p className="text-gray-600 leading-relaxed pl-11">
             We use tiny digital cookies just to keep you logged in. That's it. No creepy tracking across the internet.
            </p>
          </section>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
             <p className="text-gray-500 text-sm">
                Questions? Hugs? Concerns? <br />
                <a href="mailto:futurepiratekingxx@gmail.com" className="text-black font-bold hover:underline decoration-lime-400 decoration-2">
                    futurepiratekingxx@gmail.com
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
