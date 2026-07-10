"use client";

import React from "react";
import { Link } from "@/routing";
import { ArrowLeft, Ghost } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  // Using a try-catch or safe fallback in case next-intl context is missing on 404
  let t;
  try {
    t = useTranslations("NotFound");
  } catch (e) {
    t = (key: string) => key;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full w-64 h-64 -z-10" />
        <Ghost className="w-32 h-32 text-primary animate-pulse-glow" />
      </div>
      
      <h1 className="text-7xl md:text-9xl font-bold font-instrument-serif text-foreground mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        {t("title") === "title" ? "Page Not Found" : t("title")}
      </h2>
      <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
        {t("description") === "description" ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." : t("description")}
      </p>
      
      <Link 
        href="/"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-primary-foreground transition-transform hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">{t("backHome") === "backHome" ? "Return Home" : t("backHome")}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </Link>
    </div>
  );
}
