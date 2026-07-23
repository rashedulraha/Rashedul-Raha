/* eslint-disable react-hooks/purity */
"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { getBlogs } from "@/services/apiService";
import Link from "next/link";

export interface IBlog {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date?: string;
  createdAt?: string;
  readTime: string;
  category: string;
}
export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [posts, setPosts] = useState<IBlog[]>(blogPosts as any);

  // Floating particles (client-side only to prevent hydration mismatch)
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await getBlogs();
        if (
          res.data.success &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          setPosts(res.data.data);
        }
      } catch (err) {
        console.error("Error loading blogs:", err);
      }
    }
    loadBlogs();

    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
      })),
    );
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-pagebuilder overflow-hidden"
        id="blog"
      >
        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary/10"
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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-2 mx-auto max-w-xl text-center mb-8 md:mb-12 px-4"
        >
          <p className="mb-2 font-semibold text-primary text-xs uppercase tracking-widest">
            LATEST ARTICLES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight">
            Articles &{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              insights.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Thoughts on web development, system design, and frontend
            architecture.
          </p>
        </motion.div>

        <div aria-hidden="true" className="w-full border-t" />

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
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
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl p-2.5 transition-all duration-300 card-premium"
              >
                {/* Image */}
                <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-muted">
                  <motion.img
                    alt={post.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
                    src={
                      post.image ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                    }
                    style={{
                      transform:
                        hoveredCard === post.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider border border-primary/20 glass">
                      {post.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <span className="text-balance text-center font-normal text-foreground text-xl leading-snug tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
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
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-foreground/12">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wide">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="text-foreground/20">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.date || post.createdAt}>
                          {post.date ||
                            (post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : "2026")}
                        </time>
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex shrink-0 items-center gap-2 text-muted-foreground text-xs tracking-wide transition-colors duration-300 group-hover:text-primary"
                    >
                      <span className="hidden sm:inline">Read Article</span>
                      <div className="size-7 overflow-hidden rounded-lg border border-border border-dashed bg-muted transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/10">
                        <motion.div
                          initial={{ x: -8 }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex w-12 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-0"
                        >
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
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div aria-hidden="true" className="w-full border-t mt-8" />

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-pagebuilder my-5 w-fit"
        >
          <Link
            className="group flex items-center justify-center gap-2 text-muted-foreground text-xs uppercase transition-colors hover:text-primary"
            href="/blog"
          >
            View All Articles
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="relative size-7 overflow-hidden rounded-lg border border-border border-dashed bg-muted transition-colors duration-500 group-hover:border-primary/50 group-hover:bg-primary/10"
            >
              <motion.span
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
              >
                <ArrowRight className="size-3.5" />
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
