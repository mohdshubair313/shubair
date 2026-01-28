import Image from "next/image";
import BubbleButton from "@/components/emoji-button";
import { FileCheck2Icon } from "lucide-react";
import Link from "next/link";

export default function SuperImage() {
  return (
    <>
      <div className="flex justify-center items-center relative w-full sm:mt-20 md:mt-16">
        {/* Glow ring effect */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] 
                      bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400 
                      rounded-full blur-2xl opacity-30 dark:opacity-20 z-0" />

        {/* Profile Image */}
        <div className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 
                      border-white dark:border-neutral-800 bg-white dark:bg-black">
          <Image
            src='/image.jpg'
            alt="Shubair"
            width={450}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* resume button */}
      <div className="flex justify-center items-center gap-16 md:py-8 cursor-pointer">
        <Link href="https://drive.google.com/file/d/1tMky5nT79FuG_ifHAhWOQHHe01hdmd58/view?usp=sharing" rel="noopener noreferrer" target="_blank">
          <div className="">
            <BubbleButton icon={<FileCheck2Icon className="w-3 h-3 fill-current" />} emergingInterval={80} color={"#ff8243"}>
              <div className="flex items-center gap-2 w-full h-full cursor-pointer">
                <div className="group-hover:animate-[heartbeat_0.8s_ease-in-out_infinite] transition duration-300">
                  <FileCheck2Icon className="w-5 h-5 fill-current cursor-pointer" />
                </div>
                <span>My Resume</span>
              </div>
            </BubbleButton>
          </div>
        </Link>
      </div>
    </>
  );
}
