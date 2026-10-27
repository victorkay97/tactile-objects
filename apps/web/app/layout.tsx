import type { Metadata } from "next";
import type { ReactNode } from "react";
import { themeInitScript } from "../lib/theme-script";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { RevealOnScroll } from "../components/reveal-on-scroll";
import "./globals.css";
import "./platform.css";
import "./tactile-refinements.css";
import "./gallery-craft.css";
import "./themes.css";
import "@tactile/objects/styles.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Tactile Objects — The internet, with feeling.",
    template: "%s — Tactile Objects",
  },
  description: "Beautifully crafted interactive digital objects for React. An open-source experiment in making the internet feel a little more human.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body className={archivo.variable + " " + geist.variable + " " + geistMono.variable}>
        <SiteHeader />
        <RevealOnScroll />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
