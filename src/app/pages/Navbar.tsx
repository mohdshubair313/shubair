"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle"; // ✅ Import toggle button
import AIChatButton from "@/components/AIChatButton";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />

      <div className='cursor-pointer'>
      <AIChatButton />
      </div>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-6 inset-x-0 max-w-3xl mx-auto z-50 backdrop-blur-sm", className)}>
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative flex justify-between items-center px-8 py-4 rounded-full border border-transparent shadow-xl 
                   bg-white/70 dark:bg-black/30 dark:border-white/[0.2] transition-all duration-300"
      >
        {/* ✅ Left Side: Navigation Links */}
        <div className="flex space-x-6">
          {[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: "Contact", href: "/contact" },
            { name: "Blogs", href: "/blogs" },
          ].map((item, index) => (
            <MenuItem key={index} setActive={setActive} active={active} item={item.name} href={item.href} />
          ))}
        </div>

        {/* ✅ Right Side: Theme Toggle */}
        <div className="ml-auto">
          <ThemeToggle />
        </div>

      </nav>
    </div>
  );
}

const MenuItem = ({
  setActive,
  active,
  item,
  href,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  href: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative px-4 py-2 cursor-pointer">
      <Link href={href} className="text-lg font-semibold text-black dark:text-white transition-all duration-300">
        {item}
      </Link>

      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 p-2 
                     bg-white dark:bg-black/80 rounded-xl shadow-lg 
                     backdrop-blur-lg border border-gray-200 dark:border-gray-800"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">Explore {item}</p>
        </motion.div>
      )}
    </div>
  );
};

export default NavbarDemo;
