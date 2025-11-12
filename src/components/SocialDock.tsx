"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, memo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Peerlist from "../../public/Peerlist--Streamline-Simple-Icons.svg";

const socialLinks = [
  {
    icon: <FaGithub size={22} />,
    href: "https://github.com/mohdshubair313",
    bgColor: "bg-gray-800",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={22} />,
    href: "https://www.linkedin.com/in/mohd-shubair-b1a454250/",
    bgColor: "bg-[#0077b5]",
    label: "LinkedIn",
  },
  {
    icon: <FaTwitter size={22} />,
    href: "https://x.com/shubair313/",
    bgColor: "bg-[#1DA1F2]",
    label: "Twitter",
  },
  {
    icon: <FaEnvelope size={22} />,
    href: "mailto:shubair313@gmail.com",
    bgColor: "bg-[#EA4335]",
    label: "Email",
  },
  {
    icon: (
      <Image
        src={Peerlist}
        alt="Peerlist"
        width={22}
        height={22}
        className="w-[22px] h-[22px]"
      />
    ),
    href: "https://peerlist.io/shubair",
    bgColor: "bg-[#3EB489]",
    label: "Peerlist",
  },
  {
    icon: <Image width="24" height="24" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png" alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo"/>,
    href: "https://leetcode.com/mohd_shubair",
    bgColor: "bg-[#FFA500]",
    label: "Leetcode"
  }
] as const;

// Optimized spring configuration for smooth, natural motion
const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 350,
  damping: 25,
};

// Distance range for magnification effect
const DISTANCE_THRESHOLD = 150;

export default function SocialDock() {
  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute bottom-6 flex justify-center w-full z-50 pointer-events-none">
      <motion.div
        ref={containerRef}
        className="flex h-16 items-end gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-2 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.2)] pointer-events-auto"
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseMove={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - bounds.left);
        }}
        role="navigation"
        aria-label="Social media links"
      >
        {socialLinks.map((link) => (
          <DockItem key={link.label} mouseX={mouseX} {...link} />
        ))}
      </motion.div>
    </div>
  );
}

// Memoized DockItem for optimal performance
const DockItem = memo(
  ({
    icon,
    href,
    bgColor,
    label,
    mouseX,
  }: {
    icon: React.ReactNode;
    href: string;
    bgColor: string;
    label: string;
    mouseX: MotionValue<number>;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Calculate distance from mouse to icon center
    const distance = useTransform(mouseX, (val) => {
      if (!ref.current || val === Infinity) return Infinity;
      
      const bounds = ref.current.getBoundingClientRect();
      const iconCenter = bounds.left + bounds.width / 2;
      
      // Get container bounds to calculate relative position
      const container = ref.current.offsetParent?.getBoundingClientRect();
      if (!container) return Infinity;
      
      const relativeMouseX = val + container.left;
      return Math.abs(relativeMouseX - iconCenter);
    });

    // Transform distance to width with smooth interpolation
    const widthSync = useTransform(
      distance,
      [0, DISTANCE_THRESHOLD],
      [80, 40]
    );

    const width = useSpring(widthSync, SPRING_CONFIG);

    // Optional: Add height animation for more dynamic effect
    const heightSync = useTransform(
      distance,
      [0, DISTANCE_THRESHOLD],
      [80, 40]
    );

    const height = useSpring(heightSync, SPRING_CONFIG);

    return (
      <motion.div
        ref={ref}
        style={{ width, height }}
        className={`flex items-center justify-center rounded-full ${bgColor} text-white transition-colors duration-200 ease-out shadow-lg backdrop-blur-sm hover:shadow-xl will-change-transform`}
      >
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-center justify-center w-full h-full"
        >
          {icon}
        </Link>
      </motion.div>
    );
  }
);

DockItem.displayName = "DockItem";
