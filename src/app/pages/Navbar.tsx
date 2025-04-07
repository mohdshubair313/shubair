"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AIChatButton from "@/components/AIChatButton";
import { Menu, X } from "lucide-react";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <div className="cursor-pointer fixed bottom-6 right-6 z-40">
        <AIChatButton />
      </div>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <div
      className={cn(
        "fixed top-6 inset-x-0 max-w-5xl mx-auto z-50 backdrop-blur-sm px-4",
        className
      )}
    >
      <nav
        className="relative flex justify-between items-center px-6 py-3 rounded-full 
        border border-transparent shadow-xl bg-white/70 dark:bg-black/30 dark:border-white/[0.2] 
        transition-all duration-300"
      >
        {/* ✅ Logo or Site Title (Optional) */}
        <div className="text-xl font-bold dark:text-white text-black">Shubair</div>

        {/* ✅ Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <MenuItem
              key={index}
              setActive={setActive}
              active={active}
              item={item.name}
              href={item.href}
            />
          ))}
        </div>

        {/* ✅ Theme Toggle and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 bg-white/90 dark:bg-black/80 rounded-xl p-4 shadow-xl"
          >
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-medium text-black dark:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div
      onMouseEnter={() => setActive(item)}
      onMouseLeave={() => setActive(null)}
      className="relative px-2 py-1 cursor-pointer"
    >
      <Link
        href={href}
        className="text-base font-semibold text-black dark:text-white transition-colors hover:text-primary"
      >
        {item}
      </Link>

      <AnimatePresence>
        {active === item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 p-2 
                     bg-white dark:bg-black/80 rounded-xl shadow-lg 
                     backdrop-blur-lg border border-gray-200 dark:border-gray-800 z-10"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Explore {item}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarDemo;
