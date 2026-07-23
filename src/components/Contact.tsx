"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Floating particles for background (client-side only to prevent hydration mismatch)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  const tags = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative z-0 py-pagebuilder overflow-hidden"
        id="contact"
      >
        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary/10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 15, -15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div aria-hidden="true" className="w-full border-t border-foreground/12" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full overflow-hidden rounded-2xl card-premium"
        >
          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-y-2 py-16 sm:py-20 text-center px-4">
            {/* Rotating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="absolute z-50 cursor-grab overflow-hidden rounded-full top-4 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-1/2 lg:translate-x-[280px] lg:-translate-y-[70px]"
              tabIndex={0}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-full bg-gradient-to-r from-primary to-primary/80 p-1.5 font-medium leading-none shadow-lg shadow-primary/20"
              >
                <div className="relative size-23.75 rounded-full bg-background p-2 text-foreground">
                  <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <svg
                      className="absolute inset-0 size-full"
                      overflow="visible"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                        fill="transparent"
                        id="_R_hil1lb_"
                      />
                      <text>
                        <textPath
                          dominantBaseline="hanging"
                          href="#_R_hil1lb_"
                          startOffset={0}
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            wordSpacing: 5,
                            letterSpacing: "2.1px",
                            fill: "currentColor",
                          }}
                        >
                          LET'S BUILD SOMETHING GREAT •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 fill-white text-foreground opacity-80 hidden lg:block"
                  >
                    <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                  </motion.svg>
                </div>
                <span className="sr-only">LET'S BUILD SOMETHING GREAT •</span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 lg:mt-0"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-light text-foreground tracking-wide">
                Have a project{" "}
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                >
                  in mind?
                </motion.span>
              </h3>
              <h3 className="mt-3 text-2xl sm:text-3xl lg:text-5xl font-light text-foreground tracking-wide">
                Let's make it{" "}
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                >
                  happen.
                </motion.span>
              </h3>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-modal", {
                      detail: { view: "contact" },
                    })
                  )
                }
                className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-border bg-muted/50 py-1 pr-1 pl-4 font-medium text-base backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:bg-accent active:scale-[0.98] my-10"
              >
                <span className="z-10 px-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground">
                  Get In Touch
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 right-1 w-10 rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)]"
                />
                <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-primary p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent">
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[18px] text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute size-[18px] -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Availability Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="font-semibold text-base sm:text-xl lg:text-2xl text-foreground"
            >
              Available for{" "}
              <span className="text-primary font-bold">
                Full-Time Roles
              </span>
              {" "}and{" "}
              <span className="text-primary font-bold">
                Freelance Projects
              </span>
              .
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="my-2 text-balance font-extralight text-sm tracking-wide opacity-75 lg:text-xl text-muted-foreground"
            >
              I'm always open to discussing new web/software engineering projects,
              <br className="hidden sm:block" />
              creative ideas, or opportunities to be part of your vision.
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex gap-2 mt-4"
            >
              {tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-muted border border-border text-foreground text-xs font-medium glass">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <div aria-hidden="true" className="w-full border-t border-foreground/12" />
      </section>
    </>
  );
}