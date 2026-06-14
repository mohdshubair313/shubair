"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AIChatButton from "@/components/AIChatButton";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/#work" },
    { name: "Experience", href: "/#experience" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-4xl mx-auto z-50 px-4",
        className
      )}
    >
      <nav
        className="relative flex justify-between items-center px-6 py-3 rounded-2xl
        border border-border/40 bg-background/80 backdrop-blur-xl
        shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]
        transition-all duration-200"
      >
        {/* Logo */}
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          shubair<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-lg hover:bg-card"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle and Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-card transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-background/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-border/40 overflow-hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-card rounded-lg transition-colors"
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

export default NavbarDemo;
