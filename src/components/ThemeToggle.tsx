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

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-cyan-200/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
        }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {theme === "dark" ? (
          <FiMoon className="w-5 h-5 text-cyan-400" />
        ) : (
          <FiSun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
