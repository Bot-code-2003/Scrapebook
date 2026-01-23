'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, Gift, X, PenTool, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const GIFT_STYLES = [
  {
    id: 'classic',
    label: 'Classic',
    options: [
        { id: 'envelope', label: 'Vintage Envelope' }
    ]
  },
  {
    id: 'scratch_section',
    label: 'Scratch Cards',
    options: [
        { id: 'scratch-kawaii', label: 'Kitty Stamp' },
        { id: 'scratch-gold', label: 'Luxury Gold' },
        { id: 'scratch-blue', label: 'Winter Frost' }
    ]
  },
  {
    id: 'balloon_section',
    label: 'Balloon Pop',
    options: [
        { id: 'balloon-kawaii', label: 'Pink Heart' },
        { id: 'balloon-classic', label: 'Classic Red' },
        { id: 'balloon-blue', label: 'Sky Blue' }
    ]
  }
];

export default function GiftElement({ content, onUpdate, isCover, readOnly, onOpenDrawer }) {
  const [isOpen, setIsOpen] = useState(false); // For Envelope/Bottle/Balloon open state
  const [uploadType, setUploadType] = useState(null); // For edit mode selection
  const [isEditingContent, setIsEditingContent] = useState(false); // New explicit edit mode

  const giftContent = content || { type: null, data: null, style: 'envelope' };
  let currentStyle = giftContent.style || 'envelope';
  
  // Backward compatibility mappings
  if (currentStyle === 'scratch') currentStyle = 'scratch-kawaii';
  if (currentStyle === 'balloon') currentStyle = 'balloon-kawaii';

  // --- HANDLERS ---
  
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ ...giftContent, type: 'image', data: event.target.result });
        setUploadType(null);
        setIsEditingContent(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = (text) => {
    if (text.trim()) {
      onUpdate({ ...giftContent, type: 'text', data: text });
      setUploadType(null);
      setIsEditingContent(false);
    }
  };

  const handleStyleSelect = (styleId) => {
    onUpdate({ ...giftContent, style: styleId });
  };

  // --- RENDERERS ---

  // 1. Envelope Renderer (Restored Original Logic)
  const renderEnvelope = () => (
    <div 
        className="relative cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) { 
            const audio = new Audio('/sounds/pop.mp3');
            audio.play().catch(e => console.log('Audio play failed', e));
          }
          setIsOpen(!isOpen);
        }}
        style={{ 
          width: '300px', 
          height: '400px',
          perspective: '1000px'
        }}
      >
        {/* Animated Envelope */}
        <div 
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            height: '225px',
            width: '300px',
            top: '50%',
            left: '50%',
            transform: isOpen 
              ? 'translate(-50%, -50%) translateY(100px)' 
              : 'translate(-50%, -50%) translateY(0px)',
          }}
        >
          {/* Envelope Body (bottom triangle) */}
          <div 
            className="absolute bottom-0 left-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 0 150px 300px',
              borderColor: 'transparent transparent #8b7ab8 transparent',
              zIndex: 2,
            }}
          />

          {/* Top Fold (flap) */}
          <div 
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              top: '75px',
              left: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '75px 150px 0 150px',
              transformOrigin: '50% 0%',
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              borderColor: '#6b5b95 transparent transparent transparent',
              zIndex: isOpen ? 0 : 2,
              transitionDelay: isOpen ? '0s' : '0.4s',
            }}
          />

          {/* Back Fold */}
          <div 
            className="absolute bottom-0 left-0 bg-[#6b5b95]"
            style={{
              width: '300px',
              height: '150px',
              zIndex: 0,
            }}
          />

          {/* Left Fold (shadow) */}
          <div 
            className="absolute bottom-0 left-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '75px 0 75px 150px',
              borderColor: 'transparent transparent transparent #7d6fa8',
              zIndex: 2,
            }}
          />

          {/* Letter Inside */}
          <div 
            className="absolute bg-white overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              left: '30px',
              bottom: '0px',
              width: '240px',
              height: isOpen ? '360px' : '90px',
              zIndex: 1,
              transitionDelay: isOpen ? '0.2s' : '0s',
            }}
          >
            {/* Letter Border (decorative stripes) */}
            <div 
              className="w-full"
              style={{
                height: '15px',
                background: 'repeating-linear-gradient(-45deg, #9b8bc4, #9b8bc4 12px, transparent 12px, transparent 27px)',
              }}
            />

            {/* Letter Content */}
            {isOpen && (
              <div className="p-4 animate-in fade-in duration-700 delay-300 overflow-y-auto" style={{ maxHeight: '345px' }}>
                {giftContent.type === 'image' ? (
                  <img
                    src={giftContent.data}
                    alt="Gift surprise"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg font-light text-gray-800 text-center whitespace-pre-wrap leading-relaxed">
                      {giftContent.data}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Letter placeholder lines (when closed) */}
            {!isOpen && (
              <>
                <div className="mt-4 ml-3 h-3 w-2/5 bg-[#9b8bc4] opacity-30" />
                <div className="mt-4 ml-3 h-3 w-1/5 bg-[#9b8bc4] opacity-30" />
                <div className="mt-12 ml-36 rounded-full h-11 w-11 bg-[#9b8bc4] opacity-20" />
              </>
            )}
          </div>
        </div>

        {/* "Click Me" text when closed */}
        {!isOpen && (
          <div 
            className="absolute transition-all duration-300"
            style={{
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <p className="text-sm font-medium text-gray-600 uppercase tracking-widest animate-pulse">
              Click Me
            </p>
          </div>
        )}

        {/* Close button when open */}
        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all z-50 shadow-xl animate-in zoom-in duration-300 delay-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
  );

  // 2. Scratch Card Renderer
  const RenderScratchCard = ({ variant }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const scratchAudioRef = useRef(null);

    // Load Audio
    useEffect(() => {
        scratchAudioRef.current = new Audio('/sounds/scratching.mp3');
    }, []);

    // --- THEMES CONFIGURATION ---
    const getThemeLogic = () => {
        switch(variant) {
            case 'scratch-gold':
                return {
                    id: 'gold',
                    scratchColor: '#D6C08D', // Muted Crystal Ball Gold
                    patternColor: '#EADBC0',
                    brushSize: 30,
                    text: { font: 'bold 16px "Courier New", monospace', color: '#5A4A32', label: '?' },
                    renderPattern: (ctx, width, height) => {
                         // Crystal Ball Shine
                         ctx.fillStyle = 'rgba(255,255,255,0.3)';
                         ctx.beginPath();
                         ctx.ellipse(width*0.3, height*0.3, width*0.1, height*0.05, -Math.PI/4, 0, Math.PI*2);
                         ctx.fill();
                         ctx.beginPath();
                         ctx.arc(width*0.2, height*0.25, 5, 0, Math.PI*2);
                         ctx.fill();
                    }
                };
            case 'scratch-blue':
                return {
                    id: 'blue',
                    scratchColor: '#E0F2FE', // Ice
                    patternColor: '#FFF',
                    brushSize: 20,
                    text: { font: 'bold 16px sans-serif', color: '#0EA5E9', label: '❄ SCRATCH ❄' },
                    renderPattern: (ctx, width, height) => {
                         // Snowflakes
                         ctx.fillStyle = '#FFF';
                         for(let i=0; i<20; i++) {
                             const x = Math.random() * width;
                             const y = Math.random() * height;
                             const r = Math.random() * 3 + 1;
                             ctx.beginPath();
                             ctx.arc(x, y, r, 0, Math.PI * 2);
                             ctx.fill();
                         }
                    }
                };
            default: // Kawaii
                return {
                    id: 'kawaii',
                    scratchColor: '#F3F0D4',
                    patternColor: 'rgba(230,225,190,0.5)',
                    brushSize: 25,
                    text: { font: 'bold 14px sans-serif', color: '#A3B6DA', label: 'SCRATCH HERE' },
                    renderPattern: (ctx, width, height) => {
                         // Paw Prints
                         ctx.fillStyle = 'rgba(230,225,190,0.5)';
                         for(let i=0; i<8; i++) {
                             const x = Math.random() * width;
                             const y = Math.random() * height;
                             ctx.beginPath();
                             ctx.arc(x, y, 15, 0, Math.PI * 2); 
                             ctx.fill();
                             ctx.beginPath();
                             ctx.arc(x-12, y-12, 6, 0, Math.PI * 2);
                             ctx.arc(x, y-18, 6, 0, Math.PI * 2);
                             ctx.arc(x+12, y-12, 6, 0, Math.PI * 2);
                             ctx.fill();
                         }
                    }
                };
        }
    };

    const theme = getThemeLogic();

    // --- CANVAS DRAWING ---
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;

        // 1. Fill
        ctx.fillStyle = theme.scratchColor;
        ctx.fillRect(0, 0, width, height);

        // 2. Pattern
        theme.renderPattern(ctx, width, height);

        // 3. Label
        ctx.fillStyle = theme.text.color;
        ctx.font = theme.text.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (theme.id === 'gold') {
             // Minimal center text for crystal ball
             ctx.fillText(theme.text.label, width/2, height/2);
        } else if (theme.id === 'blue') {
             ctx.fillText(theme.text.label, width/2, height/2);
        } else {
             // Stamp style
             ctx.save();
             ctx.translate(width - 50, 50);
             ctx.rotate(Math.PI / 8);
             ctx.strokeStyle = '#A3B6DA';
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.arc(0, 0, 35, 0, Math.PI * 2);
             ctx.stroke();
             ctx.fillText('SCRATCH', 0, -8);
             ctx.fillText('HERE', 0, 8);
             ctx.restore();
        }

    }, [theme]); 

    const handleScratch = (e) => {
        if (!readOnly) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        if (clientX === undefined || clientY === undefined) return;

        // Calculate scale factors (drawing buffer size / CSS displayed size)
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, theme.brushSize, 0, Math.PI * 2);
        ctx.fill();

        if (scratchAudioRef.current && scratchAudioRef.current.paused) {
            scratchAudioRef.current.play().catch(() => {});
        }
    };

    // --- RENDER LAYOUTS based on Variant ---

    // 1. MYSTICAL CRYSTAL BALL (Formerly Luxury Gold)
    // Updated: The entire black card is scratchable!
    if (variant === 'scratch-gold') {
        const CARD_WIDTH = 340;
        const CARD_HEIGHT = 440;

        // Custom Render for the "Cover" of the scratch card (The Mystic Scene)
        useEffect(() => {
            if (variant !== 'scratch-gold' || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // 1. Background (Dark Panel)
            ctx.fillStyle = '#232020';
            ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
            
            // 2. Decor Border
            ctx.strokeStyle = '#D6C08D';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(16, 16, CARD_WIDTH-32, CARD_HEIGHT-32, 24);
            ctx.stroke();

            // 3. Texts
            ctx.fillStyle = '#D6C08D';
            ctx.textAlign = 'center';
            
            // "YOUR FUTURE"
            ctx.font = '14px serif';
            ctx.fillText('Y O U R   F U T U R E', CARD_WIDTH/2, 50);

            // "LOOKS BRIGHT"
            ctx.fillText('L O O K S', CARD_WIDTH/2, CARD_HEIGHT - 60);
            ctx.font = 'bold 14px serif';
            ctx.fillText('B R I G H T', CARD_WIDTH/2, CARD_HEIGHT - 40);

            // 4. The Crystal Ball Graphic (Center)
            const ballX = CARD_WIDTH/2;
            const ballY = CARD_HEIGHT/2 - 10;
            const ballR = 80;

            // Ball Fill
            ctx.fillStyle = '#D6C08D';
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballR, 0, Math.PI*2);
            ctx.fill();

            // Shine
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath();
            ctx.ellipse(ballX - 25, ballY - 25, 20, 10, -Math.PI/4, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(ballX - 40, ballY - 20, 4, 0, Math.PI*2);
            ctx.fill();

            // Question Mark
            ctx.fillStyle = '#5A4A32';
            ctx.font = 'bold 30px serif';
            ctx.fillText('?', ballX, ballY + 10);

            // Stand
            ctx.fillStyle = '#8C7A54';
            ctx.beginPath();
            ctx.roundRect(ballX - 40, ballY + ballR - 5, 80, 20, 10);
            ctx.fill();

            // 5. Stars & Moons
            ctx.fillStyle = '#D6C08D';
            ctx.font = '20px serif';
            ctx.fillText('✦', 40, 60);
            ctx.fillText('✨', CARD_WIDTH-40, 80);
            ctx.fillText('☽', CARD_WIDTH-40, CARD_HEIGHT-80);
            ctx.font = '12px serif';
            ctx.fillText('✶', 40, CARD_HEIGHT-80);

        }, []); // Run once on mount

        return (
            <div className="relative group cursor-pointer select-none" ref={containerRef} onClick={(e) => e.stopPropagation()}>
                {/* White Paper Card Base */}
                <div className="w-[400px] h-[600px] bg-[#FDFBF7] shadow-xl flex flex-col items-center relative p-8 rounded-sm">
                    
                    {/* Top Text */}
                    <div className="text-[#8B7D6B] text-[10px] tracking-[0.3em] font-medium mb-4 font-mono uppercase">
                        Scratch Card
                    </div>

                    {/* The Scratchable Area Container */}
                    <div className="flex-1 w-full bg-white rounded-[2rem] relative flex items-center justify-center overflow-hidden border border-gray-200">
                        
                        {/* 1. HIDDEN CONTENT (Behind Canvas) */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 bg-white">
                             {giftContent.type === 'image' ? (
                                <img src={giftContent.data} className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Your Fortune</p>
                                    <p className="text-gray-900 font-serif font-bold text-2xl leading-relaxed">
                                        {giftContent.data}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 2. THE SCRATCH CANVAS (The Cover Image) */}
                        <canvas 
                            ref={canvasRef}
                            width={340} height={440}
                            className={`absolute inset-0 w-full h-full cursor-pointer touch-none z-20 ${!readOnly ? 'opacity-80' : ''}`}
                            onMouseMove={e => e.buttons === 1 && handleScratch(e)}
                            onTouchMove={handleScratch}
                        />

                    </div>

                    {/* Bottom Card Text */}
                    <div className="text-[#8B7D6B] text-[9px] tracking-[0.2em] font-medium mt-4 font-mono uppercase opacity-70">
                        What the future holds
                    </div>
                </div>
            </div>
        );
    }

    // 2. WINTER FROST LAYOUT (Holiday Card)
    if (variant === 'scratch-blue') {
        return (
            <div className="relative group cursor-pointer select-none" ref={containerRef} onClick={(e) => e.stopPropagation()}>
                <div className="w-[380px] h-[480px] bg-gradient-to-b from-sky-100 to-blue-200 rounded-[32px] shadow-lg border-[4px] border-white flex flex-col items-center relative overflow-hidden p-2">
                    {/* Snow Decor */}
                    <div className="absolute top-2 right-4 text-white opacity-80 animate-pulse text-xl">❄</div>
                    <div className="absolute bottom-12 left-2 text-white opacity-60 text-lg">❅</div>
                    
                    {/* Frosted Container */}
                    <div className="w-full h-full bg-white/40 backdrop-blur-sm rounded-[24px] p-2 flex flex-col">
                        
                        <div className="h-10 flex items-center justify-center">
                            <span className="text-sky-600 font-bold tracking-wider text-sm bg-white/80 px-4 py-1 rounded-full shadow-sm">WINTER WISH</span>
                        </div>

                        {/* Gift Area */}
                        <div className="flex-1 relative m-1 rounded-2xl overflow-hidden bg-white/80 shadow-inner flex items-center justify-center">
                             {/* The Prize */}
                             <div className="p-4 text-center w-full h-full flex items-center justify-center">
                                 {giftContent.type === 'image' ? (
                                    <img src={giftContent.data} className="max-w-full max-h-full rounded-md" />
                                ) : (
                                    <p className="text-sky-500 font-bold text-lg">{giftContent.data}</p>
                                )}
                             </div>

                             {/* Canvas */}
                             <canvas 
                                ref={canvasRef}
                                width={330} height={330}
                                className={`absolute inset-0 w-full h-full touch-none z-10 ${!readOnly ? 'opacity-60' : ''}`}
                                onMouseMove={e => e.buttons === 1 && handleScratch(e)}
                                onTouchMove={handleScratch}
                             />
                        </div>
                        
                        <div className="h-6 w-full flex justify-center items-center gap-2 mt-1">
                             <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. KAWAII STAMP LAYOUT (Default)
    return (
        <div 
            className="relative group cursor-pointer select-none" 
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Outer Frame (Blue Stamp Look) */}
            <div className="w-[380px] h-[500px] bg-[#9FB6D8] p-4 rounded-xl shadow-xl relative overflow-hidden flex flex-col items-center transition-colors duration-500">
                
                {/* Decorative Dashed Border inside Blue Frame */}
                <div className="absolute inset-1.5 border-2 border-dashed border-white/40 rounded-lg pointer-events-none"></div>

                {/* --- INNER CONTENT --- */}
                <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col relative z-10 shadow-sm">
                    
                    {/* Hidden Content Area */}
                    <div className="relative w-full h-[320px] bg-white flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center p-4">
                             {giftContent.type === 'image' ? (
                                <img src={giftContent.data} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                            ) : (
                                <p className="text-[#E85D48] text-center font-bold text-xl font-mono leading-relaxed break-words px-2">
                                    {giftContent.data}
                                </p>
                            )}
                        </div>

                        {/* Peeking Beige Cat (Bottom Left of Area) */}
                        <div className="absolute bottom-[-4px] left-4 w-12 h-10 bg-[#F3F0D4] rounded-t-xl z-10 flex justify-center items-center">
                             {/* Ears */}
                             <div className="absolute -top-3 left-0 w-4 h-4 bg-[#F3F0D4] clip-triangle" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
                             <div className="absolute -top-3 right-0 w-4 h-4 bg-[#F3F0D4] clip-triangle" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
                             {/* Face */}
                             <div className="flex gap-2 mt-1">
                                 <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                 <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                             </div>
                        </div>

                        <canvas 
                            ref={canvasRef}
                            width={348} 
                            height={320}
                            className={`absolute top-0 left-0 w-full h-full touch-none z-20 ${!readOnly ? 'opacity-50' : ''}`}
                            onMouseMove={e => e.buttons === 1 && handleScratch(e)}
                            onTouchMove={handleScratch}
                        />
                    </div>

                    {/* Bottom Area */}
                    <div className="flex-1 bg-white flex flex-col items-center justify-center relative pb-2 border-t border-dashed border-gray-100">
                         <h2 className="text-3xl font-black text-[#E85D48] tracking-widest uppercase mb-2" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                            SURPRISE
                         </h2>
                         <div className="bg-[#9FB6D8] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border-2 border-white/50 shadow-sm">
                             Scratch Card
                         </div>
                    </div>
                </div>

                {/* Stamp Icon Overlay */}
                <div className="absolute top-6 right-6 w-16 h-16 opacity-80 pointer-events-none z-30">
                    <div className="w-full h-full border-2 border-[#8CA5C8]/50 rounded-full flex items-center justify-center rotate-12">
                        <Sparkles className="w-8 h-8 text-[#8CA5C8]/50" />
                    </div>
                </div>
            </div>
        </div>
    );
  };

  // 3. Balloon Pop (With Variants)
  const RenderBalloon = ({ variant }) => {
    
    // Configs
    const styles = {
        'balloon-kawaii': { color: '#EC4899', gradient: ['#FBCFE8', '#EC4899'], bow: '🎀', type: 'heart', confetti: ['#F9A8D4', '#FDE047', '#67E8F9'] },
        'balloon-classic': { color: '#EF4444', gradient: ['#FCA5A5', '#EF4444'], bow: '🧶', type: 'round', confetti: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'] },
        'balloon-blue':    { color: '#3B82F6', gradient: ['#93C5FD', '#3B82F6'], bow: '⭐', type: 'round', confetti: ['#3B82F6', '#60A5FA', '#DBEAFE'] }
    };

    const theme = styles[variant] || styles['balloon-kawaii'];

    const handlePop = (e) => {
        e.stopPropagation();
        if(!readOnly || isOpen) return;
        
        const audio = new Audio('/sounds/balloon-burst.mp3');
        audio.play().catch(() => {});
        
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
            origin: { x, y },
            particleCount: 150,
            spread: 80,
            colors: theme.confetti,
            shapes: ['circle', 'star']
        });

        setIsOpen(true);
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
            {!isOpen ? (
                <div 
                    onClick={handlePop}
                    className="relative cursor-pointer group hover:-translate-y-4 transition-transform duration-500 ease-in-out animate-[bounce_3s_infinite]"
                >
                    {/* --- THE BALLOON --- */}
                    <div className="relative z-20 hover:scale-105 transition-transform duration-300 drop-shadow-xl">
                         {theme.type === 'heart' ? (
                             // Heart Shape
                             <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
                                <path d="M100 180C100 180 10 120 10 60C10 25 40 5 70 5C88 5 95 15 100 25C105 15 112 5 130 5C160 5 190 25 190 60C190 120 100 180 100 180Z" fill={`url(#grad-${variant})`} />
                                <defs>
                                    <radialGradient id={`grad-${variant}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70 40) rotate(90) scale(120)">
                                        <stop stopColor={theme.gradient[0]} /> 
                                        <stop offset="1" stopColor={theme.gradient[1]} /> 
                                    </radialGradient>
                                </defs>
                                <ellipse cx="60" cy="50" rx="20" ry="10" transform="rotate(-45 60 50)" fill="white" fillOpacity="0.4" />
                             </svg>
                         ) : (
                             // Round Shape
                             <div 
                                className="w-40 h-48 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] relative"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, ${theme.gradient[0]}, ${theme.gradient[1]})`,
                                    boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1)'
                                }}
                             >
                                 <div className="absolute top-8 left-8 w-8 h-4 bg-white/40 rounded-[50%] rotate-[-45deg] filter blur-[2px]"></div>
                             </div>
                         )}

                         {/* Kawaii Face (Only on Kawaii variant) */}
                         {theme.type === 'heart' && (
                             <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80">
                                 <div className="flex gap-8 mb-1">
                                     <div className="w-3 h-3 bg-[#831843] rounded-full animate-blink"></div>
                                     <div className="w-3 h-3 bg-[#831843] rounded-full animate-blink"></div>
                                 </div>
                                 <div className="w-4 h-2 border-b-2 border-[#831843] rounded-full"></div>
                             </div>
                         )}
                    </div>

                    {/* Ribbon/Knot */}
                    <div className="absolute top-[170px] left-1/2 -translate-x-1/2 text-4xl z-30 drop-shadow-md rotate-[-5deg] grayscale-[0.2]">
                        {theme.bow}
                    </div>

                    {/* String */}
                    <svg width="40" height="150" viewBox="0 0 40 150" className="absolute top-[170px] left-[calc(50%-20px)] z-10 opacity-60">
                         <path d="M20,0 Q30,20 20,40 Q10,60 20,80 Q30,100 20,120" fill="none" stroke={theme.color} strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
            ) : (
                <div 
                    className="animate-in zoom-in-50 duration-500 ease-out max-w-sm w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute -top-6 -left-6 text-4xl animate-bounce delay-100">☁️</div>
                    <div className="bg-[#FFFBEB] p-6 rounded-[30px] shadow-xl border-[6px] border-[#FCD34D] border-dashed flex flex-col items-center gap-4 relative overflow-hidden">
                        <h3 className="text-2xl font-black text-yellow-500 tracking-wider uppercase">Yay!</h3>
                        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border-2 border-yellow-100">
                             {giftContent.type === 'image' ? (
                                <img src={giftContent.data} className="w-full h-auto rounded-lg object-contain" />
                            ) : (
                                <p className="text-center text-lg text-gray-700 font-medium font-handwriting">{giftContent.data}</p>
                            )}
                        </div>
                        {readOnly && <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-xs font-bold text-yellow-600 uppercase tracking-widest bg-yellow-100 px-4 py-1 rounded-full">Reset</button>}
                    </div>
                </div>
            )}
        </div>
    );
  };



  // --- MAIN RENDER ---

  const renderContent = () => {
     if (currentStyle?.startsWith('scratch')) return <RenderScratchCard variant={currentStyle} />;
     if (currentStyle?.startsWith('balloon')) return <RenderBalloon variant={currentStyle} />;
     return renderEnvelope(); 
  };

  // EDIT MODE - INITIAL STATE (No Content)
  if (!giftContent.type && !isEditingContent) {
    if (readOnly) return null; // Should not happen in readOnly if empty
    return (
       <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
         <div className="flex flex-col items-center gap-6 max-w-md w-full animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add Surprise Gift</h3>
            {!uploadType ? (
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => setUploadType('image')}
                  className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Upload className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-bold text-gray-900">Upload Image</h4>
                    <p className="text-xs text-gray-500">Photo, coupon, ticket...</p>
                  </div>
                </button>
                <button
                  onClick={() => setUploadType('text')}
                  className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Type className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-bold text-gray-900">Write Message</h4>
                    <p className="text-xs text-gray-500">Secret note, code, riddle...</p>
                  </div>
                </button>
              </div>
            ) : uploadType === 'image' ? (
              <div className="w-full">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 bg-white rounded-xl p-8 text-center hover:border-gray-900 hover:bg-gray-50 transition-all">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="font-bold text-gray-900">Click to upload</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <button onClick={() => setUploadType(null)} className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
              </div>
            ) : (
              <div className="w-full">
                <textarea
                  placeholder="Type your secret here..."
                  className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-gray-900"
                  onBlur={(e) => { if(e.target.value.trim()) handleTextSubmit(e.target.value); }}
                  autoFocus
                />
                <button onClick={() => setUploadType(null)} className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
              </div>
            )}
         </div>
       </div>
    );
  }

  // RE-EDIT MODE (When user wants to change content)
  if (!readOnly && isEditingContent) {
      return (
        <div className="w-full h-full flex items-center justify-center relative bg-gray-50/90 backdrop-blur z-50">
             <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-gray-200 animate-in zoom-in duration-200">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-lg">Change Content</h3>
                     <button onClick={() => setIsEditingContent(false)}><X className="w-5 h-5" /></button>
                 </div>
                 <div className="flex flex-col gap-2">
                     <button onClick={() => setUploadType('image')} className="p-3 border rounded-lg hover:bg-gray-50 text-left font-medium flex items-center gap-2"><Upload className="w-4 h-4"/> New Image</button>
                     <button onClick={() => setUploadType('text')} className="p-3 border rounded-lg hover:bg-gray-50 text-left font-medium flex items-center gap-2"><Type className="w-4 h-4"/> New Text</button>
                 </div>
                 
                 {/* Inline Editor if selected */}
                 {uploadType === 'text' && (
                     <textarea 
                        className="w-full border p-2 mt-4 rounded-lg" 
                        placeholder="New text..." 
                        onBlur={(e) => handleTextSubmit(e.target.value)}
                        autoFocus
                     />
                 )}
                 {uploadType === 'image' && (
                     <input 
                        type="file" 
                        className="w-full border p-2 mt-4 rounded-lg" 
                        onChange={handleImageUpload}
                     />
                 )}
             </div>
        </div>
      );
  }

  // VIEW MODE (Builder & Preview)
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-visible">
        
       {/* The Gift Render */}
       {renderContent()}

       {/* Builder Controls */}
       {!readOnly && (
           <div className="absolute top-4 right-4 flex gap-2 z-50">
               <button 
                  onClick={() => onOpenDrawer('STYLE', { categories: GIFT_STYLES, currentStyle }, handleStyleSelect, 'Gift Style')}
                  className="bg-white text-black p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:scale-105 transition-transform"
                  title="Change Style"
               >
                   <PenTool className="w-4 h-4" />
               </button>
               <button 
                  onClick={() => setIsEditingContent(true)}
                  className="bg-white text-black p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:scale-105 transition-transform"
                  title="Edit Content"
               >
                   <RefreshCw className="w-4 h-4" />
               </button>
           </div>
       )}
    </div>
  );
}
