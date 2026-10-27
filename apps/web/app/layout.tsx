import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "@tactile/objects/styles.css";

export const metadata: Metadata = {
  title: "Tactile Objects — Interfaces you can feel",
  description: "An open-source collection of carefully crafted interactive digital objects for React.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
