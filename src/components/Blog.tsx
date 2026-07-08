/* eslint-disable react-hooks/purity */
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { blogPosts } from "@/lib/blog-data";

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
          <p className="mb-4 font-semibold text-primary text-xs uppercase tracking-widest">
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
              className="group flex h-full flex-col rounded-3xl p-2.5 border border-white/12 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {/* Image */}
              <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-white/5">
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
                <h3 className="font-semibold text-lg text-foreground leading-snug transition-all duration-300 ease-out group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-white/12">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-white/20">
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
                    className="flex shrink-0 items-center gap-2 text-muted-foreground text-xs tracking-wide transition-colors duration-300 group-hover:text-primary">
                    <span className="hidden sm:inline">Read article</span>
                    <div className="size-7 overflow-hidden rounded-lg border border-white/12 border-dashed bg-white/5 transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/10">
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
          className="group flex w-fit items-center justify-center gap-2 text-muted-foreground text-xs uppercase transition-colors hover:text-primary mx-auto mt-pagebuilder my-5"
          href="/blog">
          Read more posts
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="relative size-7 overflow-hidden rounded-lg border border-white/12 border-dashed bg-white/5 transition-colors duration-500 group-hover:border-primary/50 group-hover:bg-primary/10">
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
