'use client'
 
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
 
const playCameraClickSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // 1. High frequency mechanical "click"
    const osc = ctx.createOscillator();
    const gainOsc = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
    
    gainOsc.gain.setValueAtTime(0.08, ctx.currentTime);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gainOsc);
    gainOsc.connect(ctx.destination);
    
    // 2. White noise burst (mechanical shutter blade snap)
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(4, ctx.currentTime);
    
    const gainNoise = ctx.createGain();
    gainNoise.gain.setValueAtTime(0.06, ctx.currentTime);
    gainNoise.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    noise.connect(filter);
    filter.connect(gainNoise);
    gainNoise.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
    
    noise.start();
    noise.stop(ctx.currentTime + 0.05);
  } catch (error) {
    console.warn("Audio click failed to play", error);
  }
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
 
  useEffect(() => {
    setMounted(true)
  }, [])
 
  const handleToggle = () => {
    playCameraClickSound();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={`h-8 w-8 flex items-center justify-center rounded-full text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {mounted && (theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      ))}
    </button>
  )
}
 
export default ThemeToggle