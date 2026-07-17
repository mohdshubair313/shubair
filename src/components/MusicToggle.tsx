"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Royalty-free relaxing ambient music (Pixabay license — free for personal & commercial use)
// "Ambient Piano & Strings" — a calm, relaxing, lo-fi style track
const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2024/11/28/audio_3a38905167.mp3";

const FADE_DURATION = 1.5; // seconds
const TARGET_VOLUME = 0.3;

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const fadeTo = useCallback((audio: HTMLAudioElement, target: number, onDone?: () => void) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.02;
    const intervalMs = (FADE_DURATION * 1000 * step) / Math.abs(target - audio.volume || 0.01);

    fadeIntervalRef.current = setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) < step) {
        audio.volume = target;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        onDone?.();
        return;
      }
      audio.volume = audio.volume + (diff > 0 ? step : -step);
    }, intervalMs);
  }, []);

  const handleToggle = useCallback(async () => {
    try {
      // Initialize audio element on first play
      if (!audioRef.current) {
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = "auto";
        audioRef.current = audio;
      }

      const audio = audioRef.current;

      if (isPlaying) {
        // Fade out then pause
        fadeTo(audio, 0, () => {
          audio.pause();
        });
        setIsPlaying(false);
      } else {
        // Play then fade in
        await audio.play();
        fadeTo(audio, TARGET_VOLUME);
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Failed to toggle music:", err);
    }
  }, [isPlaying, fadeTo]);

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle background music"
      className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
      title={isPlaying ? "Stop relaxing music" : "Play relaxing music"}
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 animate-[pulse_1.5s_infinite]" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
