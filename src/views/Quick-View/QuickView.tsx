"use client";

import Navbar from "../shared/Navbar/Navbar";

import GitHubStats from "./GitHubStats";

import NetworkVisualization from "@/components/network";
import Footer from "./Footer.quick";
import FeaturedProjects from "./FeaturedProjects";

import AboutQuickView from "./AboutQuickView";
import SkillsQuickView from "./SkillsQuickView";

export default function QuickView() {
  return (
    <>
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
