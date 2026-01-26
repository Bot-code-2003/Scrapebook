import React from 'react';
import { 
  Image, Mail, Sparkles, Star, 
  FileText, Palette, Book, Send, ArrowRight, Plus
} from 'lucide-react';
import Link from 'next/link';

const MidSection = () => {
  const features = [
    { Icon: Image, title: "Interactive Media", text: "Upload photos and arrange them your way.", color: "text-rose-600", bg: "bg-rose-50", border: 'group-hover:border-rose-200' },
    { Icon: Sparkles, title: "Scratch Cards", text: "Hide secrets under a scratch-off layer.", color: "text-amber-600", bg: "bg-amber-50", border: 'group-hover:border-amber-200' },
    { Icon: Mail, title: "Digital Envelopes", text: "Tuck notes inside interactive envelopes.", color: "text-sky-600", bg: "bg-sky-50", border: 'group-hover:border-sky-200' },
    { Icon: Star, title: "Custom Themes", text: "Fonts, borders, and colors that fit you.", color: "text-indigo-600", bg: "bg-indigo-50", border: 'group-hover:border-indigo-200' }
  ];

  const steps = [
    { step: "01", title: "Collect", text: "Drop in photos, screenshots, or just a deep thought.", icon: Plus },
    { step: "02", title: "Curate", text: "Choose a theme that matches the mood of your memories.", icon: Palette },
    { step: "03", title: "Craft", text: "Our engine builds an interactive unboxing experience.", icon: Book },
    { step: "04", title: "Connect", text: "Share a private link they can flip through anywhere.", icon: Send }
  ];

  return (
    <div className=" text-slate-900 font-sans selection:bg-black selection:text-white">
      
      {/* SECTION 1: WHO IS THIS FOR? */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-lime-300 text-black border border-black text-[10px] font-bold uppercase tracking-widest mb-6">
                Features
              </span>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none">
                More than <br />
                just <span className="font-serif italic text-slate-400">pictures</span>.
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-sm">
              Create a truly interactive experience with touchable elements that bring your story to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: Media (Wide) */}
            <div className="md:col-span-2 group p-8 rounded-3xl bg-[#FFDEE2] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className="w-20 h-20 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform duration-300">
                        <Image className="w-10 h-10 text-black" strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black mb-2 text-black tracking-tight uppercase">Interactive Media</h3>
                        <p className="text-black font-semibold text-lg leading-tight">Upload photos, align them freely, and let them tell your story without boundaries.</p>
                    </div>
                </div>
                {/* Decor */}
                <Image className="absolute -bottom-6 -right-6 w-48 h-48 text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>

            {/* Feature 2: Scratch (Tall/Square) */}
            <div className="md:col-span-1 group p-8 rounded-3xl bg-[#FFF4B0] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                 <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-300">
                        <Sparkles className="w-8 h-8 text-black" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-black tracking-tight uppercase">Scratch Cards</h3>
                    <p className="text-black font-semibold leading-tight">Hide meaningful secrets under a layer of digital foil.</p>
                </div>
            </div>

            {/* Feature 3: Envelopes (Tall/Square) */}
             <div className="md:col-span-1 group p-8 rounded-3xl bg-[#C4F5FC] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                 <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-12 transition-transform duration-300">
                        <Mail className="w-8 h-8 text-black" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-black tracking-tight uppercase">Envelopes</h3>
                    <p className="text-black font-semibold leading-tight">Delight them with digital letters that open with a click.</p>
                </div>
            </div>

            {/* Feature 4: Themes (Wide) */}
            <div className="md:col-span-2 group p-8 rounded-3xl bg-[#E5DBFF] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row-reverse items-center md:items-start gap-6 text-center md:text-right">
                    <div className="w-20 h-20 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-10 h-10 text-black" strokeWidth={2} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black mb-2 text-black tracking-tight uppercase">Total Customization</h3>
                        <p className="text-black font-semibold text-lg leading-tight">Pick fonts, colors, and doodle borders that match the vibe perfectly.</p>
                    </div>
                </div>
                 {/* Decor */}
                 <Star className="absolute -bottom-6 -left-6 w-48 h-48 text-black/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (REIMAGINED EDITORIAL STYLE) */}
      <section className="py-10 md:py-20 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          {/* Header matching Section 1 style */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-10 sm:mb-24">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-black text-black text-[10px] font-bold uppercase tracking-widest mb-6">
                Process
              </span>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none">
                How it <br />
                <span className="font-serif italic text-slate-400">unfolds</span>.
              </h2>
            </div>
            <div className="pt-2">
                <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-sm mb-8">
                    Four steps to turn a digital mess into a curated, interactive masterpiece.
                </p>
                {/* <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
                    View the demo <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button> */}
            </div>
          </div>

          {/* Steps Grid - Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {steps.map((item, i) => (
              <div key={i} className="bg-[#FDFFF7] p-8 md:p-12 group hover:bg-black transition-colors duration-700">
                <div className="flex justify-between items-start mb-16">
                    <span className="text-sm font-black text-slate-300 group-hover:text-slate-700 transition-colors">
                        {item.step}
                    </span>
                    <item.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-medium tracking-tighter mb-4 group-hover:text-white transition-colors">
                    {item.title}
                </h3>
                <p className="text-slate-500 group-hover:text-slate-400 transition-colors font-light leading-relaxed">
                    {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
<section className="py-0 px-6">
  <div className="max-w-6xl mx-auto bg-black rounded-[3rem] py-24 px-6 text-center text-white overflow-hidden relative">
    
    {/* Decorative background text */}
    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black opacity-5 select-none pointer-events-none">
      myscrapbook
    </span>

    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 relative z-10">
      Ready to tell <br />your story?
    </h2>

    <Link href="/signup" className="relative z-10 bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all duration-300">
      Start Creating Now
    </Link>

  </div>
</section>


    </div>
  );
};

export default MidSection;