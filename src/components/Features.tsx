"use client";

import Network from "./Network";
import SoundCard from "./SoundCard";
import TechStack from "./tech_stack";
import Usesd from "./Usesd";

import ServicesCarousel from "./ServicesCarousel";

export default function Features() {
  return (
    <>
      <div className="mb-pagebuilder grid grid-cols-1 gap-3 border-y md:grid-cols-12 lg:my-pagebuilder">
        {/* First part  */}
        <SoundCard />
        {/* second part */}
        <div className="md:col-span-6 lg:col-span-5 lg:row-span-5">
          <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border h-full min-h-72">
            <TechStack />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
          </div>
        </div>
        <ServicesCarousel />
        <Network />
        <Usesd />
      </div>
    </>
  );
}
