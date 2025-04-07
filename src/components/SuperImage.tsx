"use client";

import Image from "next/image";
import image from "../app/assets/image.jpg"

export default function SuperImage() {
  return (
    <div className="flex justify-center items-center relative w-full sm:mt-20 md:mt-16" >
      {/* Glow ring effect */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] 
                      bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400 
                      rounded-full blur-2xl opacity-30 dark:opacity-20 z-0" />

      {/* Profile Image */}
      <div className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 
                      border-white dark:border-neutral-800 bg-white dark:bg-black">
        <Image
          src={image}
          alt="Shubair"
          width={450}
          height={450}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

  );

}
