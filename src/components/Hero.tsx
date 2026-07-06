"use client";

import { toast } from "sonner";

export default function Hero() {

  const copyEmail = async () => {
  await navigator.clipboard.writeText("rashedulraha.bd@gmail.com");
  toast.success("Email copied to clipboard!");
};
  return (
    <>
      <section
        aria-label="Introduction"
        className="relative flex max-h-[1000px] min-h-dvh w-full flex-col items-center justify-center overflow-hidden py-pagebuilder"
        id="hero-section"
      >
        <div aria-hidden="true"
          className="absolute top-1/2 left-1/2 z-0 h-96 w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-700/20 blur-3xl will-change-transform dark:bg-[#0b0218]"
        />

        
        <div className="container relative z-20 mx-auto mb-8 flex w-full flex-col items-center justify-center gap-y-4 md:mb-14 md:gap-y-6">
          <a
            className="group flex cursor-pointer items-center rounded-full border border-black/0 text-sm backdrop-blur-xs transition-colors duration-300 ease-in hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] lg:text-base dark:border-white/0 dark:hover:border-white/15 dark:hover:bg-white/5 animate-fadeInDown"
            href="https://keythm.aayushbharti.in/"
            referrerPolicy="no-referrer"
            rel="noreferrer"
            target="_blank"
          >
            <span className="mx-1 rounded-full bg-blue-700 px-1.5 text-white text-xs leading-relaxed">
              New
            </span>
            <span
              className="relative animate-shiny-text text-black/65 dark:text-white/90 px-1 py-0.5"
              style={{
                maskImage:
                  "linear-gradient(-75deg,hsl(0 0% 0%) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(0 0% 0%) calc(var(--x) + 100%))",
                WebkitMaskImage:
                  "linear-gradient(-75deg,hsl(0 0% 0%) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(0 0% 0%) calc(var(--x) + 100%))",
                textShadow: `0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)`,
              }}
            >
              Keythm — feel every keystroke
            </span>
            <svg
              fill="none"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 size-4 text-black transition-transform duration-300 ease-out hover:duration-300 group-hover:translate-x-0.5 dark:text-neutral-100/70"
            >
              <path
                d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
          <h1 className="w-full animate-fadeInUp text-balance fill-mode-[backwards] text-center font-instrument-serif text-4xl text-zinc-700 leading-tight [animation-delay:50ms] md:text-5xl lg:text-6xl dark:text-zinc-100">
            Code that{/* */}{" "}
            <em className="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text text-transparent not-italic tracking-tight dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              feels
            </em>{" "}
            {/* */}designed.
            <br className="block" />
            <span className="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text font-instrument-serif text-transparent italic tracking-tight dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
              Engineering that actually ships.
            </span>
          </h1>
          <h2 className="grad-white relative z-20 flex animate-fadeInUp flex-col items-center justify-center fill-mode-[backwards] text-center font-normal text-lg tracking-tight [animation-delay:100ms] sm:flex-row sm:text-xl lg:text-2xl">
            <span className="flex items-center justify-center" >
              Hello, I'm Rashedul Islam
              <span className="group relative z-30">
                <span className="mx-2 inline-block w-16 cursor-pointer overflow-hidden rounded-3xl md:w-20 lg:mx-3">
                  <img
                    alt="Aayush Bharti — Full Stack Developer & Design Engineer"
                    draggable="false"
                    fetchPriority="high"
                    width={2459}
                    height={1262}
                    decoding="async"
                    data-nimg={1}
                    className="transition-transform duration-200 ease-out hover:scale-110 group-hover:rotate-6"
                    sizes="(min-width: 768px) 80px, 64px"
                    srcSet="/images/image_32.jpg 32w, /images/image_66.jpg 48w, /images/image_27.jpg 64w, /images/image_29.jpg 96w, /images/image_60.jpg 128w, /images/image_26.jpg 256w, /images/image_31.jpg 384w, /images/image_25.jpg 640w, /images/image_41.jpg 828w, /images/image_44.jpg 1080w, /images/image_2.webp 1440w, /images/image.webp 1920w"
                    src="/images/image.webp"
                  />
                </span>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 left-2 hidden size-6 group-hover:block group-hover:animate-wave"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                </svg>
              </span>
            </span>
            <span className="leading-relaxed"> a Full Stack Developer</span>
          </h2>
          <div className="z-10 mt-4 flex animate-fadeInUp flex-col items-center gap-4 fill-mode-[backwards] [animation-delay:150ms] sm:flex-row">
            <button className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/30 bg-black/20 py-1 pr-1 pl-3 font-medium text-base opacity-85 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-black/50 hover:bg-black hover:opacity-100 hover:shadow-black/20 hover:shadow-lg active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white dark:hover:shadow-white/20">
              <span className="z-10 px-3 text-black transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-white dark:text-white dark:group-hover:text-black">
                Let's Connect
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
                  className="size-[18px] text-white transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
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
                  className="absolute size-[18px] -translate-x-6 text-white opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
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
            </button>
            <button
              className="flex items-center gap-1.5 rounded-full px-4 py-2 font-light text-base text-black transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white/75 cursor-pointer hover:text-black/60 dark:hover:text-white/90"
              type="button"
              tabIndex={0}
            onClick={copyEmail}>
              <span className="relative size-4">
                <svg
                  className="absolute inset-0"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  style={{ opacity: 1, transform: "scale(1.1)" }}
                >
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
                  className="col-start-1 row-start-1"
                  style={{ opacity: 1, transform: "none" }}
                >
                  rashedulraha.bd@gmail.com
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-56">
          <div aria-hidden="true" className="relative h-60 w-full z-19 mt-4">
            <div className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2 h-[500px] w-[1200px] mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
              <div className="absolute bottom-40 left-1/2 -translate-x-1/2 h-28 w-[800px] overflow-hidden rounded-full blur-3xl animate-hero-glow will-change-[transform,opacity]">
                <div className="h-full w-[300%] bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#7c3aed)] animate-hero-glow-shift will-change-transform" />
              </div>
              <div className="absolute -right-[432px] -bottom-[753px] -left-[454px] h-[955px] rounded-[100%] bg-linear-to-b from-indigo-500/40 to-transparent dark:from-white" />
              <div className="absolute -right-[510px] -bottom-[759px] -left-[532px] aspect-[2.346/1] h-[956px] rounded-[100%] bg-[#F3F2F8] dark:bg-black shadow-[inset_0_2px_20px_#4f46e510,0_-10px_50px_1px_#4f46e520] dark:shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]">
                <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_30px_#4f46e530,0_-10px_60px_1px_#4f46e540] dark:shadow-[inset_0_2px_30px_#fff,0_-10px_60px_1px_#ffffffa2] animate-hero-glow-pulse will-change-[opacity]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
