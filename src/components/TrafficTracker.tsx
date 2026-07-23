"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/services/apiService";

export default function TrafficTracker() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Do NOT track visits when navigating in dashboard
    if (pathname.startsWith("/dashboard")) return;

    // Do NOT count reloads or duplicate page views in the same browser session
    const sessionKey = `visited_route_${pathname}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey)) {
      return;
    }

    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;

    if (typeof window !== "undefined") {
      sessionStorage.setItem(sessionKey, "1");
    }

    recordVisit(pathname).catch((err) => {
      console.warn("Failed to record visit:", err.message);
    });
  }, [pathname]);

  return null;
}
