"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ChevronDown, Search, Menu, X, Link as LinkIcon, Book, CreditCard, 
  Home, User, Briefcase, PenLine, MessageSquare, ListTodo, Laptop 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "./SearchModal";
import { Button } from "./ui/button";

// --- Data Configuration ---
const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: PenLine },
];

const moreCards = [
  {
    href: "/guestbook",
    title: "Guestbook",
    desc: "Leave a message",
    img: "https://images.unsplash.com/photo-1516280440502-a274533bc7fb?q=80&w=600&auto=format&fit=crop",
    icon: MessageSquare,
  },
  {
    href: "/bucket-list",
    title: "Bucket List",
    desc: "Dreams with deadlines",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    icon: ListTodo,
  },
];

const moreLinks = [
  { href: "/links", label: "Links", desc: "All my socials", icon: LinkIcon },
  { href: "/uses", label: "Uses", desc: "My tech stack", icon: Laptop },
  { href: "/attribution", label: "Attribution", desc: "Credits & journey", icon: CreditCard },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Close menus on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // 2. Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const openModal = (view: "contact" | "search") => {
    window.dispatchEvent(new CustomEvent("open-modal", { detail: { view } }));
  };

  const isActive = (href: string) => pathname === href;
  const isMoreActive = ["/guestbook", "/bucket-list", "/links", "/uses", "/attribution"].some(path => pathname.startsWith(path));

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
        <div className="flex items-center gap-2 sm:gap-3 relative">
          
          {/* Main Navbar Pill */}
          <nav
            className="relative flex items-center gap-1 sm:gap-2 rounded-full bg-background/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex items-center justify-center rounded-full p-2.5 transition-all ${
                isMobileMenuOpen
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <button
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isDropdownOpen || isMoreActive
                      ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                  aria-expanded={isDropdownOpen}
                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      // Optimized positioning: right-0 prevents overflow on smaller laptops
                      className="absolute right-0 top-full mt-3 w-[600px] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl bg-popover/95 p-4 shadow-2xl border border-white/10 backdrop-blur-xl text-popover-foreground flex gap-4"
                    >
                      {/* Cards Section */}
                      <div className="flex-[1.8] grid grid-cols-2 gap-3">
                        {moreCards.map((card) => (
                          <Link
                            key={card.href}
                            href={card.href}
                            className="relative h-44 rounded-xl overflow-hidden group cursor-pointer block border border-white/5"
                          >
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="flex items-center gap-2 mb-1">
                                <card.icon className="h-4 w-4 text-white/80" />
                                <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                              </div>
                              <p className="text-xs text-gray-300">{card.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* List Links Section */}
                      <div className="flex-1 flex flex-col gap-2">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-card/50 hover:bg-accent transition-all group"
                          >
                            <div className="h-9 w-9 flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-background/50 group-hover:bg-background transition-colors text-muted-foreground group-hover:text-primary">
                              <link.icon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                              <span className="font-medium text-sm truncate">{link.label}</span>
                              <span className="text-xs text-muted-foreground truncate">{link.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Button (Responsive Text) */}
            <Button
              onClick={() => openModal("contact")}
              className="rounded-full px-4 sm:px-5 h-9 text-xs sm:text-sm font-medium shadow-lg"
            >
              <span className="hidden sm:inline">Book a Call</span>
              <span className="sm:hidden">Hire</span>
            </Button>
          </nav>

          {/* Search Button */}
          <button
            onClick={() => openModal("search")}
            aria-label="Search"
            className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl transition-all hover:text-foreground hover:bg-accent hover:scale-105 active:scale-95"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[calc(100vw-1rem)] max-w-md origin-top rounded-2xl bg-card/95 p-3 shadow-2xl border border-white/10 backdrop-blur-xl md:hidden flex flex-col gap-1"
              >
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Menu
                </div>
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}

                <div className="my-2 h-px w-full bg-white/10" />
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Explore
                </div>

                {[...moreCards, ...moreLinks].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    {"title" in link ? link.title : link.label}
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <div className="mt-2 pt-2 border-t border-white/10">
                   <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal("contact");
                    }}
                    className="w-full rounded-xl h-11 font-medium"
                  >
                    Book a Call
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <SearchModal />
    </>
  );
}