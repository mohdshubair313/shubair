import React from "react";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Image from "next/image";
import image from "./assets/image.jpg"
import { Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Hi👋, I am Shubair",
};

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
        {/* Left Section - Text Content */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-wide">
              Hey 👋, I am Shubair!
            </h1>
            <span className="text-xl text-muted-foreground">
              How&#8217;s it going?
            </span>
            <p className="max-w-md text-lg leading-relaxed">
              I’m crafting dynamic web apps or exploring AI-driven possibilities,
              turning ideas into reality—one line of code at a time! 🚀
            </p>
          </div>

          {/* Fancy Background Effect */}
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
        </div>

        {/* Right Section - Stylish Image */}
        <div className="flex justify-center items-center">
          <Image
            src={image}
            alt="Shubair"
            width={450}
            height={450}
            className="rounded-full max-w-full h-auto object-cover transition-all 
                        opacity-80 hover:opacity-100 scale-100 hover:scale-105 
                        blur-sm hover:blur-none grayscale hover:grayscale-0 
                        sepia hover:sepia-0 shadow-2xl drop-shadow-2xl hover:drop-shadow-3xl 
                        duration-500 ease-in-out sm: mt-16 cursor-pointer

                        /* Light Mode - Classic Shadow */
                        shadow-black/30 

                        /* Dark Mode - Glow Effect */
                        dark:border dark:border-blue-500 dark:hover:border-cyan-400
                        dark:ring-2 dark:ring-blue-600 dark:hover:ring-cyan-400"
          />
        </div>
      </div>
      <div className="mt-28 mb-20 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold max-w-2xl">
                Want to uncover who I am and explore my projects? 🚀 ..
            </h1>
            <h3 className="mt-4 max-w-xl">
                Click the <Bot className="inline pb-1 cursor-pointer" /> icon in the top bar and let the AI spill the secrets! 🤖✨
            </h3>
            <h3 className="mt-2 max-w-lg">
                Prefer the old-school way? Feel free to browse through the site at your own pace—<strong>the choice is yours!</strong>
            </h3>
        </div>
    </>
  );
};

export default Home;
