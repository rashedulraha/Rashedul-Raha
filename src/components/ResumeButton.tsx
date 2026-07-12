"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

export function ResumeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-primary/20 bg-primary/10 py-1 pr-1 pl-4 font-medium text-base opacity-85 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary/40 hover:bg-primary/20 hover:opacity-100 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
      >
        <span className="z-10 px-3 text-primary transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground">
          Resume
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-y-1 right-1 w-10 rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)]"
        />
        <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-primary p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent">
          <FileText className="size-4.5 text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          <FileText className="absolute size-4.5 -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
        </span>
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Resume & CV</DialogTitle>
            <DialogDescription>
              Select which document you'd like to view or download.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-between rounded-xl border border-border bg-muted/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <FileText className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    View Resume
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Detailed work history and skills
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-background p-2 border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                <Download className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>

            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-between rounded-xl border border-border bg-muted/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <FileText className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    View CV
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Comprehensive academic and professional profile
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-background p-2 border border-border group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                <Download className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
