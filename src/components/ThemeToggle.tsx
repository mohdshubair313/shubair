"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react"; // Better icons

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-12 h-12 
                 bg-white dark:bg-gray-900 shadow-lg dark:shadow-md 
                 rounded-full backdrop-blur-md border border-gray-200 dark:border-gray-700
                 hover:scale-110 transition-all duration-300 cursor-pointer"
      whileTap={{ scale: 0.9 }}
    >
      {/* Animated Icons */}
      {theme === "dark" ? (
        <Sun className="lucide lucide-sun w-6 h-6 text-yellow-500 animate-pulse" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300 animate-pulse" />
      )}
    </motion.button>
  );
}
