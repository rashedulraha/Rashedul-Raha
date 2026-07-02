import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/constants";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative w-full min-h-screen py-24 md:py-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-8 transition-colors duration-300 font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Title Block */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-text-secondary font-light max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Image & Features */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-bg-surface shadow-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-w-1024px) 100vw, 80vw"
                className="object-cover"
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                About the Project
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border-subtle">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-purple" />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-4 rounded-xl bg-bg-surface border border-border-subtle animate-fadeIn"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-normal">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Meta Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-text-primary font-mono uppercase tracking-wider pb-4 border-b border-border-subtle">
                Project Specs
              </h3>

              {/* Meta items */}
              <div className="space-y-4 text-sm">
                {project.role && (
                  <div className="flex items-start gap-3">
                    <Code2 className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-secondary uppercase font-mono tracking-wider font-semibold">
                        My Role
                      </p>
                      <p className="text-text-primary font-medium">{project.role}</p>
                    </div>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-text-secondary uppercase font-mono tracking-wider font-semibold">
                        Timeline
                      </p>
                      <p className="text-text-primary font-medium">{project.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies list */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-border-subtle">
                  <h4 className="text-xs text-text-secondary uppercase font-mono tracking-wider font-semibold">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-text-primary bg-bg-surface border border-border-subtle px-3 py-1 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-border-subtle">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-semibold hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border-subtle bg-bg-surface text-text-primary text-sm font-semibold hover:bg-border-subtle transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FaGithub className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
