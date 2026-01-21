'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Book, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const { signup, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/my-books';
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await signup(formData.name, formData.email, formData.password);
      if (result.success) {
        router.push(redirectTo);
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 animate-in fade-in zoom-in duration-300">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="flex flex-col items-center text-center mb-8">
           <div className="bg-lime-50 text-lime-600 p-3 rounded-xl border border-lime-100 mb-4 shadow-sm">
            <Book className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h1>
          <p className="text-gray-500 mt-2">Start creating beautiful digital scrapbooks today.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder-gray-400"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-400 mt-2 ml-1">Must be at least 6 characters</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 font-bold rounded-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link 
              href={`/login${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="text-black font-bold hover:underline decoration-lime-400 decoration-2 underline-offset-2 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
