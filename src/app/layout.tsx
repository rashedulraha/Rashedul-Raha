import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import TrafficTracker from "@/components/TrafficTracker";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rashedul Islam - Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in Next.js, React Native, and TypeScript. I build fast, accessible web apps and mobile applications.",
  keywords: [
    "Rashedul Islam",
    "Rashedul Raha",
    "Full-Stack Developer",
    "React Native Developer",
    "Next.js Developer",
    "Software Engineer Bangladesh",
    "Web Developer",
    "Frontend Developer",
  ],
  authors: [{ name: "Rashedul Islam" }],
  creator: "Rashedul Islam",
  metadataBase: new URL("https://rashedulraha.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rashedulraha.com",
    title: "Rashedul Islam - Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React Native, and TypeScript.",
    siteName: "Rashedul Islam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashedul Islam - Full-Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, React Native, and TypeScript.",
    creator: "@rashedulraha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
          <TrafficTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
