// Built from the CMS at build time, so a product added in Keystatic appears in
// the sitemap on the next deploy with no code change — the same contract the
// navbar already has via navProducts().
//
// /prosfora/* is deliberately absent: those pages are noindex (see the note in
// app/prosfora/[slug]/page.tsx), and listing a noindex URL in a sitemap is a
// contradiction Search Console reports as an error.
import type { MetadataRoute } from "next";

import { allProducts } from "./components/cmsProducts";
import { SITE_URL } from "./siteMeta";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [idiotes, epixeirisi] = await Promise.all([
    allProducts("idiotes"),
    allProducts("epixeirisi"),
  ]);

  const lastModified = new Date();

  // `hidden` keeps a product out of the navbar, not out of the site — those
  // pages still render and still deserve to be found, so they are listed.
  const products: MetadataRoute.Sitemap = [
    ...idiotes.map((p) => `/idiotes/${p.slug}`),
    ...epixeirisi.map((p) => `/epixeirisi/${p.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/asfaleies`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/emeis`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/synergasia`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/epikoinonia`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    ...products,
    { url: `${SITE_URL}/politiki-aporritou`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/oroi-xrisis`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
