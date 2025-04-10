import React from 'react'
import { Bot } from "lucide-react";

const TechStack = () => {
  return (
        <div className="relative flex items-center justify-center min-h-screen bg-background px-4">
            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-orange-100 to-blue-100 blur-2xl opacity-60 dark:opacity-0"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a4f81] via-[#1e293b] to-[#334155] blur-2xl opacity-0 dark:opacity-50"></div>
            </div>

            {/* Centered Text Block */}
            <div className="flex justify-center items-center">
            <div className="flex flex-col items-center text-center space-y-6 max-w-xl">
              <h1 className="text-4xl font-bold text-foreground">
                Want to uncover who I am and explore my projects? 🚀
              </h1>
              <h3 className="text-lg text-muted-foreground">
                Click the <Bot className="inline size-5 text-primary cursor-pointer" /> icon in the
                top bar and let the AI spill the secrets! 🤖✨
              </h3>
              <h3 className="text-base text-muted-foreground">
                Prefer the old-school way? Browse at your own pace —
                <strong> the choice is yours!</strong>
              </h3>
            </div>
          </div>
      </div>  )
}

export default TechStack