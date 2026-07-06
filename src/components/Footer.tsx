import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="container max-sm:px-1 mx-auto">
        <div className="relative border">
          <div className="flex flex-col lg:flex-row">
            <div className="hidden w-full flex-col justify-between px-4 py-6 text-sm max-lg:border-b lg:flex lg:w-[44%] lg:border-e lg:px-16 lg:pr-8">
              <div className="grow space-y-4">
                <h2 className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">Rashedul Islam</h2>
                <p className="w-60 text-base text-neutral-500 leading-5 dark:text-neutral-400">
                    A full-stack developer, freelancer &amp; problem
                  solver. Thanks for checking out my site!
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-start px-4 py-6 text-xs lg:w-[56%] lg:px-16">
              <div className="flex w-full flex-wrap justify-between gap-8 md:gap-18">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <h4 className="px-2 text-neutral-700 text-xs uppercase dark:text-neutral-400">
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
                  <h4 className="px-2 text-neutral-700 text-xs uppercase dark:text-neutral-400">
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
                  <h4 className="px-2 text-neutral-700 text-xs uppercase dark:text-neutral-400">
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
                  href="https://github.com/rashedulraha"
                >
                  Rashedul islam
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
