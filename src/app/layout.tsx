import type { Metadata } from "next";
import "./globals.css";
import { NavbarDemo } from "./pages/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Mohd Shubair - Full Stack Developer & AI Enthusiast",
    default: "Mohd Shubair | Full Stack Developer & AI Enthusiast",
  },
  description:
    "Explore Mohd Shubair's portfolio - a skilled Full Stack Developer & AI enthusiast. Discover my projects, skills, AI-powered chatbot, and more!",
  keywords: [
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
    url: "https://yourdomain.com",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Add an actual OG image URL
        width: 1200,
        height: 630,
        alt: "Mohd Shubair Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // If applicable
    title: "Mohd Shubair | Full Stack Developer & AI Enthusiast",
    description:
      "Explore Mohd Shubair's portfolio showcasing AI projects, full-stack development skills, and innovative solutions.",
    images: ["https://yourdomain.com/twitter-image.jpg"], // Add an actual Twitter image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <ThemeProvider attribute="class">
       <NavbarDemo />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
