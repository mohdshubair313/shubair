'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import MusicToggle from '@/components/MusicToggle'
 
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blog' },
]
 
export function Navbar() {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-900 flex items-center justify-between px-5 sm:px-8 py-2.5 sm:py-2">
      <nav className="flex flex-wrap items-center gap-3.5 sm:gap-4 text-[13px] sm:text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <MusicToggle />
        <ThemeToggle />
      </div>
    </div>
  )
}


