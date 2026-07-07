"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SoundCard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  // Outer avatars data
  const outerAvatars = [
    { src: "/personal_img/protfolio.jpeg", position: "top-left", delay: 0 },
    {
      src: "/personal_img/rashedul-2.jpeg",
      position: "bottom-left",
      delay: 75,
    },
    {
      src: "/personal_img/rashedul.jpeg",
      position: "top-right",
      delay: 150,
    },
    {
      src: "/personal_img/rashedul-2.jpeg",
      position: "bottom-right",
      delay: 200,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="col-span-1 md:col-span-6 lg:col-span-7 lg:row-span-5 h-full">
      {/* Main Card */}
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        href="/contact"
        className="relative w-full h-full flex flex-col items-center justify-end pb-8 md:pb-10 overflow-hidden group cursor-pointer rounded-2xl ring-1 ring-border shadow-sm transition-all hover:ring-indigo-500/30 min-h-72 bg-background"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Simple background - just gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-background/80" />
        </div>

        {/* The Overlapping Rings Wrapper */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full z-10">
          {/* Outer ring animation - subtle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-indigo-500/10" />
            <div className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full border border-purple-500/10" />
          </div>

          {/* Center Avatar - Always visible */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute z-20 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-background overflow-hidden ring-2 ring-transparent transition-all duration-700 group-hover:ring-indigo-500/50 shadow-xl shadow-indigo-500/20">
            <Image
              src="/personal_img/rashedul-2.jpeg"
              alt="Rashedul Islam"
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Outer 4 Avatars - Only show on hover */}
        {outerAvatars.map((avatar, idx) => {
          const positions = {
            "top-left": "top-[15%] md:top-[20%] left-[10%] md:left-[25%]",
            "bottom-left":
              "bottom-[35%] md:bottom-[35%] left-[5%] md:left-[20%]",
            "top-right": "top-[15%] md:top-[20%] right-[10%] md:right-[25%]",
            "bottom-right":
              "bottom-[35%] md:bottom-[35%] right-[5%] md:right-[20%]",
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.3,
              }}
              transition={{
                duration: 0.3,
                delay: isHovered ? idx * 0.05 : 0,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{ scale: 1.1 }}
              className={`absolute ${positions[avatar.position as keyof typeof positions]} z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20`}>
              <Image
                src={avatar.src}
                alt={`Avatar ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}

        {/* Typography & Bottom Elements */}
        <div className="z-30 text-center flex flex-col items-center gap-1.5 px-6 relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Let&apos;s Build Together
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-sm md:text-base text-neutral-600 tracking-wide dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-500">
            Clear communication, fast iterations, no surprises
          </motion.h3>
        </div>

        {/* Arrow Button */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          whileHover={{ y: -2, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-muted/50 backdrop-blur-sm text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20 border border-border">
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] md:text-[9px] text-neutral-400/60 uppercase tracking-wider font-medium">
            Available
          </span>
        </motion.div>

        {/* Click hint overlay */}
        <div className="absolute inset-0 z-5 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
      </motion.a>
    </div>
  );
};

export default SoundCard;
