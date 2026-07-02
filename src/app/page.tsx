import { Hero } from "@/components/main/hero";
import { About } from "@/components/sub/about";
import Skills from "@/components/sub/skills";
import { Experience } from "@/components/sub/experience";
import { Contact } from "@/components/sub/contact";
import { Projects } from "@/components/sub/projects";
import dynamic from "next/dynamic";

const ProductionPipeline = dynamic(
  () =>
    import("@/components/sub/production-pipeline").then(
      (mod) => mod.ProductionPipeline
    )
);

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col">
      <Hero />
      <About />
      <Skills />
      <ProductionPipeline />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
