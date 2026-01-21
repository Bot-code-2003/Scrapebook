'use client';
import React, { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

// Collapsible Section Component
function AccordionSection({ title, icon, isOpen, onToggle, selectedLabel, children }) {
  return (
    <div className={`border transition-all duration-300 rounded-xl overflow-hidden ${isOpen ? 'border-gray-200 shadow-sm bg-white' : 'border-transparent bg-gray-50'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div className="text-left">
            <h3 className="font-bold text-sm tracking-wide text-gray-900">{title}</h3>
            {!isOpen && selectedLabel && (
              <span className="text-xs text-gray-500 font-medium">{selectedLabel}</span>
            )}
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function BackgroundEditorDrawer({ bgPattern, setBgPattern, bgColor, setBgColor, pageBorder, setPageBorder, soundId, setSoundId, animId, setAnimId, bookStyle, setBookStyle, bgOptions, colorOptions, borderOptions, soundOptions, animOptions, bookStyleOptions, onClose }) {
  // Track which section is open (only one at a time)
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  // Get current selection labels
  const getSelectedTextureLabel = () => bgOptions?.find(opt => opt.id === bgPattern)?.label || 'Grid';
  const getSelectedColorLabel = () => colorOptions?.find(opt => opt.value === bgColor)?.label || 'Cream';
  const getSelectedBorderLabel = () => borderOptions?.find(opt => opt.id === pageBorder)?.label || 'None';
  const getSelectedAnimLabel = () => animOptions?.find(opt => opt.id === animId)?.label || 'Classic Flip';
  const getSelectedSoundLabel = () => soundOptions?.find(opt => opt.id === soundId)?.label || 'Silent';

  return (
    <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300 overflow-y-auto">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>
            
            <header className="mb-6 mt-2">
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Page Theme</h2>
                <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
                <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed">Customize the look and feel of your scrapbook pages.</p>
            </header>

            <div className="flex flex-col gap-3 pb-10">
                
                {/* BOOK STYLE SECTION */}
                {bookStyleOptions && (
                  <AccordionSection
                    title="Book Style"
                    icon="📚"
                    isOpen={openSection === 'bookStyle'}
                    onToggle={() => toggleSection('bookStyle')}
                    selectedLabel={bookStyleOptions?.find(opt => opt.id === bookStyle)?.label}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {bookStyleOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setBookStyle(opt.id)}
                          className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                            bookStyle === opt.id 
                              ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm' 
                              : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-8 h-10 bg-white rounded shadow-sm border border-gray-100 ${opt.preview}`}></div>
                          <span className="font-bold text-xs">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </AccordionSection>
                )}

                {/* TEXTURES SECTION */}
                <AccordionSection
                  title="Paper Texture"
                  icon="📜"
                  isOpen={openSection === 'texture'}
                  onToggle={() => toggleSection('texture')}
                  selectedLabel={getSelectedTextureLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {bgOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setBgPattern(opt.id)}
                        className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                          bgPattern === opt.id 
                            ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div 
                          className="w-full flex-1 border border-black/5 rounded-lg mb-1 overflow-hidden"
                          style={{
                            background: opt.value === 'none' ? '#f5f5f5' : (opt.value.includes('url') ? opt.value : undefined),
                            backgroundColor: '#FAFAFA',
                          }}
                        >
                          {opt.id === 'dots' && <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
                          {opt.id === 'lines' && <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 10px' }}></div>}
                        </div>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* BORDERS SECTION */}
                <AccordionSection
                  title="Page Border"
                  icon="🖼️"
                  isOpen={openSection === 'border'}
                  onToggle={() => toggleSection('border')}
                  selectedLabel={getSelectedBorderLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {borderOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPageBorder(opt.id)}
                        className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                          pageBorder === opt.id 
                            ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div 
                          className={`w-full flex-1 mb-1 bg-[#FAFAFA] rounded-lg ${opt.preview}`}
                          style={opt.id === 'cute-rainbow' ? { backgroundImage: 'linear-gradient(to right, #ff9999, #ffff99, #99ff99, #99ffff, #9999ff, #ff99ff)' } : {}}
                        >
                        </div>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* COLORS SECTION */}
                <AccordionSection
                  title="Paper Color"
                  icon="🎨"
                  isOpen={openSection === 'color'}
                  onToggle={() => toggleSection('color')}
                  selectedLabel={getSelectedColorLabel()}
                >
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                    {colorOptions.map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => setBgColor(opt.value)}
                        className={`flex items-center gap-4 p-3 border rounded-xl transition-all ${
                          bgColor === opt.value
                            ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm'
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >   
                        <div 
                          className="w-8 h-8 rounded-full border border-black/10 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: opt.value }}
                        ></div>
                        <span className="font-bold text-xs">{opt.label}</span>
                        {bgColor === opt.value && <Check className="ml-auto w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* ANIMATION SECTION */}
                <AccordionSection
                  title="Flip Style"
                  icon="📖"
                  isOpen={openSection === 'animation'}
                  onToggle={() => toggleSection('animation')}
                  selectedLabel={getSelectedAnimLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {animOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setAnimId(opt.id)}
                        className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                          animId === opt.id 
                            ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* SOUNDS SECTION */}
                <AccordionSection
                  title="Ambience"
                  icon="🔊"
                  isOpen={openSection === 'sound'}
                  onToggle={() => toggleSection('sound')}
                  selectedLabel={getSelectedSoundLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {soundOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSoundId(opt.id);
                          if(opt.src) {
                            const audio = new Audio(opt.src);
                            audio.play().catch(e => console.error(e));
                          }
                        }}
                        className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                          soundId === opt.id 
                            ? 'border-lime-400 bg-lime-50 text-lime-800 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{opt.id === 'none' ? '🔇' : '🔊'}</span>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

            </div>
            
             <div className="mt-auto pt-4 text-center border-t border-gray-100">
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/5"
                 >
                    Apply Theme
                 </button>
            </div>
    </div>
  );
}
