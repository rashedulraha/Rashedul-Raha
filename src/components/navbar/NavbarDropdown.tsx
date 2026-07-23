import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "../../routing";
import Image from "next/image";
import { moreCards, moreLinks, dropdownVariants } from "./NavbarConfig";

interface NavbarDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdown: () => void;
}

const cardDetails: Record<string, { title: string; desc: string }> = {
  guestbook: { title: "Guestbook", desc: "Leave a public message or feedback" },
  bucketList: { title: "Bucket List", desc: "Personal goals & life aspirations" },
  certificates: { title: "Certificates", desc: "Professional credentials & certificates" },
  links: { title: "Links", desc: "My social profiles & web presence" },
  uses: { title: "Uses", desc: "Hardware & software tools I use daily" },
  attribution: { title: "Attribution", desc: "Design credits & asset acknowledgements" },
};

export default function NavbarDropdown({
  isDropdownOpen,
  setIsDropdownOpen,
  openDropdown,
}: NavbarDropdownProps) {
  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          key="more-dropdown"
          onMouseEnter={openDropdown}
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

          <div className="relative flex flex-col lg:flex-row gap-6 p-6 w-[min(90vw,700px)]">
            {/* Left - Cards */}
            <div className="flex flex-col gap-4 flex-1">
              {moreCards.map((card, index) => {
                const info = cardDetails[card.id] || { title: card.id, desc: "" };
                return (
                  <motion.div
                    key={card.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.12 + 0.35,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                    className="flex-1"
                  >
                    <Link
                      href={card.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden group cursor-pointer block border border-white/10 hover:border-white/25 transition-colors"
                    >
                      <Image
                        src={card.img}
                        alt={info.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-foreground text-base mb-1">
                          {info.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {info.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-foreground/10" />
            <div className="block lg:hidden h-px bg-foreground/10" />

            {/* Right - Links */}
            <div className="flex flex-col gap-1 w-full lg:w-[280px]">
              {moreLinks.map((link, index) => {
                const info = cardDetails[link.id] || { title: link.id, desc: "" };
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1 + 0.5,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all duration-500 group"
                    >
                      <motion.div
                        className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg text-muted-foreground group-hover:text-primary transition-all duration-500 border border-white/10 bg-gradient-to-br from-white/5 to-white/2"
                        whileHover={{
                          scale: 1.08,
                          rotate: 4,
                          transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                        }}
                      >
                        <link.icon className="h-5 w-5" />
                      </motion.div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-foreground">
                          {info.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {info.desc}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
