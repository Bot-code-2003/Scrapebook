'use client';
import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';

function LoginForm() {
  const { googleLogin, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/profile';
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  React.useEffect(() => {
    if (user) router.push(redirectTo);
  }, [user, router, redirectTo]);

  const loginWithGoogle = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
          setIsLoading(true);
          try {
              const result = await googleLogin(tokenResponse.access_token);
              if (result.success) {
                  router.push(redirectTo);
              } else {
                  setError(result.message || 'Google Login failed');
              }
          } catch (err) {
              setError('Something went wrong with Google Login');
          } finally {
              setIsLoading(false);
          }
      },
      onError: () => {
          setError('Google Login Failed');
          setIsLoading(false);
      },
      flow: 'implicit',
      ux_mode: 'popup',
  });

  return (
    <div className="min-h-screen w-full bg-[#f8eadd] font-sans flex flex-col p-4 selection:bg-[#8b5e3c] selection:text-white overflow-y-auto">
        
        {/* Branding (Top Left) */}
        <div className="w-full flex justify-start p-2 md:p-6 mb-4 md:mb-0">
            <Link href="/" className="group flex items-center gap-2">
                <img src="/heart-favicon.ico" alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform drop-shadow-sm" />
                <span className="font-black text-xl text-[#6d4c41] tracking-tight group-hover:text-[#5d4037]">MyScrapbook</span>
            </Link>
        </div>
        
        {/* Main Content Group */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 animate-in fade-in zoom-in duration-500 w-full mb-8">
            
            {/* Left Side: Cute Bear Illustration */}
            <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        {/* Image from User */}
                        <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center relative hover:scale-105 transition-transform duration-500">
                             <img 
                                src="/login-page.webp" 
                                alt="Cute Login Illustration" 
                                className="w-full h-full object-contain"
                             />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#6d4c41] mb-2 tracking-tight">Welcome, friend!</h2>
                    <p className="text-[#8d6e63] font-medium">Let's make something cute.</p>
            </div>

            {/* Right Side: Login Card */}
            <div className="relative">
                {/* Avatar Peek */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                     <div className="w-20 h-20 bg-[#6d4c41] rounded-full flex items-center justify-center border-4 border-[#fffdf5] shadow-sm">
                          <Heart className="w-10 h-10 text-[#e6cbb3] fill-[#e6cbb3]" />
                     </div>
                </div>

                {/* Card Container */}
                <div className="w-80 bg-[#e6cbb3] rounded-[2rem] border-[3px] border-[#6d4c41] shadow-[6px_6px_0px_0px_rgba(109,76,65,1)] p-8 pt-14 flex flex-col gap-6">
                     
                     <div className="text-center mt-2">
                         <h3 className="text-[#3e2723] font-bold text-xl tracking-tight">Get Started</h3>
                     </div>

                     {error && (
                        <div className="bg-red-100/80 text-[#3e2723] text-xs p-2 rounded-lg border border-[#3e2723]/20 text-center font-bold">
                            {error}
                        </div>
                     )}

                     <button
                        onClick={() => {
                            setIsLoading(true);
                            loginWithGoogle();
                        }}
                        disabled={isLoading}
                        className="w-full bg-[#5d4037] text-[#fffdf5] font-bold py-4 rounded-full hover:bg-[#4e342e] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-2 border-transparent shadow-lg"
                     >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <img src="/google-logo.svg" alt="" className="w-5 h-5 bg-white rounded-full p-0.5" />
                                <span>Start with Google</span>
                            </>
                        )}
                     </button>



                     {/* Legal Terms */}
                     <div className="mt-2 text-center">
                        <p className="text-[10px] text-[#8d6e63] font-bold leading-tight">
                            By continuing, you agree to our <br/>
                            <Link href="/terms" className="underline hover:text-[#5d4037] decoration-[#6d4c41]">Terms</Link>
                            {' '}&{' '}
                            <Link href="/privacy" className="underline hover:text-[#5d4037] decoration-[#6d4c41]">Privacy Policy</Link>
                        </p>
                     </div>
                </div>
            </div>

        </div>

        {/* Footer Text */}
        <div className="w-full text-center py-4 text-[#8d6e63]/60 text-xs font-bold tracking-widest uppercase">
            Designed for Memories
        </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8eadd]"><Loader2 className="w-8 h-8 animate-spin text-[#6d4c41]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
