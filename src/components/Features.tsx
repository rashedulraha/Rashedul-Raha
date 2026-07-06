import Image from "next/image";

export default function Features() {
  return (
    <>
      <div className="mb-pagebuilder grid grid-cols-1 gap-3 border-y md:grid-cols-12 lg:my-pagebuilder">
        <div className="col-span-1 md:col-span-6 lg:col-span-7 lg:row-span-5">
          <a
            className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer h-full min-h-72"
            href="/contact"
          >
            <div className="size-full">
              {/*$!*/}
              <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
              {/*/$*/}
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 w-full text-center">
              <p className="font-mono text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                Let's Build Together
              </p>
              <p className="font-bluu text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                Clear communication, fast iterations, no surprises
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
        <div className="md:col-span-6 lg:col-span-5 lg:row-span-5">
          <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border h-full min-h-72">
            <div className="size-full">
              <div className="absolute inset-0 -bottom-18">
                {/*$!*/}
                <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
                {/*/$*/}
              </div>
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute top-0 left-0 w-full text-center">
              <p className="font-mono text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                Tech Stack
              </p>
              <p className="font-bluu text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                The stack behind everything I ship
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
          </div>
        </div>
        <div className="md:col-span-6 lg:col-span-4 lg:row-span-6">
          <a
            className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer h-full min-h-72"
            href="/projects"
          >
            <div className="size-full">
              <div className="absolute inset-0 -bottom-10 flex items-end justify-center overflow-hidden">
                {/*$!*/}
                <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
                {/*/$*/}
              </div>
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute top-0 left-0 text-left">
              <p className="font-mono text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                What You Get
              </p>
              <p className="font-bluu text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                Clean code, pixel-perfect UI, deployed &amp; scaling
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
        <div className="md:col-span-6 lg:col-span-4 lg:row-span-6">
          <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border h-full min-h-72">
            <div className="size-full">
              <div className="absolute -bottom-36 left-1/2 w-sm -translate-x-1/2">
                {/*$!*/}
                <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
                {/*/$*/}
              </div>
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute top-0 left-0 text-left">
              <p className="font-mono text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                Flexible With Timezones
              </p>
              <p className="font-bluu text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                Based in India, available globally
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
          </div>
        </div>
        <div className="col-span-1 md:col-span-12 lg:col-span-4 lg:row-span-6">
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
                        decoding="async"
                        data-nimg={1}
                        className="h-10 w-10"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_23.jpg 1x, /images/image_1.jpg 2x"
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
                        decoding="async"
                        data-nimg={1}
                        className="h-10 w-10"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_43.jpg 1x, /images/image_2.jpg 2x"
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
                        decoding="async"
                        data-nimg={1}
                        className="h-10 w-10"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_49.jpg 1x, /images/image.jpg 2x"
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
                        decoding="async"
                        data-nimg={1}
                        className="h-10 w-10"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_52.jpg 1x, /images/image_11.jpg 2x"
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
                        decoding="async"
                        data-nimg={1}
                        className="h-10 w-10"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_28.jpg 1x, /images/image_3.jpg 2x"
                        src="/images/image_3.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 w-full text-center">
              <p className="font-mono text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                Uses
              </p>
              <p className="font-bluu text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
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
      </div>
    </>
  );
}
