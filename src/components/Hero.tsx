"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

// --- DUMMY IMAGES — replace these src values with your own real photos ---
const avatarSlides = [
  {
    src: "/personal_img/protfolio.jpeg",
    alt: "Photo 1",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Photo 2",
  },
  {
    src: "/personal_img/rashedul.jpeg",
    alt: "Photo 3",
  },
  {
    src: "/personal_img/rashedul-2.jpeg",
    alt: "Photo 4",
  },
];

const AUTOPLAY_DELAY = 2500;

function AvatarCarouselPopover({
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex(
      ((next % avatarSlides.length) + avatarSlides.length) %
        avatarSlides.length,
    );
  };

  const goNext = () => goTo(index + 1, 1);
  const goPrev = () => goTo(index - 1, -1);

  useEffect(() => {
    if (!isOpen || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % avatarSlides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, isPaused]);

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      setDirection(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="absolute bottom-full left-1/2 z-50 mb-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl sm:w-64">
      <div className="relative h-40 w-full overflow-hidden sm:h-48">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0">
            <Image
              src={avatarSlides[index].src}
              alt={avatarSlides[index].alt}
              fill
              sizes="256px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
          <svg viewBox="0 0 24 24" fill="none" className="size-4">
            <path
              d="M15 6C15 6 9 10.4189 9 12C9 13.5812 15 18 15 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
          <svg viewBox="0 0 24 24" fill="none" className="size-4">
            <path
              d="M9 6C9 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 py-2.5">
        {avatarSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i, i > index ? 1 : -1);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-4 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      <div className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-background/95" />
    </motion.div>
  );
}

export default function Hero() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const avatarWrapRef = useRef<HTMLSpanElement>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("rashedulraha.bd@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  useEffect(() => {
    if (!isAvatarOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        avatarWrapRef.current &&
        !avatarWrapRef.current.contains(e.target as Node)
      ) {
        setIsAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isAvatarOpen]);

  // Floating particles for background
  const particles = Array.from({ length: 20 }, (_, i) => ({
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
                ref={avatarWrapRef}
                className="group relative z-30"
                onMouseEnter={() => setIsAvatarOpen(true)}
                onMouseLeave={() => setIsAvatarOpen(false)}>
                <motion.span
                  role="button"
                  tabIndex={0}
                  aria-label="View photo gallery"
                  onClick={() => setIsAvatarOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsAvatarOpen((prev) => !prev);
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-2 inline-block w-16 cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-shadow hover:shadow-xl md:w-20 lg:mx-3">
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
                <motion.svg
                  aria-hidden="true"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isAvatarOpen ? 1 : 0,
                    opacity: isAvatarOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute -bottom-1 -right-1 size-6"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72-1.328 12.875-11.083-4.042-9.667-14.333c-.793-1.129-.519-2.686.611-3.478z"
                    fill="#ef9645"
                  />
                  <path
                    d="m2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181-.302.379-.6.6-.894l-7.288-10.627s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l6.855 9.997c.255-.208.516-.417.785-.622l-7.947-11.591s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l7.947 11.589c.292-.179.581-.334.871-.498l-7.428-10.832s-1.131-1.649.518-2.78 2.78.518 2.78.518l7.854 11.454 1.194 1.742c-4.948 3.394-5.419 9.779-2.592 13.902.565.825 1.39.26 1.39.26-3.393-4.949-2.357-10.51 2.592-13.903l-1.459-7.302s-.545-1.924 1.378-2.47c1.924-.545 2.47 1.379 2.47 1.379l1.685 5.004c.668 1.984 1.379 3.961 2.32 5.831 2.657 5.28 1.07 11.842-3.94 15.279-5.465 3.747-12.936 2.354-16.684-3.11z"
                    fill="#ffdc5d"
                  />
                  <g fill="#5dadec">
                    <path d="m12 32.042c-4 0-8.042-4.042-8.042-8.042 0-.553-.405-1-.958-1s-1.042.447-1.042 1c0 6 4.042 10.042 10.042 10.042.553 0 1-.489 1-1.042s-.447-.958-1-.958z" />
                    <path d="m7 34c-3 0-5-2-5-5 0-.553-.447-1-1-1s-1 .447-1 1c0 4 3 7 7 7 .553 0 1-.447 1-1s-.447-1-1-1zm17-32c-.552 0-1 .448-1 1s.448 1 1 1c4 0 8 3.589 8 8 0 .552.448 1 1 1s1-.448 1-1c0-5.514-4-10-10-10z" />
                    <path d="m29 .042c-.552 0-1 .406-1 .958s.448 1.042 1 1.042c3 0 4.958 2.225 4.958 4.958 0 .552.489 1 1.042 1s.958-.448.958-1c0-3.837-2.958-6.958-6.958-6.958z" />
                  </g>
                </motion.svg>

                <AnimatePresence>
                  {isAvatarOpen && (
                    <AvatarCarouselPopover
                      isOpen={isAvatarOpen}
                      onClose={() => setIsAvatarOpen(false)}
                    />
                  )}
                </AnimatePresence>
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
    </>
  );
}
