"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, ElementRef } from "react";
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
  },
  {
    icon: <FaLinkedin size={22} />,
    href: "https://www.linkedin.com/in/mohd-shubair-b1a454250/",
    bgColor: "bg-[#0077b5]",
  },
  {
    icon: <FaTwitter size={22} />,
    href: "https://x.com/shubair313/",
    bgColor: "bg-[#1DA1F2]",
  },
  {
    icon: <FaEnvelope size={22} />,
    href: "mailto:shubair313@gmail.com",
    bgColor: "bg-[#EA4335]",
  },
  {
    icon: (
      <Image
        src={Peerlist}
        alt="Peerlist"
        className="w-[22px] h-[22px] text-green-500 fill-current"
      />
    ),
    href: "https://peerlist.io/shubair",
    bgColor: "bg-[#3EB489]", // Semi-green
  },
];

export default function SocialDock() {
  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<ElementRef<"div">>(null);

  return (
    <div className="absolute bottom-6 flex justify-center w-full z-50">
      <motion.div
        ref={containerRef}
        className="flex h-16 items-end gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-2 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseMove={(e) => {
          const bounds = containerRef.current?.getBoundingClientRect();
          if (bounds) mouseX.set(e.clientX - bounds.left);
        }}
      >
        {socialLinks.map(({ icon, href, bgColor }, index) => (
          <DockItem key={index} mouseX={mouseX} bgColor={bgColor}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {icon}
            </Link>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({
  children,
  mouseX,
  bgColor,
}: {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  bgColor: string;
}) {
  const ref = useRef<ElementRef<"div">>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 0;
    return val - (bounds.left + bounds.width / 2);
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 70, 40]);
  const width = useSpring(widthSync, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`flex aspect-square items-center justify-center rounded-full ${bgColor} text-white transition-all duration-300 ease-in-out shadow-md backdrop-blur-sm`}
    >
      {children}
    </motion.div>
  );
}
