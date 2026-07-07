/* eslint-disable react-hooks/purity */
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "How to Optimise a Next.js Web App",
    slug: "how-to-optimise-a-nextjs-web-app",
    description:
      "Practical techniques to fix your Next.js Lighthouse score — bundle analysis, caching strategies, React Compiler, and the next.config flags nobody talks about.",
    image: "/images/image_17.jpg",
    date: "Apr 14, 2026",
    readTime: "15 min read",
    category: "Performance",
  },
  {
    id: 2,
    title: "Every Tool in My Terminal-First Dev Setup",
    slug: "terminal-first-dev-setup",
    description:
      "Neovim, Wezterm, Tmux, and the rest — what survived two years of daily use and why I picked each one over the obvious alternatives.",
    image: "/images/image_18.jpg",
    date: "Oct 19, 2025",
    readTime: "12 min read",
    category: "Tools",
  },
  {
    id: 3,
    title: "Build a Blog with Next.js and MDX from Scratch",
    slug: "build-a-blog-with-nextjs-and-mdx",
    description:
      "File-based content, zero database, full control. A complete walkthrough of building a statically-generated blog with Next.js, MDX, and gray-matter.",
    image: "/images/image_1.webp",
    date: "Mar 12, 2025",
    readTime: "11 min read",
    category: "Tutorial",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
  }));

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-pagebuilder overflow-hidden"
        id="blog">
        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-indigo-500/10 dark:bg-indigo-400/5"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-2 mx-auto mb-pagebuilder max-w-xl text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl text-center mb-5 md:mb-10 lg:mb-16"
          style={{
            textShadow:
              "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
          }}>
          <p className="mb-4 font-normal text-black/80 text-xs uppercase tracking-widest dark:text-white/70">
            FROM THE DESK
          </p>
          <span className="inline-block">
            Thoughts &amp;{" "}
            <motion.span
              initial={{ backgroundPosition: "0% 100%" }}
              animate={isInView ? { backgroundPosition: "100% 100%" } : {}}
              transition={{ duration: 2, delay: 1 }}
              className="px-1 pb-1 text-shadow-none italic"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              writings
            </motion.span>
          </span>
        </motion.div>

        <div aria-hidden="true" className="w-full border-t" />

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group flex h-full flex-col rounded-3xl p-2.5 ring-1 ring-border transition-all duration-300 hover:bg-neutral-50 hover:shadow-xl dark:hover:bg-neutral-900/40">
              {/* Image */}
              <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <motion.img
                  alt={post.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                  src={post.image}
                  style={{
                    transform:
                      hoveredCard === post.id ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider border border-white/10">
                    {post.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <span className="text-balance text-center font-normal text-white text-xl leading-snug tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                    {post.title.split(" ").slice(0, 4).join(" ")}
                    {post.title.split(" ").length > 4 && "..."}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-2 pt-4 pb-3">
                <h3 className="font-semibold text-lg text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-neutral-600 text-sm leading-relaxed dark:text-neutral-400">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 uppercase tracking-wide dark:text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">
                      ·
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <time dateTime={post.date}>{post.date}</time>
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex shrink-0 items-center gap-2 text-neutral-600 text-xs tracking-wide transition-colors duration-300 group-hover:text-indigo-600 dark:text-neutral-400 dark:group-hover:text-indigo-400">
                    <span className="hidden sm:inline">Read article</span>
                    <div className="size-7 overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-all duration-500 group-hover:border-indigo-400 group-hover:bg-indigo-50 dark:border-white/10 dark:group-hover:border-indigo-400/30 dark:group-hover:bg-indigo-500/10">
                      <motion.div
                        initial={{ x: -8 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-7 items-center justify-center">
                          <ArrowRight className="size-3.5" />
                        </span>
                        <span className="flex size-7 items-center justify-center">
                          <ArrowRight className="size-3.5" />
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div aria-hidden="true" className="w-full border-t mt-8" />

        {/* View All Posts Button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex w-fit items-center justify-center gap-2 text-neutral-800 text-xs uppercase transition-colors hover:text-indigo-600 dark:text-white/80 mx-auto mt-pagebuilder my-5"
          href="/blog">
          Read more posts
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="relative size-7 overflow-hidden rounded-lg border border-neutral-300 border-dashed bg-overlay-soft transition-colors duration-500 group-hover:border-indigo-400 group-hover:bg-indigo-50 dark:border-white/10 dark:group-hover:border-indigo-400/30 dark:group-hover:bg-indigo-500/10">
            <motion.span
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0">
              <ArrowRight className="size-3.5" />
            </motion.span>
          </motion.div>
        </motion.a>
      </section>
    </>
  );
}
