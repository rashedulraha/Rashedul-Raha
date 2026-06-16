"use client";

import QuickView from "@/views/Quick-View/QuickView";
import { useState, useEffect } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <div className="min-h-screen bg-background" />
        <div />
      </>
    );
  }

  return <QuickView />;
}
