import type { Metadata } from "next";
import "./globals.css";
import { Inter, Outfit, Caveat, Reenie_Beanie } from 'next/font/google'
import { NavbarDemo } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
})

const reenie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    template: "%s | Mohd Shubair — Software Engineer",
    default: "Mohd Shubair — Software Engineer",
  },
  description:
    "Full-stack engineer and AI specialist building intelligent systems and pixel-perfect interfaces.",
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
    title: "Mohd Shubair — Software Engineer",
    description:
      "Full-stack engineer and AI specialist building intelligent systems and pixel-perfect interfaces.",
    url: "https://shubair.vercel.app/",
    type: "website",
    images: [
      {
        url: "./opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mohd Shubair Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://x.com/Shubair313",
    title: "Mohd Shubair — Software Engineer",
    description:
      "Full-stack engineer and AI specialist building intelligent systems and pixel-perfect interfaces.",
    images: ["./opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${reenie.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-noise`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NavbarDemo />
          {children}
          <Analytics />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
