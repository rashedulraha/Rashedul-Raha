"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body style={{ backgroundColor: "#0A0A0B", color: "#F8FAFC", margin: 0, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "0 20px" }}>
          
          <h1 style={{ fontSize: "6rem", fontWeight: "bold", marginBottom: "1rem", color: "#38BDF8" }}>
            404
          </h1>
          <h2 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1.5rem" }}>
            Page Not Found
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: "500px", marginBottom: "2.5rem" }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link 
            href="/en"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#38BDF8",
              color: "#0F172A",
              padding: "16px 32px",
              borderRadius: "9999px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "transform 0.2s"
            }}
          >
            <ArrowLeft size={20} />
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
