"use client";

import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import SocialDock from "@/components/SocialDock";

const Page: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-orange-100 to-blue-100 blur-3xl opacity-60 dark:opacity-0 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a4f81] via-[#1e293b] to-[#334155] blur-2xl opacity-0 dark:opacity-50 transition-opacity duration-500" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-[#00ffd5] opacity-10 blur-3xl animate-spin-slow rounded-full left-[-200px] top-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#ffcb05] opacity-10 blur-3xl animate-pulse rounded-full right-[-200px] bottom-[-200px]" />
      </div>

      {/* ✅ Enhanced Card with Better Borders and Shadows */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl p-6 
          backdrop-blur-lg
          bg-white/70 dark:bg-white/5 
          
          border-2 border-gray-500/50 dark:border-white/10
          
          shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.15)]
          dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]
          
          hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1),0_16px_32px_rgba(0,0,0,0.2)]
          dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]
          
          transition-all duration-300
          
          ring-1 ring-gray-200/60 dark:ring-white/5
          ring-offset-0
        "
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            Hey there 👋
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Love to work on your feedback..
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* ✅ Enhanced Email Input with Better Border */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="
                  bg-white/80 dark:bg-black/30 
                  text-black dark:text-white 
                  placeholder:text-gray-400 dark:placeholder:text-gray-500 
                  
                  border-2 border-gray-300 dark:border-white/10
                  
                  shadow-sm shadow-gray-200/50 dark:shadow-none
                  
                  focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
                  
                  hover:border-gray-400 dark:hover:border-white/20
                  
                  transition-all duration-200
                "
              />
            </div>

            {/* ✅ Enhanced Textarea with Better Border */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="message"
                className="text-gray-700 dark:text-white"
              >
                Your Feedback
              </Label>
              <textarea
                id="message"
                placeholder="I would say You have to do is ..."
                className="
                  w-full h-36 px-4 py-2 
                  text-black dark:text-white 
                  placeholder:text-gray-400 dark:placeholder:text-gray-500 
                  
                  bg-white/80 dark:bg-black/30 
                  
                  border-2 border-gray-300 dark:border-white/10
                  
                  shadow-sm shadow-gray-200/50 dark:shadow-none
                  
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30
                  
                  hover:border-gray-400 dark:hover:border-white/20
                  
                  rounded-md resize-none
                  
                  transition-all duration-200
                "
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="mt-4 flex justify-center">
          <AnimatedSubscribeButton className="w-full sm:w-44">
            <span className="group inline-flex items-center">Send</span>
            <span className="group inline-flex items-center">
              Your valuable feedback is sent to Shubair
            </span>
          </AnimatedSubscribeButton>
        </CardFooter>
      </motion.div>

      <SocialDock />
    </div>
  );
};

export default Page;
