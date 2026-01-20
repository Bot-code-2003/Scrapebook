'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Book, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/my-books';
  
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push(redirectTo);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_black] max-w-md w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold uppercase">Back</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-black text-white p-2 border-2 border-black">
            <Book className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Log In</h1>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-500 text-red-600 p-3 mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A3E635] text-black py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link 
            href={`/signup${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
            className="text-black font-bold underline hover:text-[#A3E635] transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
