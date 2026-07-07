"use client";

import { useRef } from "react";
import { FaGithub } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const footerLinks = {
    general: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
    ],
    specifics: [
      { name: "Guest Book", href: "/guestbook" },
      { name: "Bucket List", href: "/bucket-list" },
      { name: "Uses", href: "/uses" },
      { name: "Attribution", href: "/attribution" },
    ],
    more: [
      { name: "Book a Call", href: "/contact" },
      { name: "Links", href: "/links" },
      { name: "RSS", href: "/rss" },
      { name: "Privacy", href: "/legal/privacy" },
      { name: "Terms", href: "/legal/terms" },
    ],
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/rashedulraha",
      label: "GitHub",
    },
    {
      icon: FaXTwitter,
      href: "https://twitter.com/rashedulraha",
      label: "Twitter",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/rashedulraha",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:rashedulraha.bd@gmail.com", label: "Email" },
  ];

  return (
    <>
      <footer ref={sectionRef} className="container max-sm:px-1 mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative border rounded-2xl overflow-hidden bg-gradient-to-br from-background via-background/90 to-background/80">
          {/* Decorative gradient blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left Section - Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hidden w-full flex-col justify-between px-6 py-8 text-sm max-lg:border-b lg:flex lg:w-[44%] lg:border-e lg:px-8 lg:pr-6">
              <div className="grow space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-neutral-700 tracking-wide dark:text-neutral-300">
                    Rashedul Islam
                  </h2>
                </div>
                <p className="w-60 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">
                  A full-stack developer, freelancer &amp; problem solver.
                  Thanks for checking out my site!
                </p>
                <div className="flex items-center gap-3 pt-2">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2 rounded-full bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 transition-all duration-300 text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400">
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Section - Links */}
            <div className="flex w-full flex-col items-start px-4 py-6 text-xs lg:w-[56%] lg:px-8">
              <div className="flex w-full flex-wrap justify-between gap-6 md:gap-10">
                {/* General */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col gap-3">
                  <h4 className="px-2 text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-semibold">
                    General
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-y-2 text-sm">
                    {footerLinks.general.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="group relative inline-flex items-center px-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-300">
                          {link.name}
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Specifics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex flex-col gap-3">
                  <h4 className="px-2 text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-semibold">
                    Specifics
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-y-2 text-sm">
                    {footerLinks.specifics.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="group relative inline-flex items-center px-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-300">
                          {link.name}
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* More */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex flex-col gap-3">
                  <h4 className="px-2 text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-semibold">
                    More
                  </h4>
                  <ul className="flex flex-col flex-wrap items-start gap-y-2 text-sm">
                    {footerLinks.more.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="group relative inline-flex items-center px-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-300">
                          {link.name}
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center gap-3 border-t p-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-medium text-neutral-700 transition-colors hover:text-indigo-600 hover:underline hover:underline-offset-4 dark:text-neutral-300 dark:hover:text-indigo-400"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/rashedulraha">
                  Rashedul Islam
                </a>
                . All rights reserved
              </p>
              <div className="flex items-center gap-3 text-xs">
                <a
                  className="text-neutral-500 transition-colors hover:text-indigo-600 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-indigo-400"
                  href="/legal/privacy">
                  Privacy
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">
                  ·
                </span>
                <a
                  className="text-neutral-500 transition-colors hover:text-indigo-600 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-indigo-400"
                  href="/legal/terms">
                  Terms
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">
                  ·
                </span>
                <a
                  className="text-neutral-500 transition-colors hover:text-indigo-600 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-indigo-400"
                  href="/sitemap.xml">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Built with badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50">
              <span className="text-[9px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
                Built with Next.js
              </span>
            </div>
          </motion.div>

          {/* Decorative pattern at bottom */}
          <div
            aria-hidden="true"
            className="relative z-10 h-6 w-full border-t bg-size-[6px_6px] bg-[linear-gradient(-45deg,var(--color-neutral-200)_12.5%,transparent_12.5%,transparent_50%,var(--color-neutral-200)_50%,var(--color-neutral-200)_62.5%,transparent_62.5%,transparent_100%)] dark:bg-[linear-gradient(-45deg,var(--color-neutral-800)_12.5%,transparent_12.5%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.5%,transparent_62.5%,transparent_100%)] opacity-50"
          />
        </motion.div>
      </footer>
    </>
  );
}
