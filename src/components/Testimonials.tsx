"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  title: string;
  message: string;
};

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Marcus T.",
    role: "Marketing Director, SaaS startup",
    avatar: "https://i.pravatar.cc/150?img=11",
    title: "We went from Figma to production in 11 days",
    message:
      "We'd been sitting on designs for two months because our last dev kept pushing timelines. Rashedul had a staging link in 4 days and we were live in 11. The site loads in under a second and our bounce rate dropped 35% the first week. Wish we'd found him sooner.",
  },
  {
    id: 2,
    name: "Lauren K.",
    role: "Founder, DTC skincare brand",
    avatar: "https://i.pravatar.cc/150?img=9",
    title: "Finally a developer who actually listens",
    message:
      "I'm not technical at all, and past devs made me feel stupid for asking questions. Rashedul sent Loom walkthroughs after every milestone so I always knew exactly where things stood. When I changed my mind about the checkout flow halfway through, he didn't push back — just adjusted and shipped it better than what I originally asked for.",
  },
  {
    id: 3,
    name: "Daniel R.",
    role: "CTO, fintech startup",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Our Core Web Vitals went from red to green overnight",
    message:
      "We hired Rashedul to rebuild our marketing site on Next.js. The old WordPress site was scoring 38 on PageSpeed. His build scores 97. He set up the CMS integration so our content team can publish without touching code. Solid architecture, clean codebase — the kind of work I'd expect from a senior engineer.",
  },
  {
    id: 4,
    name: "James L.",
    role: "Co-founder, e-commerce brand",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "He caught problems we didn't even know we had",
    message:
      "We hired him to redesign our product pages. During the build he noticed our image pipeline was serving uncompressed files and our mobile nav was broken on Safari. Fixed both without being asked. That's the kind of developer you want — someone who cares about the whole product, not just their ticket.",
  },
  {
    id: 5,
    name: "Sofia M.",
    role: "Creative Director, branding agency",
    avatar: "https://i.pravatar.cc/150?img=20",
    title: "He turned our messy brief into something beautiful",
    message:
      "We gave Rashedul a mood board and some rough wireframes — honestly, they were half-baked. He came back with a prototype that was cleaner and more thoughtful than what we'd imagined. The animations feel intentional, the typography is perfect, and three clients have asked us who built it.",
  },
  {
    id: 6,
    name: "Ryan H.",
    role: "Founder, B2B agency",
    avatar: "https://i.pravatar.cc/150?img=33",
    title: "We've shipped 4 projects together now",
    message:
      "First project was a simple landing page. Then he rebuilt our client portal, added a blog with headless CMS, and just finished an analytics dashboard. Every project is ahead of schedule. He's basically our dev team at this point. If you're a small agency that needs a reliable build partner, stop looking.",
  },
];

import { getTestimonials } from "@/services/apiService";

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(testimonialsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await getTestimonials();
        if (
          res.data.success &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const timer = setInterval(() => {
      const cardWidth = slider.scrollWidth / items.length;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      // Loop back to start if reached the end
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  // Update current index on manual scroll/swipe
  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider || items.length === 0) return;
    const cardWidth = slider.scrollWidth / items.length;
    const newIndex = Math.round(slider.scrollLeft / cardWidth);
    setCurrentIndex((prev) => (prev !== newIndex ? newIndex : prev));
  }, [items.length]);

  // Scroll to specific slide on dot click
  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.scrollWidth / testimonialsData.length;
    slider.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      className="py-16 lg:py-20  relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">
            What founders & teams{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              say about my work.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Real feedback from clients, founders, and engineering teams.
          </p>
        </div>

        {/* Slider Layout */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-4 -mx-4 px-4 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((testimonial) => {
            return (
              <article
                key={testimonial.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8 snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-all duration-300 hover:-translate-y-1 card-premium"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-foreground"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49 2.752-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49 2.752-1.179z" />
                  </svg>
                </div>

                <blockquote className="relative z-10 flex flex-col grow">
                  <h3 className="mb-3 font-semibold text-base sm:text-lg text-foreground tracking-wide leading-snug transition-colors duration-300 group-hover:text-primary line-clamp-2">
                    &quot;{testimonial.title}&quot;
                  </h3>
                  <p className="mb-6 font-light text-muted-foreground leading-relaxed text-xs sm:text-sm flex-grow line-clamp-4">
                    {testimonial.message}
                  </p>
                </blockquote>

                <footer className="mt-auto flex items-center gap-4 relative z-10 pt-6 border-t border-foreground/12">
                  <div className="relative">
                    <Image
                      alt={testimonial.name}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover ring-2 ring-border"
                      src={testimonial.avatar}
                    />
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 size-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <cite className="font-medium text-foreground not-italic tracking-wide text-sm">
                      {testimonial.name}
                    </cite>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-4 mt-10 px-4">
          {/* Pagination Pill */}
          <div className="flex items-center gap-2 rounded-full bg-muted border border-border p-2 px-4 glass">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
              />
            ))}
          </div>

          {/* Pause/Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Play Carousel" : "Pause Carousel"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted border border-border text-foreground transition-all hover:bg-accent hover:scale-105 active:scale-95 glass"
          >
            {isPaused ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90 ml-0.5"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Hide scrollbar for Chrome, Safari and Opera */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
