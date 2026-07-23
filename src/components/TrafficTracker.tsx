"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/services/apiService";

export default function TrafficTracker() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;

    recordVisit(pathname).catch((err) => {
      console.warn("Failed to record visit:", err.message);
    });
  }, [pathname]);

  return null;
}
