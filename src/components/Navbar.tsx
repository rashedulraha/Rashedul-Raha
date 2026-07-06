"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ChevronDown, Search, Menu, X, Link as LinkIcon, Book, CreditCard, 
  Home, User, Briefcase, PenLine, MessageSquare, ListTodo, Laptop,
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
    desc: "Let me know you were here",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    icon: MessageSquare,
  },
  {
    href: "/bucket-list",
    title: "Bucket List",
    desc: "Dreams with a deadline",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    icon: ListTodo,
  },
];

const moreLinks = [
  { href: "/links", label: "Links", desc: "All my links are here", icon: LinkIcon },
  { href: "/uses", label: "Uses", desc: "A peek into my digital...", icon: Laptop },
  { href: "/attribution", label: "Attribution", desc: "Journey to create this site", icon: CreditCard },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on Escape key press
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Prevent body scroll when mobile menu is open
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
  const isMoreActive = [...moreCards, ...moreLinks].some(item => pathname.startsWith(item.href));

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 relative">
          
          {/* Main Navbar Pill */}
          <motion.nav
            ref={navRef}
            layout
            initial={false}
            animate={{ 
              borderRadius: isDropdownOpen ? 24 : 9999,
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1],
            }}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className="relative flex flex-col bg-background/80 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            {/* Top Row - Always Visible */}
            <div className="flex items-center gap-1 sm:gap-2 p-1.5">
              {/* Mobile Menu Trigger */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`md:hidden flex items-center justify-center rounded-full p-2.5 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div 
                      key="close" 
                      initial={{ rotate: -90, opacity: 0 }} 
                      animate={{ rotate: 0, opacity: 1 }} 
                      exit={{ rotate: 90, opacity: 0 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="menu" 
                      initial={{ rotate: 90, opacity: 0 }} 
                      animate={{ rotate: 0, opacity: 1 }} 
                      exit={{ rotate: -90, opacity: 0 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

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

                {/* More Button */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isDropdownOpen || isMoreActive
                        ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                    aria-expanded={isDropdownOpen}
                  >
                    More
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => openModal("contact")}
                className="rounded-full px-4 sm:px-5 h-9 text-xs sm:text-sm font-medium shadow-lg ml-auto"
              >
                <span className="hidden sm:inline">Book a Call</span>
                <span className="sm:hidden">Hire</span>
              </Button>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-6 border-t border-white/10 p-6 w-[750px] max-w-full">
                    {/* Left Section - Cards */}
                    <div className="flex gap-4 flex-1">
                      {moreCards.map((card, index) => (
                        <motion.div
                          key={card.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex-1"
                        >
                          <Link
                            href={card.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="relative h-40 rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 block"
                          >
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-semibold text-white text-base mb-1">{card.title}</h3>
                              <p className="text-sm text-gray-300">{card.desc}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-white/10" />

                    {/* Right Section - Links */}
                    <div className="flex flex-col gap-2 w-[280px]">
                      {moreLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-300 group"
                          >
                            <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-background/50 group-hover:bg-background transition-colors text-muted-foreground group-hover:text-primary">
                              <link.icon className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-foreground">{link.label}</span>
                              <span className="text-xs text-muted-foreground">{link.desc}</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Search Button */}
          <motion.button
            onClick={() => openModal("search")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:text-foreground hover:bg-accent"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-md origin-top rounded-2xl bg-card/95 p-4 shadow-2xl border border-white/10 backdrop-blur-xl md:hidden"
              >
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                
                <div className="my-3 h-px bg-white/10" />
                
                {[...moreCards, ...moreLinks].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                  >
                    {"icon" in item && <item.icon className="h-5 w-5" />}
                    {"title" in item ? item.title : item.label}
                  </Link>
                ))}
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal("contact");
                    }}
                    className="w-full rounded-xl h-11"
                  >
                    Book a Call
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <SearchModal />
    </>
  );
}