"use client";

import React, { useState } from "react";
import { Search, Rss, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";

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
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Posts" ||
      post.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Category Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/10 py-3 mb-16 gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="hidden md:block w-px h-6 bg-white/10 mx-2" />
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts"
              className="block w-full md:w-64 pl-10 pr-12 py-2 bg-transparent border border-white/10 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <div className="flex items-center gap-1">
                <span className="flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-400 font-sans">
                  ⌘
                </span>
                <span className="flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-400 font-sans">
                  K
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Rss className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center text-neutral-400 py-20">
          <p>No posts found matching your criteria.</p>
        </div>
      ) : (
        <>
          {/* Featured Article Section */}
          {featuredPost && (
            <div className="mb-20">
              <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8">
                FEATURED ARTICLES
              </p>
              
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left: Image (takes up approx 55-60%) */}
                  <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Image Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight drop-shadow-lg text-center text-balance transition-transform duration-500 group-hover:scale-105">
                        {featuredPost.title.replace("How to Optimise a", "Optimise Your")}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Right: Content (takes up approx 40-45%) */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                          FEATURED
                        </span>
                      </div>
                      
                      <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
                        {featuredPost.readTime.toUpperCase()} &middot; {featuredPost.date.toUpperCase()}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                        {featuredPost.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        {["nextjs", "performance", "react", "web-vitals"].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-neutral-300 text-[10px] font-mono tracking-wider uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-auto">
                      <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors">
                        Read article
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
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
              <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8">
                LATEST ARTICLES
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group relative block aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:shadow-xl hover:shadow-white/5"
                  >
                    <Image
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <span className="text-balance text-center font-medium text-white text-xl md:text-2xl leading-snug tracking-tight drop-shadow-md">
                        {post.title}
                      </span>
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
