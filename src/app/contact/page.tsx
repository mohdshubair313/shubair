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
      {/* Adaptive Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-orange-100 to-blue-100 blur-3xl opacity-60 dark:opacity-0 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a4f81] via-[#1e293b] to-[#334155] blur-2xl opacity-0 dark:opacity-50 transition-opacity duration-500" />
      </div>

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-[#00ffd5] opacity-10 blur-3xl animate-spin-slow rounded-full left-[-200px] top-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#ffcb05] opacity-10 blur-3xl animate-pulse rounded-full right-[-200px] bottom-[-200px]" />
      </div>

      {/* Feedback Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl p-6 backdrop-blur-md bg-white/70 dark:bg-white/5 dark:border-white/10 shadow-md dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/80 dark:bg-black/30 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-white/10 focus:border-cyan-400 focus:ring-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-gray-700 dark:text-white">
                Your Feedback
              </Label>
              <textarea
                id="message"
                placeholder="I would say You have to do is ..."
                className="w-full h-36 px-4 py-2 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white/80 dark:bg-black/30 border border-gray-200 dark:border-white/10 focus:border-yellow-400 focus:ring-yellow-500 rounded-md resize-none"
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
