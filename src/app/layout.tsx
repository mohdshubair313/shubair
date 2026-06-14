import type { Metadata } from "next";
import "./globals.css";
import { Inter, Instrument_Serif, Geist_Mono } from 'next/font/google'
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-full w-full flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen w-full flex-col">
            <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0">
              <Navbar />
            </div>
            <main className="flex flex-1 flex-col">
              {children}
            </main>
          </div>
          <Analytics />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
