import React from "react";
import PageWrapper from "@/components/PageWrapper";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import { MapPin, Mail, Globe, ArrowUpRight, BookOpen, Send } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin, FaBluesky } from "react-icons/fa6";
import { Link } from "@/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Links | Rashedul Islam",
  description: "Explore the links of Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

const codeAndCraftLinks = [
  {
    title: "GitHub",
    subtitle: "@rashedulraha",
    href: "https://github.com/rashedulraha",
    icon: FaGithub,
  },
  {
    title: "Guestbook",
    subtitle: "leaveMark",
    href: "/guestbook",
    icon: BookOpen,
  },
];

const connectLinks = [
  {
    title: "LinkedIn",
    subtitle: "in/rashedulraha",
    href: "https://linkedin.com/in/rashedulraha",
    icon: FaLinkedin,
  },
  {
    title: "Twitter / X",
    subtitle: "@rashedulraha",
    href: "https://twitter.com/rashedulraha",
    icon: FaXTwitter,
  },
  {
    title: "Telegram",
    subtitle: "@rashedulraha",
    href: "https://t.me/rashedulraha",
    icon: Send,
  },
  {
    title: "BlueSky",
    subtitle: "@rashedulraha.bsky.social",
    href: "https://bsky.app/profile/rashedulraha.bsky.social",
    icon: FaBluesky,
  },
];

export default function LinksPage() {
  const t = useTranslations("LinksPage");
  
  return (
    <PageWrapper className="max-w-6xl">
      {/* Subtle grid background (like the image) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />

      <div>
            {/* Header */}
            <div className="mb-16 text-center">
              <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
                {t("network")}
              </p>
              <h1 className="font-instrument-serif text-5xl md:text-6xl tracking-tight text-foreground">
                {t("connectWith")}{" "}
                <span
                  className="italic"
                  style={{
                    backgroundImage: "linear-gradient(to right, #c084fc, #e879f9, #f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  {t("me")}
                </span>
              </h1>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
              
              {/* Vertical Dashed Line Divider (desktop only) */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-[30%] w-px border-l border-dashed border-foreground/10" />

              {/* Left Column: Profile Card */}
              <div className="lg:col-span-4">
                <div className="p-8 rounded-[2rem] bg-[hsl(var(--background))] border border-foreground/5 shadow-2xl flex flex-col items-center sticky top-24">
                  
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-foreground/10 bg-muted ">
                      {/* You can replace this placeholder with an actual Image component once you have the photo */}
                      <Image
                        alt="Rashedul Islam — Full Stack Developer"
                        fetchPriority="high"
                        width={2459}
                        height={1262}
                        className="transition-transform duration-300 ease-out hover:scale-110 group-hover:rotate-3 w-full h-full object-cover"
                        sizes="(min-width: 768px) 72px, 56px"
                        src="/personal_img/rashedul-2.jpeg"
                      />
                    </div>
                    {/* Online Dot */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[hsl(var(--background))] flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border border-[hsl(var(--background))]" />
                    </div>
                  </div>

                  {/* Name & Badges */}
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-instrument-serif tracking-wide">
                    Rashedul Islam
                  </h2>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs text-muted-foreground font-medium">
                      {t("developer")}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs text-muted-foreground font-medium">
                      {t("freelancer")}
                    </span>
                  </div>

                  {/* Dashed Separator */}
                  <div className="w-full border-t border-dashed border-foreground/20 mb-8" />

                  {/* Details */}
                  <div className="w-full space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{t("location")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>rashedulraha.bd@gmail.com</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-full space-y-3">
                    <a 
                      href="/contact" 
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white text-foreground hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <BookOpen className="w-4 h-4" />
                        {t("bookCall")}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                    
                    <div className="flex items-center gap-3 w-full">
                      <Link 
                        href="/" 
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 border border-foreground/5 text-foreground hover:bg-foreground/10 transition-colors text-sm font-medium"
                      >
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        {t("website")}
                      </Link>
                      <a 
                        href="mailto:rashedulraha.bd@gmail.com" 
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 border border-foreground/5 text-foreground hover:bg-foreground/10 transition-colors text-sm font-medium"
                      >
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {t("email")}
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Links Grid */}
              <div className="lg:col-span-8 lg:pl-4 space-y-12">
                
                {/* Code & Craft Section */}
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
                      {t("codeCraft")}
                    </h3>
                    <div className="w-full border-t border-dashed border-foreground/10" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {codeAndCraftLinks.map((link, idx) => {
                      const Icon = link.icon;
                      return (
                        <a 
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 group-hover:bg-foreground/10 transition-colors shrink-0">
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                              {link.title}
                            </h4>
                            <p className="text-xs text-muted-foreground font-mono truncate">
                              {link.subtitle === "leaveMark" ? t("leaveMark") : link.subtitle}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </section>

                {/* Connect Section */}
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">
                      {t("connect")}
                    </h3>
                    <div className="w-full border-t border-dashed border-foreground/10" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {connectLinks.map((link, idx) => {
                      const Icon = link.icon;
                      return (
                        <a 
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-foreground/5 hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 group-hover:bg-foreground/10 transition-colors shrink-0">
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                              {link.title}
                            </h4>
                            <p className="text-xs text-muted-foreground font-mono truncate">
                              {link.subtitle}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </section>

              </div>

            </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
