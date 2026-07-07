/* eslint-disable react-hooks/purity */
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// --- DUMMY IMAGES — replace these src values with your own real photos ---
const avatarSlides = [
  {
    src: "/personal_img/protfolio.jpeg",
    alt: "Portfolio Photo",
    title: "Workspace",
    description: "My creative workspace setup",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Rashedul Photo 2",
    title: "Portrait",
    description: "Professional headshot",
  },
  {
    src: "/personal_img/rashedul.jpeg",
    alt: "Rashedul Photo 1",
    title: "Creative",
    description: "Creative session in action",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Rashedul Photo 4",
    title: "Studio",
    description: "Studio vibes",
  },
];

// --- Center Modal Gallery ---
function CenterGalleryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const next = () => {
    const nextIndex = (currentIndex + 1) % avatarSlides.length;
    goTo(nextIndex);
  };

  const prev = () => {
    const prevIndex =
      (currentIndex - 1 + avatarSlides.length) % avatarSlides.length;
    goTo(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset to first image when opened
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}>
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="relative w-full max-w-5xl bg-background/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Main Image Area */}
        <div className="relative w-full aspect-[16/9] bg-black/30">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: direction > 0 ? 60 : -60,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -60 : 60,
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0">
              <Image
                src={avatarSlides[currentIndex].src}
                alt={avatarSlides[currentIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 text-white/80 hover:text-white hover:scale-105">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 text-white/80 hover:text-white hover:scale-105">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-sm font-medium">
            {currentIndex + 1} / {avatarSlides.length}
          </div>

          {/* Image Title */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-sm font-medium">
            {avatarSlides[currentIndex].title}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 bg-background/80">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent justify-center">
            {avatarSlides.map((img, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(idx);
                }}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                  idx === currentIndex
                    ? "ring-2 ring-primary scale-105 shadow-lg shadow-primary/20"
                    : "ring-1 ring-white/10 hover:ring-white/30"
                }`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                {idx === currentIndex && (
                  <div className="absolute inset-0 bg-primary/10" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Image Description */}
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center text-sm text-muted-foreground font-light">
            {avatarSlides[currentIndex].description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarRef = useRef<HTMLSpanElement>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("rashedulraha.bd@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  // Floating particles for background
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <>
      <section
        aria-label="Introduction"
        className="relative flex max-h-250 min-h-dvh w-full flex-col items-center justify-center overflow-hidden py-pagebuilder"
        id="hero-section">
        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Existing gradient background */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 z-0 h-96 w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-700/20 blur-3xl will-change-transform dark:bg-[#0b0218]"
        />

        <div className="container relative z-20 mx-auto mb-8 flex w-full flex-col items-center justify-center gap-y-4 md:mb-14 md:gap-y-6">
          {/* New badge - improved */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex cursor-pointer items-center rounded-full border border-black/5 bg-black/5 px-1 py-0.5 text-sm backdrop-blur-xs transition-all duration-300 ease-in hover:bg-black/10 hover:border-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] lg:text-base dark:border-white/5 dark:bg-white/5 dark:hover:border-white/15 dark:hover:bg-white/10"
            href="https://keythm.aayushbharti.in/"
            referrerPolicy="no-referrer"
            rel="noreferrer"
            target="_blank">
            <span className="mx-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-0.5 text-xs font-medium text-white shadow-sm">
              New
            </span>
            <span className="relative px-2 py-0.5 text-sm text-black/70 transition-colors duration-300 group-hover:text-black dark:text-white/70 dark:group-hover:text-white">
              Keythm — feel every keystroke
            </span>
            <motion.svg
              fill="none"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 size-4 text-black/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black dark:text-white/50 dark:group-hover:text-white">
              <path
                d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </motion.svg>
          </motion.a>

          {/* Main heading - improved with better animation and styling */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full text-balance text-center font-instrument-serif text-4xl text-zinc-700 leading-tight md:text-5xl lg:text-6xl dark:text-zinc-100">
            Code that{" "}
            <motion.em
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text text-transparent not-italic tracking-tight dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              feels
            </motion.em>{" "}
            designed.
            <br className="block" />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text font-instrument-serif text-transparent italic tracking-tight dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              Engineering that actually ships.
            </motion.span>
          </motion.h1>

          {/* Subtitle - improved with better visual hierarchy */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grad-white relative z-20 flex flex-col items-center justify-center text-center font-normal text-lg tracking-tight sm:flex-row sm:text-xl lg:text-2xl">
            <span className="flex items-center justify-center">
              Hello, I&apos;m Rashedul Islam
              <span
                ref={avatarRef}
                className="group relative z-30 cursor-pointer"
                onClick={() => setIsModalOpen(true)}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-2 inline-block w-16 overflow-hidden rounded-3xl shadow-lg transition-shadow hover:shadow-xl md:w-20 lg:mx-3">
                  <Image
                    alt="Rashedul Islam — Full Stack Developer"
                    fetchPriority="high"
                    width={2459}
                    height={1262}
                    className="transition-transform duration-300 ease-out hover:scale-110 group-hover:rotate-3"
                    sizes="(min-width: 768px) 80px, 80px"
                    src="/personal_img/rashedul-2.jpeg"
                  />
                </motion.span>

                {/* Click hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Click to view gallery
                </motion.div>
              </span>
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="leading-relaxed">
              {" "}
              a Full Stack Developer
            </motion.span>
          </motion.h2>

          {/* CTAs - improved with better animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="z-10 mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-modal", {
                    detail: { view: "contact" },
                  }),
                )
              }
              className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/20 bg-black/10 py-1 pr-1 pl-4 font-medium text-base opacity-85 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-black/40 hover:bg-black hover:opacity-100 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white dark:hover:shadow-white/20">
              <span className="z-10 px-3 text-black transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-white dark:text-white dark:group-hover:text-black">
                Let&apos;s Connect
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-y-1 right-1 w-10 rounded-full bg-black transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)] dark:bg-white"
              />
              <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent dark:bg-white">
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[18px] text-white transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <path
                    d="M18.5 12L4.99997 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute size-[18px] -translate-x-6 text-white opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <path
                    d="M18.5 12L4.99997 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 font-light text-base text-black transition-all duration-300 hover:text-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white/70 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white/90"
              type="button"
              tabIndex={0}
              onClick={copyEmail}>
              <span className="relative size-4">
                <svg
                  className="absolute inset-0"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  style={{ opacity: 1, transform: "scale(1.1)" }}>
                  <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                  <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                </svg>
              </span>
              <span className="relative grid select-none text-left">
                <span className="invisible col-start-1 row-start-1">
                  Copied to clipboard
                </span>
                <span className="invisible col-start-1 row-start-1">
                  hello@aayushbharti.in
                </span>
                <span
                  className="col-start-1 row-start-1 text-sm"
                  style={{ opacity: 1, transform: "none" }}>
                  rashedulraha.bd@gmail.com
                </span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Footer glow - improved with better animation */}
        <div className="absolute inset-x-0 bottom-0 h-56">
          <div aria-hidden="true" className="relative h-60 w-full z-19 mt-4">
            <div className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2 h-125 w-300 mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-40 left-1/2 -translate-x-1/2 h-28 w-200 overflow-hidden rounded-full blur-3xl animate-hero-glow will-change-[transform,opacity]">
                <div className="h-full w-[300%] bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#7c3aed)] animate-hero-glow-shift will-change-transform" />
              </motion.div>
              <div className="absolute -right-108 -bottom-188.25 -left-113.5 h-238.75 rounded-[100%] bg-linear-to-b from-indigo-500/40 to-transparent dark:from-white" />
              <div className="absolute -right-127.5 -bottom-189.75 -left-133 aspect-[2.346/1] h-239 rounded-[100%] bg-[#F3F2F8] dark:bg-black shadow-[inset_0_2px_20px_#4f46e510,0_-10px_50px_1px_#4f46e520] dark:shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]">
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_30px_#4f46e530,0_-10px_60px_1px_#4f46e540] dark:shadow-[inset_0_2px_30px_#fff,0_-10px_60px_1px_#ffffffa2] animate-hero-glow-pulse will-change-[opacity]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Modal Gallery */}
      <AnimatePresence>
        {isModalOpen && (
          <CenterGalleryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
