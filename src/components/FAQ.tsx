import Image from "next/image";

export default function FAQ() {
  return (
    <>
      <section className="relative py-pagebuilder">
        <h2
          className="relative z-2 mx-auto mb-pagebuilder max-w-xl text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl text-center"
          style={{
            textShadow:
              "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
          }}
        >
          <p className="mb-4 font-normal text-black/80 text-xs uppercase tracking-widest dark:text-white/70">
            My Site
          </p>
          <span className="inline-block">
            Explore, experiment{" "}
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
              &amp;&amp; say hello
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-3 border-y md:grid-cols-12">
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <a
              className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer h-72"
              href="/uses"
            >
              <div className="size-full">
                <div className="mt-10 flex items-center justify-center gap-3 md:mt-12">
                  <div className="inline-block text-center">
                    <div className="rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-indigo-400/60 size-24 delay-200">
                      <div className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] shadow-inner transition-colors duration-500 group-hover:bg-indigo-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:bg-indigo-500/10">
                        <img
                          alt="Zed"
                          loading="lazy"
                          width={50}
                          height={50}
                          className="h-10 w-10"
                          style={{ color: "transparent" }}
                          src="/images/image_1.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-block text-center">
                    <div className="rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-indigo-400/60 size-24 delay-100">
                      <div className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] shadow-inner transition-colors duration-500 group-hover:bg-indigo-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:bg-indigo-500/10">
                        <img
                          alt="Claude Code"
                          loading="lazy"
                          width={50}
                          height={50}
                          className="h-10 w-10"
                          style={{ color: "transparent" }}
                          src="/images/image_2.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-block text-center">
                    <div className="rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-indigo-400/60 size-28 delay-0">
                      <div className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] shadow-inner transition-colors duration-500 group-hover:bg-indigo-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:bg-indigo-500/10">
                        <img
                          alt="Ghostty"
                          loading="lazy"
                          width={50}
                          height={50}
                          className="h-10 w-10"
                          style={{ color: "transparent" }}
                          src="/images/image.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-block text-center">
                    <div className="rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-indigo-400/60 size-24 delay-100">
                      <div className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] shadow-inner transition-colors duration-500 group-hover:bg-indigo-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:bg-indigo-500/10">
                        <img
                          alt="Arc"
                          loading="lazy"
                          width={50}
                          height={50}
                          className="h-10 w-10"
                          style={{ color: "transparent" }}
                          src="/images/image_11.jpg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-block text-center">
                    <div className="rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:border-indigo-400/60 size-24 delay-200">
                      <div className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] shadow-inner transition-colors duration-500 group-hover:bg-indigo-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:group-hover:bg-indigo-500/10">
                        <img
                          alt="Linear"
                          loading="lazy"
                          width={50}
                          height={50}
                          className="h-10 w-10"
                          style={{ color: "transparent" }}
                          src="/images/image_3.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 w-full text-center">
                <p className="text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                  Uses
                </p>
                <p className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                  Check out my favorite tools
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
              <div className="absolute right-4 bottom-4 z-20 flex size-9 items-center justify-center rounded-2xl border-dashed bg-black/10 max-md:border dark:bg-white/10 transition-all duration-300 ease-out -translate-y-2 opacity-100 md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[18px] text-neutral-700 dark:text-neutral-200"
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
            </a>
          </div>
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <a
              className="group relative flex w-full flex-col justify-between rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer group h-72 overflow-hidden"
              href="/about"
            >
              <div className="size-full">
                <div className="absolute inset-x-0 -bottom-4 flex justify-center">
                  <div className="relative h-48 w-36">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-4 rounded-full bg-indigo-500/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-indigo-400/30"
                    />
                    <div className="absolute inset-0 scale-105 rounded-2xl border border-neutral-300 p-2 transition-all duration-500 ease-out group-hover:border-indigo-400/60 dark:border-neutral-600 dark:group-hover:border-indigo-400/60">
                      <div className="h-full w-full rounded-xl border-2 border-neutral-200/10 bg-[#dfe0e1] shadow-inner dark:border-neutral-500/20 dark:bg-neutral-700" />
                    </div>
                    <img
                      alt="Aayush Bharti"
                      loading="lazy"
                      width={144}
                      height={192}
                      className="absolute inset-0 h-48 w-36 rotate-8 rounded-lg object-cover shadow transition-all duration-500 group-hover:rotate-3 group-hover:scale-105"
                      src="/images/image_8.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute top-0 left-0 w-full text-center">
                <p className="text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                  Behind The Code
                </p>
                <p className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                  Journey, skills &amp; experience
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
              <div className="absolute right-4 bottom-4 z-20 flex size-9 items-center justify-center rounded-2xl border-dashed bg-black/10 max-md:border dark:bg-white/10 transition-all duration-300 ease-out -translate-y-2 opacity-100 md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                <svg
                  fill="none"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[18px] text-neutral-700 dark:text-neutral-200"
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
            </a>
          </div>
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <div className="relative w-full h-72">
              <a
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer size-full"
                href="/guestbook"
              >
                <div className="size-full">
                  <div className="absolute inset-0 bg-[length:16px_16px] bg-[radial-gradient(circle,#c4c4c4_1px,transparent_1px)] opacity-50 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] dark:bg-[radial-gradient(circle,#525252_1px,transparent_1px)] dark:opacity-50" />
                  <svg
                    className="absolute top-0 w-48 fill-neutral-500 drop-shadow-lg dark:fill-[#666666]"
                    fill="none"
                    viewBox="0 0 171 152"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: "translateY(-15px) rotate(-8deg)",
                    }}
                  >
                    <g clipPath="url(#clip0_1_2784)">
                      <g>
                        <g>
                          <rect
                            className="fill-neutral-100 stroke-transparent stroke-2 transition-colors duration-500 group-hover:fill-indigo-50 group-hover:stroke-indigo-400/60 dark:fill-neutral-800 dark:group-hover:fill-[#1f1f2e]"
                            height={160}
                            rx={8}
                            transform="rotate(-12 -0.170898 -17.4697)"
                            width={130}
                            x="-0.170898"
                            y="-17.4697"
                          />
                        </g>
                        <g opacity="0.75">
                          <g clipPath="url(#clip1_1_2784)">
                            <rect
                              fill="#E6649C"
                              height="124.298"
                              rx="2.56284"
                              transform="matrix(-0.978148 0.207912 0.207912 0.978148 120.827 -35.0101)"
                              width="125.899"
                            />
                            <g>
                              <circle
                                cx="53.2161"
                                cy="53.2161"
                                fill="#56D5B2"
                                r="53.2161"
                                transform="matrix(-0.978148 0.207912 0.207912 0.978148 99.5933 25.9023)"
                              />
                            </g>
                            <g>
                              <circle
                                cx="61.0174"
                                cy="61.0174"
                                fill="#7A4DD3"
                                r="61.0174"
                                transform="matrix(-0.978148 0.207912 0.207912 0.978148 81.0605 -88.0841)"
                              />
                            </g>
                            <g>
                              <circle
                                cx="32.0411"
                                cy="32.0411"
                                fill="#B1DDD1"
                                r="32.0411"
                                transform="matrix(-0.978148 0.207912 0.207912 0.978148 168.312 32.9433)"
                              />
                            </g>
                            <g>
                              <ellipse
                                cx="35.9418"
                                cy="33.7128"
                                fill="#74A3FF"
                                rx="35.9418"
                                ry="33.7128"
                                transform="matrix(-0.978148 0.207912 0.207912 0.978148 60.8179 9.64755)"
                              />
                            </g>
                            <g>
                              <circle
                                cx="53.2161"
                                cy="53.2161"
                                fill="#E38079"
                                r="53.2161"
                                transform="matrix(-0.978148 0.207912 0.207912 0.978148 164.068 -83.5099)"
                              />
                            </g>
                            <rect
                              className="fill-white"
                              height={8}
                              opacity="0.5"
                              rx={4}
                              transform="rotate(-12 32.8682 22.5352)"
                              width={58}
                              x="32.8682"
                              y="22.5352"
                            />
                            <rect
                              className="fill-white"
                              height={8}
                              opacity="0.5"
                              rx={4}
                              transform="rotate(-12 39.5215 53.8359)"
                              width={58}
                              x="39.5215"
                              y="53.8359"
                            />
                            <rect
                              className="fill-white"
                              height={8}
                              opacity="0.5"
                              rx={4}
                              transform="rotate(-12 97.4263 8.81303)"
                              width={16}
                              x="97.4263"
                              y="8.81303"
                            />
                            <rect
                              className="fill-white"
                              height={8}
                              opacity="0.5"
                              rx={4}
                              transform="matrix(-0.978148 0.207912 0.207912 0.978148 116.403 21.1368)"
                              width={58}
                            />
                            <rect
                              className="fill-white"
                              height={8}
                              opacity="0.5"
                              rx={4}
                              transform="matrix(-0.978148 0.207912 0.207912 0.978148 51.8452 34.859)"
                              width={16}
                            />
                          </g>
                        </g>
                        <circle
                          className="fill-neutral-300 dark:fill-[#A5AEB8]"
                          cx="46.9592"
                          cy="117.685"
                          opacity="0.25"
                          r={10}
                          transform="rotate(-12 46.9592 117.685)"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_2784">
                        <rect fill="white" height={152} width={171} />
                      </clipPath>
                      <clipPath id="clip1_1_2784">
                        <rect
                          fill="white"
                          height={116}
                          rx={2}
                          transform="matrix(-0.978148 0.207912 0.207912 0.978148 120.826 -35.0097)"
                          width={114}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    className="absolute top-8 -right-5 w-56 drop-shadow-lg md:top-10 md:right-0"
                    fill="none"
                    viewBox="0 0 214 223"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: "translateY(-5px) rotate(8deg)",
                    }}
                  >
                    <g>
                      <g>
                        <rect
                          className="fill-neutral-100 stroke-transparent stroke-2 transition-colors duration-500 group-hover:fill-indigo-50 group-hover:stroke-indigo-400/60 dark:fill-neutral-800 dark:group-hover:fill-[#1f1f2e]"
                          height={160}
                          rx={8}
                          transform="rotate(12 64.5547 8.50171)"
                          width={130}
                          x="64.5547"
                          y="8.50171"
                        />
                      </g>
                      <g opacity="0.75">
                        <g clipPath="url(#clip0_1_2773)">
                          <rect
                            fill="url(#paint0_linear_1_2773)"
                            height="124.298"
                            rx="2.56284"
                            transform="matrix(-0.978148 -0.207912 -0.207912 0.978148 182.226 41.6919)"
                            width="125.899"
                          />
                          <rect
                            className="fill-white"
                            height={8}
                            opacity="0.5"
                            rx={4}
                            transform="rotate(12 78.4663 58.4864)"
                            width={58}
                            x="78.4663"
                            y="58.4864"
                          />
                          <rect
                            className="fill-white"
                            height={8}
                            opacity="0.5"
                            rx={4}
                            transform="rotate(12 71.8135 89.7871)"
                            width={58}
                            x="71.8135"
                            y="89.7871"
                          />
                          <rect
                            className="fill-white"
                            height={8}
                            opacity="0.5"
                            rx={4}
                            transform="rotate(12 143.024 72.2085)"
                            width={16}
                            x="143.024"
                            y="72.2085"
                          />
                          <rect
                            className="fill-white"
                            height={8}
                            opacity="0.5"
                            rx={4}
                            transform="matrix(-0.978148 -0.207912 -0.207912 0.978148 155.348 91.1855)"
                            width={58}
                          />
                          <rect
                            className="fill-white"
                            height={8}
                            opacity="0.5"
                            rx={4}
                            transform="matrix(-0.978148 -0.207912 -0.207912 0.978148 90.79 77.4633)"
                            width={16}
                          />
                        </g>
                      </g>
                      <circle
                        className="fill-neutral-300 dark:fill-[#A5AEB8]"
                        cx="52.6379"
                        cy="151.141"
                        opacity="0.25"
                        r={10}
                        transform="rotate(12 52.6379 151.141)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="paint0_linear_1_2773"
                        x1="110.398"
                        x2="-4.8642"
                        y1="-2.56166"
                        y2="120.596"
                      >
                        <stop stopColor="#FFD2ED" />
                        <stop offset={1} stopColor="#C691FF" />
                      </linearGradient>
                      <clipPath id="clip0_1_2773">
                        <rect
                          fill="white"
                          height={116}
                          rx={2}
                          transform="matrix(-0.978148 -0.207912 -0.207912 0.978148 182.226 41.6921)"
                          width={114}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 w-full text-center">
                  <p className="text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                    Guestbook
                  </p>
                  <p className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                    Let me know you were here
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
                <div className="absolute right-4 bottom-4 z-20 flex size-9 items-center justify-center rounded-2xl border-dashed bg-black/10 max-md:border dark:bg-white/10 transition-all duration-300 ease-out -translate-y-2 opacity-100 md:translate-y-0 md:opacity-0 md:group-hover:-translate-y-2 md:group-hover:opacity-100">
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[18px] text-neutral-700 dark:text-neutral-200"
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
