import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import RealTimeChatWidget from "@/components/RealTimeChatWidget/RealTimeChatWidget";

// ── 1. MAXIMUM SEO & SOCIAL ENGAGEMENT METADATA ──
export const metadata: Metadata = {
  metadataBase: new URL("https://rashedul-raha.vercel.app"),

  title: {
    default: "Rashedul Islam | Full-Stack Architect",
    template: "%s | Rashedul Islam",
  },
  description:
    "Personal Portfolio of Rashedul Islam - Full-Stack Web Developer, Software Engineer, and System Architect. Specializing in MERN Stack, Next.js, TypeScript, Docker, and scalable system design.",
  keywords: [
    "Rashedul Islam",
    "Rashed Dev",
    "Rashedul Raha",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "React Developer",
    "System Architect",
    "Bangladesh Developer",
    "MERN Stack Developer Bangladesh",
    "DevOps Engineer Naogaon",
  ],
  authors: [{ name: "Rashedul Islam", url: "https://github.com/rashedulraha" }],
  creator: "Rashedul Islam",
  publisher: "Rashedul Islam",
  icons: {
    icon: "/Rashed_Hossen.svg",
    shortcut: "/Rashed_Hossen.svg",
    apple: "/Rashed_Hossen.svg",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Rashedul Islam | Full-Stack Architect",
    description:
      "Explore the personal portfolio of Rashedul Islam, a full-stack web developer and system architect specializing in Next.js and Cloud Solutions.",
    url: "https://rashedul-raha.vercel.app",
    siteName: "Rashedul Islam Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rashedul Islam Portfolio Preview",
      },
    ],
  },

  // Twitter/X Card Preview
  twitter: {
    card: "summary_large_image",
    title: "Rashedul Islam | Full-Stack Architect",
    description: "Full-Stack Web Developer and System Architect Portfolio.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rashedul Islam",
    alternateName: "Rashedul Raha",
    url: "https://rashedul-raha.vercel.app",
    image: "https://rashedul-raha.vercel.app/og-image.png",
    jobTitle: "Full-Stack Web Developer & System Architect",
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "Nginx",
      "Tailwind CSS",
    ],
    sameAs: [
      "https://github.com/rashedulraha",
      "https://linkedin.com/in/rashedulraha",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* JSON-LD Script Insertion */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground"
        suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only fixed top-4 left-4 z-100 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg">
            Skip to content
          </a>

          <div className="relative min-h-screen">
            <main id="main-content" className="outline-none">
              {children}
            </main>
            <RealTimeChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
