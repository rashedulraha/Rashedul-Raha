"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Main Navbar Pill */}
          <nav
            className="relative flex items-center gap-2 sm:gap-4 rounded-full bg-background/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-border backdrop-blur-md"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* Top Glow on Home */}
            <div className="absolute top-0 left-6 h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] md:block hidden" />

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center pl-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex items-center justify-center rounded-full p-2 transition-colors ${
                  isMobileMenuOpen
                    ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                }`}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Links Group (Desktop) */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="relative rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/work"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                Work
              </Link>
              <Link
                href="/blog"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                Blog
              </Link>

              {/* More trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <button
                  className={`flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    isDropdownOpen
                      ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      : "text-muted-foreground hover:bg-accent hover:text-primary"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Clean Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 origin-top rounded-2xl bg-card p-2 shadow-2xl border border-border backdrop-blur-md"
                    >
                      <div className="flex flex-col gap-1">
                        <Link
                          href="/guestbook"
                          className="rounded-xl px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                        >
                          Guestbook
                        </Link>
                        <Link
                          href="/bucket-list"
                          className="rounded-xl px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                        >
                          Bucket List
                        </Link>
                        <Link
                          href="/uses"
                          className="rounded-xl px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                        >
                          Uses
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Book a Call */}
            <div>
              <Link
                href="/book"
                className="inline-block rounded-full bg-secondary px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-secondary-foreground ring-1 ring-border transition-colors hover:bg-secondary/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] whitespace-nowrap"
              >
                Book a Call
              </Link>
            </div>
          </nav>

          {/* Search Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { view: 'search' } }))}
            aria-label="Search"
            className="flex h-[42px] w-[42px] sm:h-[46px] sm:w-[46px] shrink-0 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-border backdrop-blur-md transition-colors hover:text-primary hover:bg-accent"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Mobile Menu Dropdown Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] origin-top rounded-2xl bg-card/95 p-4 shadow-2xl border border-border backdrop-blur-xl md:hidden flex flex-col gap-2"
              >
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-primary bg-accent/50 hover:bg-accent transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/work"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Blog
                </Link>

                <div className="my-2 h-px w-full bg-border" />
                <div className="px-4 text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                  More
                </div>

                <Link
                  href="/guestbook"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Guestbook
                </Link>
                <Link
                  href="/bucket-list"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Bucket List
                </Link>
                <Link
                  href="/uses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  Uses
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Search Modal overlay */}
      <SearchModal />
    </>
  );
}
