"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      // REMOVED fixed positioning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Adjusted padding and background for better fit in the navbar
      className="p-2 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border border-cyan-200/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"

      // 🚀 CREATIVE MOTION LOGIC:
      // y: 0 in light mode (aligned), y: 10 in dark mode (misaligned/down)
      animate={{
        rotate: isDark ? 180 : 0, // 180 degree rotation
        y: isDark ? 10 : 0,
      }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <motion.div
        // Counter-rotate the icon to keep it upright while the button spins
        initial={false}
        animate={{
          rotate: isDark ? -180 : 0,
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        {isDark ? (
          <FiMoon className="w-5 h-5 text-cyan-400" />
        ) : (
          <FiSun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}