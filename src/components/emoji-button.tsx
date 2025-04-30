"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BubbleButtonProps {
  icon: React.ReactNode;
  children: ReactNode;
  emergingInterval: number;
  color: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  waveAmplitude: number;
  waveFrequency: number;
  riseHeight: number;
  duration: number;
}

export default function BubbleButton({
  icon,
  children,
  emergingInterval,
  color,
}: BubbleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleIdRef = useRef(0);
  const lastBubbleTimeRef = useRef(0);

  const createBubble = useCallback((x: number, y: number) => {
    const newBubble: Bubble = {
      id: bubbleIdRef.current++,
      x,
      y,
      createdAt: Date.now(),
      waveAmplitude: Math.random() * 30 + 10,
      waveFrequency: Math.random() * 2 + 1,
      riseHeight: Math.random() * 40 + 20,
      duration: Math.random() * 0.5 + 1,
    };
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current && isHovered) {
        const currentTime = Date.now();
        if (currentTime - lastBubbleTimeRef.current >= emergingInterval) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left - 35;
          const y = e.clientY - rect.top - 60;
          createBubble(x, y);
          lastBubbleTimeRef.current = currentTime;
        }
      }
    },
    [isHovered, createBubble, emergingInterval],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prevBubbles) =>
        prevBubbles.filter(
          (bubble) => Date.now() - bubble.createdAt < bubble.duration * 1000,
        ),
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={`group relative px-4 py-2 rounded-full overflow-visible transition-colors duration-300`}
      style={
        {
          "--button-color": color,
          backgroundColor: `${color}1a`,
          color: color,
        } as React.CSSProperties
      }
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="relative z-10 text-lg font-semibold">{children}</span>
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute pointer-events-none"
            initial={{ x: bubble.x, y: bubble.y, scale: 0 }}
            animate={{
              x: [
                bubble.x,
                bubble.x +
                  Math.sin((Math.PI / 2) * bubble.waveFrequency) *
                    bubble.waveAmplitude,
                bubble.x +
                  Math.sin(Math.PI * bubble.waveFrequency) *
                    bubble.waveAmplitude,
                bubble.x,
              ],
              y: [
                bubble.y,
                bubble.y - bubble.riseHeight * 0.6,
                bubble.y - bubble.riseHeight * 0.8,
                bubble.y - bubble.riseHeight,
              ],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: bubble.duration,
              times: [0, 0.3, 0.8, 1],
              ease: "easeInOut",
            }}
          >
            {icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.button>
  );
}