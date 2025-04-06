import React from 'react';
import { motion } from 'framer-motion';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-center"
            >
                <AspectRatio.Root ratio={16 / 9} className="w-full max-w-lg mx-auto">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg"
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            🚀 Coming Soon!
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl">
                            We are working on something amazing. Stay tuned!
                        </p>
                    </motion.div>
                </AspectRatio.Root>
            </motion.div>
        </div>
    );
};

export default page;