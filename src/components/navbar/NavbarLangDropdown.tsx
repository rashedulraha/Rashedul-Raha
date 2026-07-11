import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants, languages } from "./NavbarConfig";

interface NavbarLangDropdownProps {
  isLangDropdownOpen: boolean;
  setIsLangDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openLangDropdown: () => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
  router: any;
  pathname: string;
  locale: string;
}

export default function NavbarLangDropdown({
  isLangDropdownOpen,
  setIsLangDropdownOpen,
  openLangDropdown,
  isPending,
  startTransition,
  router,
  pathname,
  locale,
}: NavbarLangDropdownProps) {
  return (
    <AnimatePresence>
      {isLangDropdownOpen && (
        <motion.div
          key="lang-dropdown"
          onMouseEnter={openLangDropdown}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="overflow-hidden relative"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="relative p-6 w-[min(90vw,500px)] grid grid-cols-2 gap-2 mx-auto">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  startTransition(() => {
                    router.replace(pathname, { locale: lang.code });
                  });
                  setIsLangDropdownOpen(false);
                }}
                disabled={isPending}
                initial={{ opacity: 0, x: -12 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.05 + 0.3,
                    ease: [0.32, 0.72, 0, 1],
                  },
                }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all duration-500 group text-left"
              >
                <motion.div
                  className={`h-10 w-10 flex shrink-0 items-center justify-center rounded-lg transition-all duration-500 ${
                    locale === lang.code
                      ? "text-primary bg-primary/10 border border-primary/30"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                  style={
                    locale !== lang.code
                      ? {
                          border: "1px solid rgba(255,255,255,0.1)",
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        }
                      : undefined
                  }
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <span className="text-xl">{lang.flag}</span>
                </motion.div>
                <div className="flex flex-col">
                  <span
                    className={`font-medium text-sm transition-colors duration-500 ${
                      locale === lang.code
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {lang.label}
                  </span>
                  {locale === lang.code && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/70">
                      Active
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
