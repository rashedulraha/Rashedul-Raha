"use client";

import React, { useState } from "react";
import { Search, Rss, ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "@/routing";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  "All Posts",
  "Nextjs",
  "React",
  "Performance",
  "Web-Vitals",
  "Developer-Tools",
  "Terminal",
  "Neovim",
  "Workflow",
  "Mdx",
  "Tutorials",
];

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const t = useTranslations("BlogPage");
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const isLoading = !initialPosts || initialPosts.length === 0;

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Filter posts
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Posts" ||
      post.category.toLowerCase() === activeCategory.toLowerCase();
    
    const title = (post.title || "").toLowerCase();
    const desc = (post.description || "").toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = title.includes(searchLower) || 
                          desc.includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Category Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-foreground/10 py-3 mb-16 gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-foreground/10 text-foreground border border-foreground/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {category === "All Posts" ? t("allPosts") : t(`categories.${category}`)}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="hidden md:block w-px h-6 bg-foreground/10 mx-2" />
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPosts")}
              className="block w-full md:w-64 pl-10 pr-12 py-2 bg-transparent border border-foreground/10 rounded-full text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <div className="flex items-center gap-1">
                <span className="flex items-center justify-center w-5 h-5 rounded border border-foreground/10 bg-foreground/5 text-[10px] text-muted-foreground font-sans">
                  ⌘
                </span>
                <span className="flex items-center justify-center w-5 h-5 rounded border border-foreground/10 bg-foreground/5 text-[10px] text-muted-foreground font-sans">
                  K
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full border border-foreground/10 text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
            <Rss className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-20">
          {/* Featured Post Skeleton */}
          <div>
            <div className="flex justify-center mb-8">
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-[hsl(var(--background))] flex flex-col lg:flex-row min-h-[360px]">
              <div className="w-full lg:w-[55%] p-4">
                <Skeleton className="w-full aspect-video lg:h-full rounded-2xl" />
              </div>
              <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 space-y-6">
                <div>
                  <Skeleton className="h-4 w-28 rounded-md mb-4" />
                  <Skeleton className="h-8 w-3/4 rounded-lg mb-4" />
                  <Skeleton className="h-4 w-full rounded-md mb-2" />
                  <Skeleton className="h-4 w-5/6 rounded-md mb-8" />
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((t) => (
                      <Skeleton key={t} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-32 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Latest Posts Grid Skeleton */}
          <div>
            <div className="flex justify-center mb-8">
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col rounded-3xl p-3 card-premium h-full space-y-4">
                  <Skeleton className="aspect-16/11 rounded-2xl w-full" />
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                  <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          <p>{t("noPosts")}</p>
        </div>
      ) : (
        <>
          {/* Featured Article Section */}
          {featuredPost && (
            <div className="mb-20">
              <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
                {t("featuredArticles")}
              </p>
              
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group block overflow-hidden rounded-3xl border border-foreground/10 bg-[hsl(var(--background))] transition-all hover:border-foreground/20 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left: Image (takes up approx 55-60%) */}
                  <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden">
                    {featuredPost.image && (
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <h3 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight drop-shadow-lg text-center text-balance transition-transform duration-500 group-hover:scale-105">
                        {featuredPost.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Right: Content (takes up approx 40-45%) */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          {t("featured")}
                        </span>
                      </div>
                      
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                        {featuredPost.readTime.toUpperCase()} &middot; {formatDate(featuredPost.publishedAt || featuredPost.createdAt).toUpperCase()}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        {featuredPost.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        {["nextjs", "performance", "react", "web-vitals"].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/5 text-muted-foreground text-[10px] font-mono tracking-wider uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {t("readArticle")}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/10 bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Latest Articles Section */}
          {latestPosts.length > 0 && (
            <div>
              <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
                {t("latestArticles")}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-3xl p-3 transition-all duration-300 card-premium"
                  >
                    {/* Image */}
                    <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-muted">
                      {post.image && (
                        <Image
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={post.image}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider border border-primary/20 glass">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-2 pt-5 pb-3">
                      <h3 className="font-semibold text-lg text-foreground leading-snug transition-colors duration-300 group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border">
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                          <span className="text-border">·</span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-primary">
                          <span className="hidden xl:inline">{t("read")}</span>
                          <div className="flex size-7 items-center justify-center rounded-lg border border-border border-dashed bg-muted transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:translate-x-1">
                            <ArrowRight className="size-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
