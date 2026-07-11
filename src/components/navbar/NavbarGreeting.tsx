import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarGreetingProps {
  showGreeting: boolean;
  greeting: string;
}

export default function NavbarGreeting({ showGreeting, greeting }: NavbarGreetingProps) {
  return (
    <AnimatePresence mode="wait">
      {showGreeting && (
        <motion.div
          key="greeting"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1],
              type: "spring",
              stiffness: 150,
              damping: 18,
            },
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
          }}
          className="flex items-center justify-center w-full px-4 py-1"
        >
          <motion.span
            className="text-xl mr-2"
            animate={{
              rotate: [0, 15, -15, 10, -10, 0],
              scale: [1, 1.2, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            ✨
          </motion.span>
          <span className="text-base font-semibold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {greeting}
          </span>
          <motion.span
            className="text-sm ml-2"
            animate={{
              rotate: [0, 20, -10, 20, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            👋
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
