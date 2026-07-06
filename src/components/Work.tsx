import Image from "next/image";

export default function Work() {
  return (
    <>
      <section className="relative w-full px-2 py-pagebuilder" id="work">
        <h2
          className="relative z-2 mx-auto mb-pagebuilder max-w-xl text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl text-center"
          style={{
            textShadow:
              "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
          }}
        >
          <p className="mb-4 font-normal text-black/80 text-xs uppercase tracking-widest dark:text-white/70">
            CASE STUDIES
          </p>
          <span className="inline-block font-instrument-serif">
            Curated{" "}
            <span
              className="px-1 pb-1 text-shadow-none italic animate-gradient-x text-colorfull"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskSize: "0% 100%",
                WebkitMaskPosition: "left",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              work
            </span>
          </span>
        </h2>
        <div className="flex flex-col gap-pagebuilder lg:hidden">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      01
                    </span>
                    <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      Web App
                    </span>
                  </div>
                  <a
                    className="group flex items-center gap-2"
                    href="/projects/keythm"
                  >
                    <h2 className="font-bluu font-bold text-2xl text-neutral-900 leading-tight dark:text-white">
                      Keythm
                    </h2>
                  </a>
                </div>
                <span
                  data-slot="badge"
                  data-variant="secondary"
                  className="Aborder inline-flex w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap py-1 shadow-border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none border-hairline bg-secondary [a&]:hover:bg-secondary/90 shrink-0 rounded-full px-3 text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  Q2 2026
                </span>
              </div>
            </div>
            <a
              aria-label="View Details of Keythm"
              className="group relative block aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-1 shadow-border sm:aspect-video md:aspect-16/10 lg:aspect-16/11 lg:rounded-3xl lg:p-2 dark:bg-white/6 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              href="/projects/keythm"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block"
              />
              <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-white max-lg:pt-2 lg:rounded-[16px] dark:bg-black from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35 dark:bg-linear-to-b">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 transition-[transform,filter] duration-500 ease-in-out group-hover:scale-105 lg:brightness-95 lg:saturate-90 lg:group-hover:brightness-110 lg:group-hover:saturate-125"
                  style={{
                    background:
                      "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block"
                />
                <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
                  <h3 className="text-sm sm:text-base md:text-lg">
                    Keychron meets typing test — every key has its own sound,
                    every stat tracked
                  </h3>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
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
                </div>
                <div className="absolute top-14 right-0 left-0 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
                  <Image
                    alt="Keythm"
                    loading="lazy"
                    width={3195}
                    height={2091}
                    className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto w-full max-w-[85%] translate-y-5 lg:block transition-transform duration-500 ease-out rotate-1 lg:rotate-0 lg:group-hover:transform-[perspective(1200px)_rotateX(-5deg)_translateY(-0.25rem)_rotate(1deg)_scale(1.05)]"
                    sizes="(max-width: 768px) 85vw, 580px"
                    src="/images/image.png"
                  />
                </div>
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/nextjs.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Next.js
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/react.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    React
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/typescript.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TypeScript
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/tailwindcss.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Tailwind CSS
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/drizzle.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Drizzle ORM
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/motion.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Motion.dev
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/shadcn-ui.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Shadcn UI
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    web-audio-api
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    serwist
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/zod.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zod
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    recharts
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      02
                    </span>
                    <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      Web App
                    </span>
                  </div>
                  <a
                    className="group flex items-center gap-2"
                    href="/projects/nextdemy"
                  >
                    <h2 className="font-bluu font-bold text-2xl text-neutral-900 leading-tight dark:text-white">
                      Nextdemy
                    </h2>
                  </a>
                </div>
                <span
                  data-slot="badge"
                  data-variant="secondary"
                  className="Aborder inline-flex w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap py-1 shadow-border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none border-hairline bg-secondary [a&]:hover:bg-secondary/90 shrink-0 rounded-full px-3 text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  Q4 2024
                </span>
              </div>
            </div>
            <a
              aria-label="View Details of Nextdemy"
              className="group relative block aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-1 shadow-border sm:aspect-video md:aspect-16/10 lg:aspect-16/11 lg:rounded-3xl lg:p-2 dark:bg-white/6 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              href="/projects/nextdemy"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block"
              />
              <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-white max-lg:pt-2 lg:rounded-[16px] dark:bg-black from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35 dark:bg-linear-to-b">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 transition-[transform,filter] duration-500 ease-in-out group-hover:scale-105 lg:brightness-95 lg:saturate-90 lg:group-hover:brightness-110 lg:group-hover:saturate-125"
                  style={{
                    background:
                      "linear-gradient(145deg, #1e2a78 0%, #2932CB 40%, #5a6aef 75%, #a0b0ff 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block"
                />
                <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
                  <h3 className="text-sm sm:text-base md:text-lg">
                    A monorepo-powered learning platform with real payments,
                    real auth, and real content delivery
                  </h3>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
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
                </div>
                <div className="absolute top-14 right-0 left-0 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
                  <Image
                    alt="Nextdemy"
                    loading="lazy"
                    width={1203}
                    height={753}
                    className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto w-full max-w-[85%] translate-y-5 lg:block transition-transform duration-500 ease-out -rotate-2 lg:rotate-0 lg:group-hover:transform-[perspective(1200px)_rotateX(-4deg)_translateY(-0.25rem)_rotate(-2deg)_scale(1.06)]"
                    sizes="(max-width: 768px) 85vw, 580px"
                    src="/images/image_4.jpg"
                  />
                </div>
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/nextjs.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Next.js
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/typescript.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TypeScript
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/tailwindcss.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Tailwind CSS
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/react-query.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TanStack Query
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/zustand.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zustand
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/shadcn-ui.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Shadcn UI
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/motion.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Motion.dev
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/expressjs.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Express.js
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/bun.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Bun
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/mongodb.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    MongoDB
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/zod.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zod
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/razorpay.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Razorpay
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/turborepo.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Turborepo
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/docker.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Docker
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      03
                    </span>
                    <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      Web App
                    </span>
                  </div>
                  <a
                    className="group flex items-center gap-2"
                    href="/projects/venture-den"
                  >
                    <h2 className="font-bluu font-bold text-2xl text-neutral-900 leading-tight dark:text-white">
                      VentureDen
                    </h2>
                  </a>
                </div>
                <span
                  data-slot="badge"
                  data-variant="secondary"
                  className="Aborder inline-flex w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap py-1 shadow-border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none border-hairline bg-secondary [a&]:hover:bg-secondary/90 shrink-0 rounded-full px-3 text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  Q1 2025
                </span>
              </div>
            </div>
            <a
              aria-label="View Details of VentureDen"
              className="group relative block aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-1 shadow-border sm:aspect-video md:aspect-16/10 lg:aspect-16/11 lg:rounded-3xl lg:p-2 dark:bg-white/6 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              href="/projects/venture-den"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block"
              />
              <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-white max-lg:pt-2 lg:rounded-[16px] dark:bg-black from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35 dark:bg-linear-to-b">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 transition-[transform,filter] duration-500 ease-in-out group-hover:scale-105 lg:brightness-95 lg:saturate-90 lg:group-hover:brightness-110 lg:group-hover:saturate-125"
                  style={{
                    background:
                      "linear-gradient(145deg, #1f2937 0%, #4b5563 40%, #9ca3af 75%, #d1d5db 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block"
                />
                <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
                  <h3 className="text-sm sm:text-base md:text-lg">
                    Where founders pitch ideas, get instant AI feedback, and get
                    discovered by investors
                  </h3>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
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
                </div>
                <div className="absolute top-14 right-0 left-0 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
                  <div className="relative flex w-full group perspective-[2000px] items-center justify-center pt-4">
                    <Image
                      alt="VentureDen screen 1"
                      loading="lazy"
                      width={3036}
                      height={2082}
                      className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto w-[85%] max-lg:z-10 lg:block transition-[translate,rotate,scale,filter] duration-500 ease-out -translate-x-10 -rotate-6 scale-80 brightness-90 lg:translate-x-0 lg:rotate-0 lg:scale-100 lg:brightness-100 lg:group-hover:-translate-x-10 lg:group-hover:-rotate-6 lg:group-hover:scale-[0.90] lg:group-hover:brightness-90"
                      sizes="(max-width: 768px) 85vw, 500px"
                      src="/images/image_5.jpg"
                    />
                    <Image
                      alt="VentureDen screen 2"
                      loading="lazy"
                      width={3066}
                      height={2088}
                      className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto absolute right-[5%] bottom-0 w-[65%] lg:block transition-[translate,rotate,scale,opacity] duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [transition-delay:75ms] translate-x-4 -translate-y-5 rotate-3 scale-90 opacity-100 lg:translate-x-0 lg:translate-y-12 lg:rotate-12 lg:scale-75 lg:opacity-0 lg:group-hover:translate-x-4 lg:group-hover:-translate-y-5 lg:group-hover:rotate-3 lg:group-hover:scale-100 lg:group-hover:opacity-100"
                      sizes="(max-width: 768px) 65vw, 430px"
                      src="/images/image_10.jpg"
                    />
                  </div>
                </div>
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/nextjs.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Next.js
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/react.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    React
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/typescript.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TypeScript
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/sanity.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Sanity CMS
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/groq.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    GROQ
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/tailwindcss.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Tailwind CSS
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/motion.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Motion.dev
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/react-query.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TanStack Query
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/zod.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zod
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/turborepo.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Turborepo
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/pnpm.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    pnpm
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/markdown.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Markdown
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      04
                    </span>
                    <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      Mobile App
                    </span>
                  </div>
                  <a
                    className="group flex items-center gap-2"
                    href="/projects/finote"
                  >
                    <h2 className="font-bluu font-bold text-2xl text-neutral-900 leading-tight dark:text-white">
                      Finote
                    </h2>
                  </a>
                </div>
                <span
                  data-slot="badge"
                  data-variant="secondary"
                  className="Aborder inline-flex w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap py-1 shadow-border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none border-hairline bg-secondary [a&]:hover:bg-secondary/90 shrink-0 rounded-full px-3 text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  Q4 2025
                </span>
              </div>
            </div>
            <a
              aria-label="View Details of Finote"
              className="group relative block aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-1 shadow-border sm:aspect-video md:aspect-16/10 lg:aspect-16/11 lg:rounded-3xl lg:p-2 dark:bg-white/6 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              href="/projects/finote"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block"
              />
              <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-white max-lg:pt-2 lg:rounded-[16px] dark:bg-black from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35 dark:bg-linear-to-b">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 transition-[transform,filter] duration-500 ease-in-out group-hover:scale-105 lg:brightness-95 lg:saturate-90 lg:group-hover:brightness-110 lg:group-hover:saturate-125"
                  style={{
                    background:
                      "linear-gradient(145deg, #4a1d8e 0%, #7E22CE 40%, #a855f7 75%, #d8b4fe 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block"
                />
                <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
                  <h3 className="text-sm sm:text-base md:text-lg">
                    An intuitive mobile companion for organizing your digital
                    wallets and analyzing your financial health
                  </h3>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
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
                </div>
                <div className="absolute top-14 right-0 left-0 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
                  <div className="perspective-[2000px] group relative flex w-full items-start justify-center">
                    <Image
                      alt="Finote screen 1"
                      loading="lazy"
                      width={765}
                      height={1518}
                      className="absolute h-auto w-[40%] transition-[translate,rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 origin-bottom-right -translate-x-[55%] -rotate-6 scale-90 opacity-90 lg:group-hover:-translate-x-[calc(100%-1.5rem)] lg:group-hover:-translate-y-20 lg:group-hover:rotate-0 lg:group-hover:scale-80 lg:group-hover:opacity-100"
                      sizes="(max-width: 768px) 40vw, 270px"
                      src="/images/image_3.png"
                    />
                    <Image
                      alt="Finote screen 2"
                      loading="lazy"
                      width={765}
                      height={1518}
                      className="absolute h-auto w-[40%] transition-[translate,rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-20 lg:group-hover:-translate-y-10 lg:group-hover:scale-90"
                      sizes="(max-width: 768px) 40vw, 270px"
                      src="/images/image_2.png"
                    />
                    <Image
                      alt="Finote screen 3"
                      loading="lazy"
                      width={765}
                      height={1518}
                      className="absolute h-auto w-[40%] transition-[translate,rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 origin-bottom-left translate-x-[55%] rotate-6 scale-90 opacity-90 lg:group-hover:translate-x-[calc(100%-1.5rem)] lg:group-hover:-translate-y-20 lg:group-hover:rotate-0 lg:group-hover:scale-80 lg:group-hover:opacity-100"
                      sizes="(max-width: 768px) 40vw, 270px"
                      src="/images/image_1.png"
                    />
                  </div>
                </div>
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    react-native
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/expo.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Expo
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/typescript.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TypeScript
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/firebase.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Firebase
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/zod.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zod
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/zustand.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Zustand
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    cloudinary
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    reanimated
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    gifted-charts
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      05
                    </span>
                    <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                    <span className="text-[10px] text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
                      Web App
                    </span>
                  </div>
                  <a
                    className="group flex items-center gap-2"
                    href="/projects/star-forge"
                  >
                    <h2 className="font-bluu font-bold text-2xl text-neutral-900 leading-tight dark:text-white">
                      StarForge
                    </h2>
                  </a>
                </div>
                <span
                  data-slot="badge"
                  data-variant="secondary"
                  className="Aborder inline-flex w-fit items-center justify-center gap-2 overflow-hidden whitespace-nowrap py-1 shadow-border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none border-hairline bg-secondary [a&]:hover:bg-secondary/90 shrink-0 rounded-full px-3 text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  Q1 2024
                </span>
              </div>
            </div>
            <a
              aria-label="View Details of StarForge"
              className="group relative block aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-1 shadow-border sm:aspect-video md:aspect-16/10 lg:aspect-16/11 lg:rounded-3xl lg:p-2 dark:bg-white/6 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              href="/projects/star-forge"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block"
              />
              <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-white max-lg:pt-2 lg:rounded-[16px] dark:bg-black from-black/20 to-black/45 transition-colors duration-300 hover:from-black/20 lg:from-black/35 dark:bg-linear-to-b">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 transition-[transform,filter] duration-500 ease-in-out group-hover:scale-105 lg:brightness-95 lg:saturate-90 lg:group-hover:brightness-110 lg:group-hover:saturate-125"
                  style={{
                    background:
                      "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block"
                />
                <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
                  <h3 className="text-sm sm:text-base md:text-lg">
                    A sleek AI SaaS landing page with a user-friendly design
                    that enhances engagement.
                  </h3>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 sm:block"
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
                </div>
                <div className="absolute top-14 right-0 left-0 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
                  <div className="relative flex w-full justify-start pt-2">
                    <Image
                      alt="StarForge screen 1"
                      loading="lazy"
                      width={1378}
                      height={1081}
                      className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto absolute top-3 right-[3%] z-20 w-[68%] lg:top-0 transition-all duration-500 ease-out lg:group-hover:z-15 lg:group-hover:translate-y-[3%] lg:group-hover:rotate-3 lg:group-hover:scale-95 lg:group-hover:brightness-90"
                      sizes="(max-width: 768px) 68vw, 450px"
                      src="/images/image_7.jpg"
                    />
                    <Image
                      alt="StarForge screen 2"
                      loading="lazy"
                      width={1378}
                      height={1324}
                      className="rounded-t-sm border-2 border-white/50 lg:border-3 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_15px_50px_-5px_rgba(0,0,0,0.5)] h-auto relative z-10 ml-[3%] w-[55%] translate-y-10 transition-all duration-500 ease-out lg:group-hover:z-30 lg:group-hover:translate-x-[5%] lg:group-hover:translate-y-0 lg:group-hover:-rotate-3 lg:group-hover:scale-[1.08]"
                      sizes="(max-width: 768px) 55vw, 380px"
                      src="/images/image_15.jpg"
                    />
                  </div>
                </div>
              </div>
            </a>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/nextjs.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Next.js
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/react.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    React
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/typescript.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    TypeScript
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5"
                    height={14}
                    loading="lazy"
                    src="/images/tailwindcss.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Tailwind CSS
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <span aria-hidden="true" className="h-3 sm:h-3.5" />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    parallax
                  </span>
                </span>
              </div>
              <div style={{ opacity: 0, transform: "scale(0.8)" }}>
                <span className="flex gap-0 rounded-md bg-primary/5 px-2 py-1 shadow-border sm:px-2.5 sm:py-[5px]">
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="mr-1.5 size-3 sm:size-3.5 dark:invert"
                    height={14}
                    loading="lazy"
                    src="/images/vercel.svg"
                    width={14}
                  />
                  <span className="font-medium text-[10px] text-neutral-600 uppercase tracking-wide sm:text-[11px] dark:text-neutral-300">
                    Vercel
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*$!*/}
        <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
        <div className="hidden min-h-96 lg:flex" />
        {/*/$*/}
        <a
          className="group flex w-fit items-center justify-center gap-2 font-mono text-neutral-800 text-xs uppercase transition-colors hover:text-black dark:text-white/80 mx-auto mt-pagebuilder"
          href="/projects"
        >
          See more projects
          <div className="relative size-[25px] overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-colors duration-500 group-hover:bg-neutral-200 dark:border-white/10 dark:group-hover:bg-white/10">
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-full">
              <svg
                fill="none"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                className="size-[14px]"
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
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-full">
              <svg
                fill="none"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                className="size-[14px]"
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
          </div>
        </a>
      </section>
    </>
  );
}
