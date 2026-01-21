import React from 'react';
import { 
  Heart, Cake, Sparkles, Star, 
  FileText, Palette, Book, Send, ArrowRight, Plus
} from 'lucide-react';

const MidSection = () => {
  const targets = [
    { Icon: Heart, title: "Your Partner", text: "Anniversaries or long distance.", color: "text-rose-500" },
    { Icon: Cake, title: "Birthdays", text: "Better than a social wish.", color: "text-amber-600" },
    { Icon: Sparkles, title: "Memories", text: "College life & trips, captured.", color: "text-sky-500" },
    { Icon: Star, title: "Fandoms", text: "Anime, K-pop, and jokes.", color: "text-indigo-500" }
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
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-6">
                Community
              </span>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none">
                Made for <br />
                <span className="font-serif italic text-slate-400">every</span> story.
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-sm">
              Wrapper isn't just a tool; it's a digital home for the moments you don't want to lose to a scrolling feed.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {targets.map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="mb-6 overflow-hidden">
                  <item.Icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform duration-500`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-snug">{item.text}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-black transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (REIMAGINED EDITORIAL STYLE) */}
      <section className="py-10 md:py-20 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          {/* Header matching Section 1 style */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
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
                <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
                    View the demo <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
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
      WRAPPER
    </span>

    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 relative z-10">
      Ready to tell <br />your story?
    </h2>

    <button className="relative z-10 bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all duration-300">
      Start Wrapping Now
    </button>

  </div>
</section>


    </div>
  );
};

export default MidSection;