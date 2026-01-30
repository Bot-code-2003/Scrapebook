'use client';
import React, { createContext, useContext, useRef, useEffect, useCallback } from 'react';

// Define all audio files upfront
const AUDIO_FILES = {
  'page-flip': '/sounds/page-flip.m4a',
  'cute-click': '/sounds/Cute-click.mp3',
  'heavy-flip': '/sounds/heavy-flip.mp3',
  'pop': '/sounds/pop.mp3',
  'scratching': '/sounds/scratching.mp3',
  'balloon-burst': '/sounds/balloon-burst.mp3',
};

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  // Store preloaded audio elements
  const audioCache = useRef({});
  const isPreloaded = useRef(false);

  // Preload all audio files on first user interaction (to comply with autoplay policies)
  useEffect(() => {
    const preloadAudio = () => {
      if (isPreloaded.current) return;
      
      Object.entries(AUDIO_FILES).forEach(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = 0.7;
        audioCache.current[key] = audio;
      });
      
      isPreloaded.current = true;
      
      // Remove listeners after first interaction
      document.removeEventListener('click', preloadAudio);
      document.removeEventListener('touchstart', preloadAudio);
    };

    // Preload on first user interaction
    document.addEventListener('click', preloadAudio, { once: true });
    document.addEventListener('touchstart', preloadAudio, { once: true });

    return () => {
      document.removeEventListener('click', preloadAudio);
      document.removeEventListener('touchstart', preloadAudio);
    };
  }, []);

  // Play a sound by key
  const playSound = useCallback((soundKey) => {
    const audio = audioCache.current[soundKey];
    if (audio) {
      // Clone the audio to allow overlapping plays
      audio.currentTime = 0;
      audio.play().catch((e) => {
        // Ignore autoplay errors silently
        console.debug('Audio play blocked:', e.message);
      });
    } else {
      // Fallback: create audio on-demand if not preloaded
      const src = AUDIO_FILES[soundKey];
      if (src) {
        const fallbackAudio = new Audio(src);
        fallbackAudio.volume = 0.7;
        fallbackAudio.play().catch(() => {});
      }
    }
  }, []);

  return (
    <AudioContext.Provider value={{ playSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    // Return a no-op if used outside provider
    return { playSound: () => {} };
  }
  return context;
}
