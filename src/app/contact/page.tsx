"use client";

import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
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
    <div className="relative flex items-center justify-center min-h-screen bg-[#0f0f0f] overflow-hidden px-4 sm:px-0">
      {/* Animated background blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-[500px] h-[500px] bg-[#00ffd5] opacity-10 blur-3xl animate-spin-slow rounded-full left-[-200px] top-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#ffcb05] opacity-10 blur-3xl animate-pulse rounded-full right-[-200px] bottom-[-200px]" />
      </div>

      {/* Floating animated card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full max-w-sm backdrop-blur-2xl bg-white/5 rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 hover:shadow-[0_0_50px_rgba(0,255,255,0.1)] transition-shadow"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl text-white tracking-wide">Welcome Back 👋</CardTitle>
          <CardDescription className="text-sm text-neutral-300">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-black/20 text-white border-white/10 focus:border-cyan-400 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-black/20 text-white border-white/10 focus:border-yellow-400 focus:ring-yellow-500"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center mt-2">
          <AnimatedSubscribeButton className="w-full sm:w-40">
            <span className="group inline-flex items-center">
              Follow
              <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="group inline-flex items-center">
              <CheckIcon className="mr-2 size-4" />
              Subscribed
            </span>
          </AnimatedSubscribeButton>
        </CardFooter>
      </motion.div>
    </div>
  );
};

export default Page;
