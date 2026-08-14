import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { navProducts } from "./components/cmsProducts";

const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin", "greek"], // "greek" subset is required — without it, Greek characters won't load correctly
  weight: ["400", "500", "600", "700"],
  variable: "--font-ubuntu-sans",
});

export const metadata: Metadata = {
  title: "PloumakisAgency",
  description: "Insurance Broker",
};

// The navbar lives here rather than in each page so its product list can come
// from the CMS: this layout is a server component and can read content/, while
// Navbar itself is "use client" and cannot. Every page used to render its own
// <Navbar />; they no longer do. Adding a product in Keystatic now puts it in
// the menu site-wide with no code change.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [idiotes, epixeirisi] = await Promise.all([
    navProducts("idiotes"),
    navProducts("epixeirisi"),
  ]);

  return (
    <html lang="el" className={`${ubuntuSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar idiotes={idiotes} epixeirisi={epixeirisi} />
        {children}
      </body>
    </html>
  );
}
