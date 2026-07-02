"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  readonly src: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly slug: string;
  readonly link?: string;
  readonly github?: string;
  readonly onClick?: () => void;
}

export const ProjectCard = ({
  src,
  title,
  description,
  tags,
  slug,
  link,
  github,
  onClick,
}: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-bg-surface border border-border-subtle hover:border-accent-purple/30 hover:bg-bg-surface/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm cursor-pointer justify-between"
    >
      <div className="flex flex-col">
        {/* Image Container with Aspect Ratio */}
        <div className="relative w-full aspect-video overflow-hidden border-b border-border-subtle bg-bg-primary/50">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
          {/* Hover overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col p-6">
          {/* Tag Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wider text-accent-purple bg-accent-purple/5 border border-accent-purple/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 group-hover:text-accent-purple transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed font-light line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col p-6 pt-0 mt-auto gap-4">
        {/* Action Buttons (Guarded from navigating) */}
        <div className="flex items-center gap-2.5 z-10">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-accent-purple hover:bg-accent-purple/25 text-xs font-semibold transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:bg-border-subtle hover:text-text-primary text-xs font-semibold transition-all duration-300"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>

        {/* Card details link indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary group-hover:text-accent-purple transition-colors duration-300">
          <span>View Details</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
