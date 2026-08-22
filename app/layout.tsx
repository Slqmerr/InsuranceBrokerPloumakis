import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { navProducts } from "./components/cmsProducts";
import { BUSINESS_JSONLD, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./siteMeta";

const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin", "greek"], // "greek" subset is required — without it, Greek characters won't load correctly
  weight: ["400", "500", "600", "700"],
  variable: "--font-ubuntu-sans",
});

// Defaults only — every route is expected to override `title` and
// `description` with something of its own. `metadataBase` is what lets the
// relative URLs below (and the per-page `alternates.canonical`) resolve to
// absolute ones, which is a hard requirement for og:image and canonical tags.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Ασφάλειες Ηράκλειο`,
    // Pages set a bare title; the business name is appended here so no page
    // has to remember to carry it.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Δημήτριος Πλουμάκης" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Ασφάλειες Ηράκλειο`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Ασφάλειες Ηράκλειο`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        {/* Who this business is, in the vocabulary search engines read. Here
            rather than on a page because it belongs to every URL equally —
            the footer states the same address, phones and hours throughout.
            JSON.stringify does not escape "<", so a stray "</script>" in the
            data would close this tag early and hand an attacker the page;
            the replace below is what prevents that, per Next's JSON-LD guide. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BUSINESS_JSONLD).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar idiotes={idiotes} epixeirisi={epixeirisi} />
        {children}
      </body>
    </html>
  );
}
