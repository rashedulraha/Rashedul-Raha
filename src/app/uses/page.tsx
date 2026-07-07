import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Uses | Rashedul Islam",
  description: "A comprehensive timeline of the hardware and software I use for my development workflow.",
};

export default function UsesPage() {
  const data = [
    {
      title: "Hardware",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            My daily driver setup is focused on maximizing productivity while maintaining a clean, minimal aesthetic. A powerful machine, combined with the right peripherals, makes long coding sessions a breeze.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="MacBook Pro Setup"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">MacBook Pro M2</h4>
                  <p className="text-neutral-300 text-sm">The powerhouse behind every project.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Mechanical Keyboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Keychron Mechanical</h4>
                  <p className="text-neutral-300 text-sm">Tactile switches for the ultimate typing experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dev Tools",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            My terminal is my second home. I heavily rely on a keyboard-centric workflow to navigate codebase, write code, and manage server infrastructure without ever touching the mouse.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Terminal and Code"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Neovim & Tmux</h4>
                  <p className="text-neutral-300 text-sm">Blazing fast, highly customized terminal workflow.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="relative h-48 md:h-64 w-full bg-[#121212] p-8 flex flex-col justify-center border-t border-white/5">
                <h4 className="text-white font-bold text-lg mb-2">WezTerm</h4>
                <p className="text-neutral-400 text-sm mb-4">A GPU-accelerated cross-platform terminal emulator.</p>
                <div className="h-px w-full bg-white/10 mb-4" />
                <h4 className="text-white font-bold text-lg mb-2">Arc Browser</h4>
                <p className="text-neutral-400 text-sm">A fundamentally better way to use the web and manage spaces.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tech Stack",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            I love building with modern tools that provide great developer experience and deliver highly optimized, accessible, and stunning user interfaces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="React and Nextjs"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">Next.js & React</h4>
                  <p className="text-neutral-300 text-sm">The undisputed kings of modern web development.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121212] p-6 flex flex-col justify-center">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">TypeScript</span>
                <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">Tailwind CSS</span>
                <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium border border-purple-500/20">Framer Motion</span>
                <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">Supabase</span>
                <span className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium border border-orange-500/20">Cloudflare</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-[#0b0b0b] min-h-screen text-foreground selection:bg-primary/30 relative">
        <Navbar />

        <main className="w-full relative z-10 pt-20">
          <Timeline data={data} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
