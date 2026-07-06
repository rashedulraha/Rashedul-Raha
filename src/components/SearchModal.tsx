"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Folder,
  FileText,
  BookOpen,
  List,
  Phone,
  Laptop,
  Award,
  Link as LinkIcon,
  ArrowUpRight,
  Moon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  if (!open) return null;

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl px-4 z-50"
          >
            <Command
              className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] h-[500px]"
              label="Global Command Menu"
              shouldFilter={true}
            >
              {/* Top Row: Search Input and Buttons */}
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  className="flex h-14 w-full bg-transparent text-[15px] text-primary placeholder:text-muted-foreground focus:outline-none"
                  placeholder="Search pages, posts, projects..."
                />
                
                {/* Action Buttons within the top bar */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => runCommand(() => router.push("/book"))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Dropdown Results container */}
              <Command.List className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading={
                    <div className="flex items-center justify-between px-2 py-3 text-xs text-muted-foreground">
                      <span>Recent</span>
                      <button className="text-muted-foreground hover:text-primary">
                        Clear
                      </button>
                    </div>
                  }
                >
                  <div className="flex flex-wrap gap-2 px-2 pb-4">
                    <span className="cursor-pointer rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      GitHub
                    </span>
                    <span className="cursor-pointer rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      Projects
                    </span>
                  </div>
                </Command.Group>

                <Command.Group
                  heading={
                    <div className="px-2 pb-2 pt-4 text-xs text-muted-foreground border-t border-border">
                      Pages
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <Home className="h-4 w-4" />
                      </div>
                      Home
                    </Command.Item>

                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/about"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <User className="h-4 w-4" />
                      </div>
                      About
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() => router.push("/projects"))
                      }
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <Folder className="h-4 w-4" />
                      </div>
                      Projects
                    </Command.Item>

                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/blog"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <FileText className="h-4 w-4" />
                      </div>
                      Blog
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() => router.push("/guestbook"))
                      }
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      Guestbook
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() => router.push("/bucket-list"))
                      }
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <List className="h-4 w-4" />
                      </div>
                      Bucket List
                    </Command.Item>

                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/book"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <Phone className="h-4 w-4" />
                      </div>
                      Book a call
                    </Command.Item>

                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/uses"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <Laptop className="h-4 w-4" />
                      </div>
                      Uses
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() => router.push("/attribution"))
                      }
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <Award className="h-4 w-4" />
                      </div>
                      Attribution
                    </Command.Item>

                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/links"))}
                      className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                        <LinkIcon className="h-4 w-4" />
                      </div>
                      Links
                    </Command.Item>
                  </div>
                </Command.Group>

                <Command.Group
                  heading={
                    <div className="px-2 pb-2 pt-4 text-xs text-muted-foreground border-t border-border">
                      Connect
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                    <Command.Item
                      onSelect={() =>
                        runCommand(() =>
                          window.open("https://github.com", "_blank"),
                        )
                      }
                      className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                          <GithubIcon className="h-4 w-4" />
                        </div>
                        GitHub
                      </div>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() =>
                          window.open("https://linkedin.com", "_blank"),
                        )
                      }
                      className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                          <LinkedinIcon className="h-4 w-4" />
                        </div>
                        LinkedIn
                      </div>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                    </Command.Item>

                    <Command.Item
                      onSelect={() =>
                        runCommand(() =>
                          window.open("https://twitter.com", "_blank"),
                        )
                      }
                      className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                          <XIcon className="h-4 w-4" />
                        </div>
                        X (Twitter)
                      </div>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                    </Command.Item>
                  </div>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}
