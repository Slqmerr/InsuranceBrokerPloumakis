// The facts every page's <head> repeats, in one place.
//
// This lives outside layout.tsx because sitemap.ts and robots.ts need the same
// origin, and three files inventing their own copy of the domain is how a site
// ends up advertising canonicals that disagree with its own sitemap.
import type { Metadata } from "next";

import type { Product } from "./components/products";

/** Canonical origin. Deliberately constant rather than read from Vercel's
 *  deploy URL: a preview build must still emit production canonicals, or every
 *  preview competes with the real site for the same keywords. robots.ts keeps
 *  previews out of the index instead. */
export const SITE_URL = "https://dploumakis.gr";

export const SITE_NAME = "Δημήτριος Πλουμάκης — Ασφαλιστικό Γραφείο";

/** Shown when a page has nothing more specific to say. Written to work as a
 *  search result snippet: what the business is, where it is, who it serves. */
export const SITE_DESCRIPTION =
  "Ασφαλιστικό γραφείο στο Ηράκλειο Κρήτης, με εμπειρία άνω των 20 ετών. Συγκρίνουμε προγράμματα από 15+ ασφαλιστικές εταιρείες και βρίσκουμε την κάλυψη που ταιριάζει σε εσάς, την οικογένεια και την επιχείρησή σας.";

/** Default social card. The hero portrait rather than a purpose-built asset —
 *  it is already in the repo, already optimised, and at 2048x1365 it crops
 *  cleanly to the 1.91:1 that Facebook and LinkedIn ask for. */
export const OG_IMAGE = {
  url: "/dimitrios.jpg",
  width: 2048,
  height: 1365,
  alt: SITE_NAME,
};

/** <head> for one product, shared by the three routes that render products:
 *  /idiotes/[slug], /epixeirisi/[slug] and the quote form at /prosfora/[slug].
 *
 *  `intro` is the hero one-liner, which is already written as a standalone
 *  summary of the cover and lands inside the ~155 characters Google will show.
 *  `description` is body copy and reads badly when cut off mid-clause, so it is
 *  only a fallback for a product whose intro an editor left empty. */
export function productMetadata(product: Product, path: string): Metadata {
  const description = product.intro || product.description;
  const image = { url: product.image, alt: product.title };

  return {
    title: product.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: product.title,
      description,
      url: `${SITE_URL}${path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: [product.image],
    },
  };
}
