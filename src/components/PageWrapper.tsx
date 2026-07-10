import React from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
}

export default function PageWrapper({
  children,
  className,
  mainClassName,
}: PageWrapperProps) {
  return (
    <>
      {/* Background gradient (glow) for navbar blur effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 z-40 h-22.5 w-full select-none lg:h-25 top-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent)",
          WebkitBackdropFilter: "blur(2px)",
          backdropFilter: "blur(2px)",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      />
      <main
        className={cn(
          "min-h-screen bg-background selection:bg-primary/30",
          mainClassName
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-40 pb-20",
            className
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
}
