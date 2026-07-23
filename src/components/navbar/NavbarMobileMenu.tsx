import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "../../routing";
import { Button } from "@base-ui/react";
import { mainLinks, moreCards, moreLinks, mobileMenuVariants } from "./NavbarConfig";

interface NavbarMobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: (href: string) => boolean;
  openModal: (view: "contact" | "search" | "login") => void;
}

const itemLabels: Record<string, string> = {
  guestbook: "Guestbook",
  bucketList: "Bucket List",
  certificates: "Certificates",
  links: "Links",
  uses: "Uses",
  attribution: "Attribution",
};

export default function NavbarMobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isActive,
  openModal,
}: NavbarMobileMenuProps) {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-md origin-top rounded-3xl p-4 md:hidden overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(30px) saturate(180%)",
              WebkitBackdropFilter: "blur(30px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="relative z-10">
              {mainLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.07,
                      ease: [0.32, 0.72, 0, 1],
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="my-3 h-px bg-foreground/10" />

              {[...moreCards, ...moreLinks].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: (index + mainLinks.length) * 0.07,
                      ease: [0.32, 0.72, 0, 1],
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-500"
                  >
                    {"icon" in item && <item.icon className="h-5 w-5" />}
                    {itemLabels[item.id] || item.id}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-3 pt-3 border-t border-foreground/10"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.32, 0.72, 0, 1],
                  },
                }}
              >
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openModal("contact");
                  }}
                  className="w-full rounded-xl h-11 transition-all duration-500 font-semibold bg-primary text-primary-foreground"
                >
                  Book a Call
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
