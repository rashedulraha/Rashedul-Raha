import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

interface NavbarSearchProps {
  showTooltip: boolean;
  openModal: (view: "contact" | "search" | "login") => void;
}

export default function NavbarSearch({ showTooltip, openModal }: NavbarSearchProps) {
  return (
    <div className="relative">
      <motion.button
        onClick={() => openModal("search")}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.3 },
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        aria-label="Search"
        className="relative flex items-center justify-center rounded-full p-2.5 overflow-hidden glass"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
          }}
        />
        <Search className="relative h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-500" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.9,
            }}
            transition={{
              duration: 0.7,
              ease: [0.32, 0.72, 0, 1],
              type: "spring",
              stiffness: 180,
              damping: 20,
            }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap flex items-center gap-1.5 text-xs font-medium overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: `
                0 8px 32px rgba(var(--foreground), 0.3),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
            }}
          >
            {/* Specular highlight - now at top */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)",
              }}
            />

            <kbd
              className="relative px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-primary text-sm">⌘</span>
            </kbd>
            <span className="text-[10px] text-muted-foreground/60">+</span>
            <kbd
              className="relative px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              K
            </kbd>
            <span className="text-[10px] text-muted-foreground/60 ml-1">
              to search
            </span>

            {/* Arrow - now pointing UP (towards the button) */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderLeft: "1px solid rgba(255,255,255,0.15)",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
