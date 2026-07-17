"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Self-hosted royalty-free ambient music — no CORS issues
// "Ambient Piano" — Pixabay License (free for personal & commercial use)
const MUSIC_SRC = "/ambient-music.mp3";

const FADE_MS = 1200;
const FADE_STEPS = 30;
const MAX_VOLUME = 0.25;

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up on unmount
  useEffect(() => {
    setMounted(true);
    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Smooth volume fade
  const fadeVolume = useCallback(
    (audio: HTMLAudioElement, from: number, to: number, onDone?: () => void) => {
      if (fadeRef.current) clearInterval(fadeRef.current);

      const stepSize = (to - from) / FADE_STEPS;
      const stepMs = FADE_MS / FADE_STEPS;
      let current = from;

      fadeRef.current = setInterval(() => {
        current += stepSize;
        const reachedTarget = stepSize > 0 ? current >= to : current <= to;

        if (reachedTarget) {
          audio.volume = Math.max(0, Math.min(1, to));
          if (fadeRef.current) clearInterval(fadeRef.current);
          fadeRef.current = null;
          onDone?.();
          return;
        }
        audio.volume = Math.max(0, Math.min(1, current));
      }, stepMs);
    },
    []
  );

  // Create audio element lazily
  const getAudio = useCallback((): HTMLAudioElement => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.src = MUSIC_SRC;
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    // Handle loading errors gracefully
    audio.addEventListener("error", () => {
      console.warn("Music failed to load — check that /ambient-music.mp3 exists in /public");
      setIsLoading(false);
      setIsPlaying(false);
    });

    return audio;
  }, []);

  const handleToggle = useCallback(async () => {
    const audio = getAudio();

    if (isPlaying) {
      // ── Fade out ──
      fadeVolume(audio, audio.volume, 0, () => {
        audio.pause();
      });
      setIsPlaying(false);
    } else {
      // ── Fade in ──
      try {
        setIsLoading(true);
        audio.volume = 0;
        await audio.play();
        setIsLoading(false);
        fadeVolume(audio, 0, MAX_VOLUME);
        setIsPlaying(true);
      } catch (err) {
        setIsLoading(false);
        console.error("Playback failed:", err);
      }
    }
  }, [isPlaying, fadeVolume, getAudio]);

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-label="Toggle background music"
      className="relative h-8 w-8 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors cursor-pointer disabled:opacity-50"
      title={isPlaying ? "Stop relaxing music" : "Play relaxing music"}
    >
      {/* Animated sound ring when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-emerald-500/40 dark:border-emerald-400/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-4 w-4 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-600 dark:border-t-neutral-300 rounded-full"
        />
      ) : isPlaying ? (
        <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
