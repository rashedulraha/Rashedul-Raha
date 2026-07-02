"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpIcon, HeartIcon } from "@heroicons/react/24/solid";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full mt-20 overflow-hidden">
      {/* ===== Solid Top Border ===== */}
      <div className="w-full h-[1px] bg-white/[0.08]"></div>

      {/* ===== Main Footer Container ===== */}
      <div className="relative bg-[#030014] border-t border-white/[0.05]">
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* ===== Footer Grid ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-12">
            {FOOTER_DATA.map((column, index) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-start"
              >
                {/* Column Title */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {column.title}
                  </h3>
                </div>

                {/* Column Links */}
                <div className="flex flex-col gap-3 w-full">
                  {column.data.map(({ icon: Icon, name, link }) => (
                    <Link
                      key={`${column.title}-${name}`}
                      href={link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 w-fit"
                    >
                      {/* Icon Container */}
                      {Icon && (
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.08] group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300">
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors duration-300" />
                        </div>
                      )}
                      
                      {/* Link Text */}
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        {name}
                      </span>

                      {/* Hover Arrow */}
                      <svg
                        className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* ===== Contact Column ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: FOOTER_DATA.length * 0.1, duration: 0.5 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Stay Connected
                </h3>
              </div>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed font-light">
                Let's build something amazing together. Reach out for collaborations or just a friendly hello.
              </p>
              <Link
                href="mailto:contact@example.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </Link>
            </motion.div>
          </div>

          {/* ===== Solid Divider ===== */}
          <div className="w-full h-[1px] bg-white/[0.05] mb-6"></div>

          {/* ===== Bottom Bar ===== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="text-white font-semibold">Rashedul Islam</span>
              <span>All rights reserved.</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
              <span>using Next.js & Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};