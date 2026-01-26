'use client';
import { Coffee } from 'lucide-react';

export default function SupportButton({ iconOnly = false }) {
  return (
    <a 
      href="https://www.buymeacoffee.com/yourusername" 
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 bg-[#FFDD00] text-black px-3 py-2 sm:px-4 sm:py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border-2 border-transparent hover:border-black/10"
    >
      <div className="bg-white p-1 rounded-full group-hover:scale-110 transition-transform">
        <Coffee className="w-4 h-4 text-black" />
      </div>
      <span className={`text-sm font-black tracking-tight ${iconOnly ? 'hidden sm:inline' : ''}`}>Buy me a coffee</span>
    </a>
  );
}
