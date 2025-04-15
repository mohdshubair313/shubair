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

const Page: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0f0f0f] px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#00ffd5] opacity-10 blur-3xl animate-spin-slow rounded-full left-[-200px] top-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#ffcb05] opacity-10 blur-3xl animate-pulse rounded-full right-[-200px] bottom-[-200px]" />
      </div>

      {/* Feedback Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(0,255,255,0.1)] transition-shadow"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl text-white font-semibold">
            Hey there 👋
          </CardTitle>
          <CardDescription className="text-sm text-neutral-300 mt-2">
            Love to work on your feedback..
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-black/20 text-white border border-white/10 focus:border-cyan-400 focus:ring-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-white">Your Feedback</Label>
              <textarea
                id="message"
                placeholder="I would say You have to do is ..."
                className="bg-black/20 w-full h-36 px-4 py-2 text-white text-base border border-white/10 focus:border-yellow-400 focus:ring-yellow-500 rounded-md resize-none"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="mt-4 flex justify-center">
          <AnimatedSubscribeButton className="w-full sm:w-44">
            <span className="group inline-flex items-center">
              Send
            </span>
            <span className="group inline-flex items-center">
              Your valuable feedback is sent to Shubair
            </span>
          </AnimatedSubscribeButton>
        </CardFooter>
      </motion.div>
    </div>
  );
};

export default Page;
