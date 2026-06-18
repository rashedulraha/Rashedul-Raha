"use client";

import { motion, useScroll } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
// import hero component
import { Hero } from "./Hero";

import GitHubStats from "./GitHubStats";
// import { ThreeDMarqueeHome } from "./ThreeDMarqueeHome";

import NetworkVisualization from "@/components/network";
import Footer from "./Footer.quick";
import FeaturedProjects from "./FeaturedProjects";

import AboutQuickView from "./AboutQuickView";
import SkillsQuickView from "./SkillsQuickView";
import { GlobeToMapTransform } from "@/components/GlobeToMapTransform";

export default function QuickView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Hero />
      <Navbar />
      <div className="min-h-screen">
        <div className="flex flex-col space-y-10 md:space-y-20">
          <AboutQuickView />
          <SkillsQuickView />
          <FeaturedProjects />
          <NetworkVisualization />
          <GitHubStats />
        </div>
        <Footer />
      </div>
    </>
  );
}
