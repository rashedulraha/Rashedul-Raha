import Image from "next/image";

export default function Blog() {
  return (
    <>
      <section className="relative w-full py-pagebuilder" id="blog">
        <h2
          className="relative z-2 mx-auto mb-pagebuilder max-w-xl text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl text-center"
          style={{
            textShadow:
              "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
          }}
        >
          <p className="mb-4 font-mono font-normal text-black/80 text-xs uppercase tracking-widest dark:text-white/70">
            FROM THE DESK
          </p>
          <span className="inline-block font-instrument-serif">
            Thoughts &amp;{" "}
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
              writings
            </span>
          </span>
        </h2>
        <div aria-hidden="true" className="w-full border-t" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="group flex h-full flex-col rounded-3xl p-2.5 ring-1 ring-border transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
            href="/blog/how-to-optimise-a-nextjs-web-app"
          >
            <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              <img
                alt="How to Optimise a Next.js Web App"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                srcSet="/images/image_47.jpg 384w, /images/image_19.jpg 640w, /images/image_50.jpg 828w, /images/image_68.jpg 1080w, /images/image_58.jpg 1440w, /images/image_17.jpg 1920w"
                src="/images/image_17.jpg"
              />
              <div className="absolute inset-0 bg-black/25 dark:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <span className="text-balance text-center font-normal text-white text-xl leading-snug tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  Optimise Your Next.js App
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-2 pt-4 pb-3">
              <h3 className="font-semibold text-lg text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                How to Optimise a Next.js Web App
              </h3>
              <p className="mt-2 line-clamp-3 text-neutral-600 text-sm leading-relaxed dark:text-neutral-400">
                Practical techniques to fix your Next.js Lighthouse score —
                bundle analysis, caching strategies, React Compiler, and the
                next.config flags nobody talks about.
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide dark:text-neutral-500">
                  <span>15{/* */} min read</span>
                  <span className="mx-1.5">·</span>
                  <time dateTime="2026-04-14T00:00:00.000Z">Apr 14, 2026</time>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-neutral-600 text-xs tracking-wide transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
                  <span>Read article</span>
                  <div className="size-[25px] overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-all duration-500 group-hover:bg-neutral-200 dark:border-white/10 dark:group-hover:bg-white/10">
                    <div className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            className="group flex h-full flex-col rounded-3xl p-2.5 ring-1 ring-border transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
            href="/blog/terminal-first-dev-setup"
          >
            <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              <img
                alt="Every Tool in My Terminal-First Dev Setup"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                srcSet="/images/image_63.jpg 384w, /images/image_45.jpg 640w, /images/image_48.jpg 828w, /images/image_55.jpg 1080w, /images/image_70.jpg 1440w, /images/image_18.jpg 1920w"
                src="/images/image_18.jpg"
              />
              <div className="absolute inset-0 bg-black/25 dark:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <span className="text-balance text-center font-normal text-white text-xl leading-snug tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  My Terminal-First Setup
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-2 pt-4 pb-3">
              <h3 className="font-semibold text-lg text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                Every Tool in My Terminal-First Dev Setup
              </h3>
              <p className="mt-2 line-clamp-3 text-neutral-600 text-sm leading-relaxed dark:text-neutral-400">
                Neovim, Wezterm, Tmux, and the rest — what survived two years of
                daily use and why I picked each one over the obvious
                alternatives.
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide dark:text-neutral-500">
                  <span>12{/* */} min read</span>
                  <span className="mx-1.5">·</span>
                  <time dateTime="2025-10-19T00:00:00.000Z">Oct 19, 2025</time>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-neutral-600 text-xs tracking-wide transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
                  <span>Read article</span>
                  <div className="size-[25px] overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-all duration-500 group-hover:bg-neutral-200 dark:border-white/10 dark:group-hover:bg-white/10">
                    <div className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            className="group flex h-full flex-col rounded-3xl p-2.5 ring-1 ring-border transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
            href="/blog/build-a-blog-with-nextjs-and-mdx"
          >
            <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              <img
                alt="Build a Blog with Next.js and MDX from Scratch"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                srcSet="/images/image_65.jpg 384w, /images/image_59.jpg 640w, /images/image_67.jpg 828w, /images/image_62.jpg 1080w, /images/image_3.webp 1440w, /images/image_1.webp 1920w"
                src="/images/image_1.webp"
              />
              <div className="absolute inset-0 bg-black/25 dark:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <span className="text-balance text-center font-normal text-white text-xl leading-snug tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                  Next.js + MDX Blog
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-2 pt-4 pb-3">
              <h3 className="font-semibold text-lg text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                Build a Blog with Next.js and MDX from Scratch
              </h3>
              <p className="mt-2 line-clamp-3 text-neutral-600 text-sm leading-relaxed dark:text-neutral-400">
                File-based content, zero database, full control. A complete
                walkthrough of building a statically-generated blog with
                Next.js, MDX, and gray-matter.
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide dark:text-neutral-500">
                  <span>11{/* */} min read</span>
                  <span className="mx-1.5">·</span>
                  <time dateTime="2025-03-12T00:00:00.000Z">Mar 12, 2025</time>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-neutral-600 text-xs tracking-wide transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
                  <span>Read article</span>
                  <div className="size-[25px] overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-all duration-500 group-hover:bg-neutral-200 dark:border-white/10 dark:group-hover:bg-white/10">
                    <div className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                      <span className="flex size-6">
                        <svg
                          fill="none"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="m-auto size-[14px]"
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
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div aria-hidden="true" className="w-full border-t" />
        <a
          className="group flex w-fit items-center justify-center gap-2 font-mono text-neutral-800 text-xs uppercase transition-colors hover:text-black dark:text-white/80 mx-auto mt-pagebuilder"
          href="/blog"
        >
          Read more posts
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
