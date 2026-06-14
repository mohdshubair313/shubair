"use client";

import { useState } from "react";
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
import { toast } from "sonner";

const Page: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter your feedback message");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 overflow-hidden bg-background text-foreground py-20">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.6 }}
        />
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Enhanced Card with Better Borders and Shadows */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl p-6 bg-card border border-border/50 shadow-2xl hover:border-primary/30 transition-all duration-300 relative z-10"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Hey there 👋
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            I would love to hear your feedback or connect with you!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground font-heading">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  bg-[#1c1c1e] 
                  text-foreground 
                  placeholder:text-muted-foreground 
                  border border-border/50
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  hover:border-border
                  transition-all duration-200
                  rounded-xl py-5
                "
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="message"
                className="text-sm font-semibold text-foreground font-heading"
              >
                Your Feedback
              </Label>
              <textarea
                id="message"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="
                  w-full h-36 px-4 py-3
                  text-foreground 
                  placeholder:text-muted-foreground
                  bg-[#1c1c1e] 
                  border border-border/50
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  hover:border-border
                  rounded-xl resize-none
                  transition-all duration-200
                  outline-none text-sm
                "
              />
            </div>

            <CardFooter className="mt-4 flex justify-center px-0 pb-0">
              <div className="w-full flex justify-center">
                <AnimatedSubscribeButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-6 font-heading font-semibold text-sm bg-primary text-[#09090B] hover:bg-primary/95 transition-all shadow-md rounded-xl"
                >
                  <span className="group inline-flex items-center text-[#09090B]">
                    {isLoading ? "Sending..." : "Send Feedback"}
                  </span>
                  <span className="group inline-flex items-center text-[#09090B]">
                    Feedback sent to Shubair!
                  </span>
                </AnimatedSubscribeButton>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </motion.div>

      <div className="mt-12 relative z-10 w-full flex justify-center">
        <SocialDock />
      </div>
    </div>
  );
};

export default Page;
