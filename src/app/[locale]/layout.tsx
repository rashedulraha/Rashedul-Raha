import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rashedul Raha - Developer, Freelancer & Problem Solver",
  description:
    "Full-Stack Developer specializing in Next.js, React, TypeScript, and Sanity CMS. I build fast, accessible web apps and help founders ship products that users love.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import AntiInspect from "@/components/AntiInspect";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/routing';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}>
            {children}
            <Toaster />
          </ThemeProvider>
          <AntiInspect />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
