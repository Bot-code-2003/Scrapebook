'use client';
import React, { useState } from 'react';
import { Upload, Type, Gift, X } from 'lucide-react';

export default function GiftElement({ content, onUpdate, isCover, readOnly }) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null);

  const giftContent = content || { type: null, data: null };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ type: 'image', data: event.target.result });
        setUploadType(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = (text) => {
    if (text.trim()) {
      onUpdate({ type: 'text', data: text });
      setUploadType(null);
    }
  };

  // EDIT MODE
  if (!readOnly) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {!giftContent.type ? (
          <div className="flex flex-col items-center gap-6 max-w-md w-full">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Add Gift Content</h3>
            <p className="text-sm text-gray-500 text-center">
              Choose what surprise you want to hide inside this gift
            </p>

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
                    <p className="text-xs text-gray-500">Add a photo or picture</p>
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
                    <p className="text-xs text-gray-500">Add a secret message</p>
                  </div>
                </button>
              </div>
            ) : uploadType === 'image' ? (
              <div className="w-full">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 bg-white rounded-xl p-8 text-center hover:border-gray-900 hover:bg-gray-50 transition-all">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="font-bold text-gray-900">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => setUploadType(null)}
                  className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="w-full">
                <textarea
                  placeholder="Write your secret message here..."
                  className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-gray-900 text-gray-900"
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      handleTextSubmit(e.target.value);
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => setUploadType(null)}
                  className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 max-w-md w-full">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 w-full">
              {giftContent.type === 'image' ? (
                <img
                  src={giftContent.data}
                  alt="Gift content"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-900 text-center whitespace-pre-wrap">
                  {giftContent.data}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500 text-center">
              ✨ This will appear as an elegant envelope in preview mode
            </p>
          </div>
        )}
      </div>
    );
  }

  // PREVIEW MODE - Realistic Envelope Animation
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-visible bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div 
        className="relative cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
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
    </div>
  );
}
