import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="container max-sm:px-1 mx-auto">
        <div className="relative border">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden w-full flex-col justify-between px-4 py-6 text-sm max-lg:border-b lg:flex lg:w-[44%] lg:border-e lg:px-16 lg:pr-8">
              <div className="grow space-y-4">
                <a aria-label="Homepage" className="inline-block" href="/">
                  <svg
                    className="size-10"
                    viewBox="0 0 5350 5350"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-black dark:fill-white"
                      d="M265 4069c-70-20-71-59-4-197 29-59 78-161 109-227 32-66 85-178 119-248 77-159 167-347 236-492 29-60 81-168 115-240 34-71 79-166 100-210 21-44 62-132 93-195 30-63 101-212 157-330 240-504 311-652 373-780 35-74 101-210 145-303 90-186 96-193 186-184 58 5 76 23 124 121 341 693 462 946 462 968 0 10 3 18 8 18 4 0 17 19 29 42 27 52 229 469 288 593 23 50 88 182 143 295 55 113 165 340 245 505 80 165 188 389 241 499 53 109 103 214 112 235 18 44 11 91-17 117-20 18-41 19-303 19-281 0-281 0-344-29-110-51-132-84-347-521-106-214-303-613-437-886-135-273-251-499-257-503-19-12-39 11-73 83-17 36-85 176-151 311-66 135-134 277-152 315-18 39-65 138-105 220-82 169-166 344-250 520-153 323-181 373-230 419-73 68-112 76-369 75-119 0-229-5-246-10z"
                    />
                    <path
                      className="fill-black dark:fill-white"
                      d="M3922 3999c-42-21-47-29-134-208-143-293-148-310-107-347 19-17 43-20 253-24 274-7 308-16 406-107 209-193 166-551-82-696-100-58-168-67-520-67-344 0-370-3-403-53-9-14-54-107-101-206-92-200-101-237-59-269 24-19 45-20 373-24 347-4 347-4 422-39 137-65 210-175 210-317 0-176-102-308-267-348-46-10-182-13-642-14-584 0-584 0-618-38-30-32-93-155-234-460-37-80-38-124-3-151 26-21 33-21 788-21 708 0 769 1 876 20 238 40 409 119 565 262 120 109 221 278 266 443 45 169 34 388-28 557-30 81-104 197-157 247-20 19-36 43-36 52 0 10 32 40 78 72 309 217 445 544 388 927-66 435-413 770-851 820-49 5-146 10-215 10-108 0-131-3-168-21z"
                    />
                  </svg>
                </a>
                <p className="w-60 text-base text-neutral-500 leading-5 dark:text-neutral-400">
                  I'm Aayush - a full-stack developer, freelancer &amp; problem
                  solver. Thanks for checking out my site!
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-start px-4 py-6 text-xs lg:w-[56%] lg:px-16">
              <div className="flex w-full flex-wrap justify-between gap-8 md:gap-18">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <h4 className="px-2 font-mono text-neutral-700 text-xs uppercase dark:text-neutral-400">
                    General
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-x-4 gap-y-2 text-base sm:gap-y-3 dark:text-neutral-50">
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/"
                      >
                        Home
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/about"
                      >
                        About
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/projects"
                      >
                        Projects
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/blog"
                      >
                        Blog
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <h4 className="px-2 font-mono text-neutral-700 text-xs uppercase dark:text-neutral-400">
                    Specifics
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-x-4 gap-y-2 text-base sm:gap-y-3 dark:text-neutral-50">
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/guestbook"
                      >
                        Guest Book
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/bucket-list"
                      >
                        Bucket List
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/uses"
                      >
                        Uses
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/attribution"
                      >
                        Attribution
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4">
                  <h4 className="px-2 font-mono text-neutral-700 text-xs uppercase dark:text-neutral-400">
                    More
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-x-4 gap-y-2 text-base sm:gap-y-3 dark:text-neutral-50">
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/contact"
                      >
                        Book a call
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/links"
                      >
                        Links
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/rss"
                      >
                        RSS
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/legal/privacy"
                      >
                        Privacy
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative inline-flex items-center px-2 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0 before:w-full before:bg-white before:mix-blend-difference before:content-[''] before:origin-center before:transition-[height] before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-[1.4em]"
                        href="/legal/terms"
                      >
                        Terms
                        <svg
                          aria-hidden="true"
                          className="opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:opacity-100 z-0 ml-[0.6em] size-[0.55em] translate-y-1 group-hover:translate-y-0 group-hover:rotate-45"
                          fill="none"
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 border-t p-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
              <p className="text-neutral-500 text-xs dark:text-neutral-400">
                © {/* */}2026{/* */}{" "}
                <a
                  className="font-medium text-neutral-700 transition-colors hover:text-black hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-white"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/aayushbharti"
                >
                  Aayush Bharti
                </a>
                . All rights reserved
              </p>
              <div className="flex items-center gap-4 font-medium text-xs">
                <a
                  className="text-neutral-600 transition-colors hover:text-black hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-white"
                  href="/legal/privacy"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-neutral-600 transition-colors hover:text-black hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-white"
                  href="/legal/terms"
                >
                  Terms of Use
                </a>
                <a
                  className="text-neutral-600 transition-colors hover:text-black hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-white"
                  href="/sitemap.xml"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="h-7 w-full border-t bg-size-[6px_6px] bg-[linear-gradient(-45deg,var(--color-neutral-300)_12.5%,transparent_12.5%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.5%,transparent_62.5%,transparent_100%)] dark:bg-[linear-gradient(-45deg,var(--color-neutral-800)_12.5%,transparent_12.5%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.5%,transparent_62.5%,transparent_100%)]"
          />
        </div>
      </footer>
    </>
  );
}
