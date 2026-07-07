"use client";

import SoundCard from "./SoundCard";
import TechStack from "./tech_stack";
import Usesd from "./Usesd";

export default function Features() {
  return (
    <>
      <div className="mb-pagebuilder grid grid-cols-1 gap-3 border-y md:grid-cols-12 lg:my-pagebuilder">
        <SoundCard />
        <div className="md:col-span-6 lg:col-span-5 lg:row-span-5">
          <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border h-full min-h-72">
            <TechStack />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-4 lg:row-span-6">
          <a
            className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border cursor-pointer h-full min-h-72"
            href="/projects">
            <div className="size-full">
              <div className="absolute inset-0 -bottom-10 flex items-end justify-center overflow-hidden">
                {/*$!*/}
                <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
                {/*/$*/}
              </div>
            </div>
            <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute top-0 left-0 text-left">
              <p className="text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                What You Get
              </p>
              <p className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
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
                className="size-[18px] text-neutral-700 dark:text-neutral-200">
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
              <p className="text-neutral-400 text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
                Flexible With Timezones
              </p>
              <p className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
                Based in India, available globally
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
          </div>
        </div>

        <Usesd />
      </div>
    </>
  );
}
