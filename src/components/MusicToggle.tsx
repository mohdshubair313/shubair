"use client";
 
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
 
export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    setMounted(true);
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      intervalsRef.current.forEach(clearInterval);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(console.error);
      }
    };
  }, []);
 
  const initAudio = () => {
    if (audioCtxRef.current) return;
 
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
 
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
 
    // Master volume node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;
 
    // Lowpass filter for smooth, warm ambient sound
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.connect(masterGain);
 
    // Delay effect for spaciousness
    const delay = ctx.createDelay(1.0);
    delay.delayTime.setValueAtTime(0.7, ctx.currentTime);
    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.25, ctx.currentTime);
 
    // Connect delay loop
    filter.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay);
    delayGain.connect(masterGain);
 
    // Beautiful major 7th / 9th chords: C3, G3, C4, E4, B4
    const frequencies = [130.81, 196.00, 261.63, 329.63, 493.88];
    const types: OscillatorType[] = ["triangle", "sine", "triangle", "sine", "sine"];
    const gains: GainNode[] = [];
 
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
 
      osc.type = types[idx];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
 
      osc.connect(gainNode);
      gainNode.connect(filter);
 
      osc.start(0);
      gains.push(gainNode);
    });
 
    // Slow LFO-like gain modulation loop
    const startTime = ctx.currentTime;
    const intervals = gains.map((gainNode, idx) => {
      const baseGain = 0.05 - (idx * 0.007); // Higher voices are quieter
      const period = 6 + idx * 2.8; // Different rate of change for each note
 
      return setInterval(() => {
        if (ctx.state === "closed") return;
        const time = ctx.currentTime - startTime;
        const targetGain = baseGain * (0.35 + 0.65 * Math.sin((2 * Math.PI * time) / period));
        gainNode.gain.setTargetAtTime(targetGain, ctx.currentTime, 1.2);
      }, 100);
    });
 
    intervalsRef.current = intervals;
  };
 
  const handleToggle = async () => {
    try {
      if (!audioCtxRef.current) {
        initAudio();
      }
 
      const ctx = audioCtxRef.current;
      const masterGain = masterGainRef.current;
      if (!ctx || !masterGain) return;
 
      if (isPlaying) {
        // Fade out smoothly
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        
        // Suspend context after fade-out completes to save resource/CPU
        setTimeout(() => {
          if (isMountedRef.current && ctx.state === "running") {
            ctx.suspend().catch(console.error);
          }
        }, 1250);
        
        setIsPlaying(false);
      } else {
        // Resume context if suspended
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        
        // Fade in smoothly
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5);
        
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Failed to toggle ambient music:", err);
    }
  };
 
  if (!mounted) return null;
 
  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle background music"
      className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
      title={isPlaying ? "Stop smoothing music" : "Play smoothing music"}
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 animate-[pulse_1.5s_infinite]" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
