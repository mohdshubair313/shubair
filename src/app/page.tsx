"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import SuperImage from "@/components/SuperImage";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const Home = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center overflow-hidden bg-background">
        {/* Gradii Background */}
        <div className="absolute inset-0 -z-10">
          {/* Light Mode Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-orange-100 to-blue-100 blur-3xl opacity-60 dark:opacity-0"></div>

          {/* Dark Mode Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a4f81] via-[#1e293b] to-[#334155] blur-2xl opacity-0 dark:opacity-50"></div>
        </div>
        {/* Left Section - Text Content */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-wide mb-10">
              Hey, I am Shubair!
            </h1>
            <span className="text-xl text-muted-foreground">
              How&#8217;s it going?
            </span>
            <p className="max-w-md text-xl leading-relaxed mt-7">
              I’m crafting dynamic web apps or exploring AI-driven
              possibilities, turning ideas into reality—one line of code at a
              time! 🚀
            </p>
          </div>

          {/* cal button */}
          <InteractiveHoverButton>
          <div data-cal-namespace="30min"
            className="cursor-pointer"
            data-cal-link="mohd-shubair-vj3g5t/30min"
            data-cal-config='{"layout":"month_view"}' >
            book a call
          </div>
          </InteractiveHoverButton>

          {/* Fancy Background Effect */}
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
        </div>

        {/* Stylish Image */}
        <SuperImage />
      </div>
    </>
  );
};

export default Home;
