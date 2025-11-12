import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { NavbarDemo } from "../pages/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: {
    template: "%s | Mohd Shubair - Full Stack Developer & AI Enthusiast",
    default: "Mohd Shubair | Full Stack Developer & AI Enthusiast",
  },
  description:
    "Wanted to know about me? so lets dive in to my intro and my project..",
  keywords: [
    "Shaikh Mohd Shubair",
    "Mohd Shubair",
    "Full Stack Developer",
    "AI Developer",
    "Software Engineer",
    "Portfolio Website",
    "React Developer",
    "Next.js Developer",
    "Machine Learning",
    "AI Chatbot",
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Python Developer",
  ],
  openGraph: {
    title: "Mohd Shubair | Full Stack Developer & AI Enthusiast",
    description:
      "Discover Mohd Shubair’s portfolio showcasing AI-driven projects, full-stack development skills, and innovative solutions.",
    url: "https://shubair.vercel.app/",
    type: "website",
    images: [
      {
        url: "./OgImage.png",
        width: 1200,
        height: 630,
        alt: "Mohd Shubair Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://x.com/Shubair313", 
    title: "Mohd Shubair | Full Stack Developer & AI Enthusiast",
    description:
      "Explore Mohd Shubair's portfolio showcasing AI projects, full-stack development skills, and innovative solutions.",
    images: ["https://x.com/Shubair313/photo"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
       <NavbarDemo />
        {children}
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
