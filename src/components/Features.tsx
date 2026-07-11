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
          <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl h-full min-h-72 card-premium">
            <TechStack />
          </div>
        </div>
        <ServicesCarousel />
        <Network />
        <Usesd />
      </div>
    </>
  );
}
