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

/* ── The business itself ─────────────────────────────────────────────────────
 *
 * Name, address, phone, hours: what search engines call NAP, and what a
 * visitor reads in the footer. They live here rather than in Footer.tsx so the
 * visible copy and the structured data below cannot drift apart — a business
 * whose page says one phone number and whose markup says another gives Google
 * a reason to distrust both.
 */

export const OFFICE_STREET = "Κυδωνίας 8 & Ανδρεαδάκη";
export const OFFICE_POSTAL_CODE = "71202";
export const OFFICE_CITY = "Ηράκλειο";
export const OFFICE_REGION = "Κρήτη";

/** One line, exactly as the footer prints it and as Google Maps is handed it
 *  when a visitor asks for directions. */
export const OFFICE_ADDRESS = `${OFFICE_STREET}, ${OFFICE_POSTAL_CODE} ${OFFICE_CITY}`;

export const OFFICE_EMAIL = "dploumakis@gmail.com";

/** `tel` is E.164 — what a tel: link and schema.org both want. `display` is
 *  what the footer shows. Landline first: it is the number the office answers. */
export const OFFICE_PHONES = [
  { tel: "+302810326400", display: "2810 326 400" },
  { tel: "+306945021091", display: "6945 021 091" },
];

export const OFFICE_HOURS_LABEL = "Δευτέρα – Παρασκευή: 9:00 – 21:00";

/** LocalBusiness structured data, rendered once in the root layout so every
 *  page carries it. Sitewide is only honest because the footer repeats the
 *  same address, phones and hours on every page, and structured data is meant
 *  to describe what the page visibly says.
 *
 *  `@id` is what makes that repetition one business rather than one per URL.
 *  Anything added later — BreadcrumbList on product pages, a Service node per
 *  product — should point at this id instead of describing the agency again.
 *
 *  `InsuranceAgency` rather than the generic `LocalBusiness`: same properties,
 *  but it saves Google inferring the trade. */
export const BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  telephone: OFFICE_PHONES.map((phone) => phone.tel),
  email: OFFICE_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: OFFICE_STREET,
    postalCode: OFFICE_POSTAL_CODE,
    addressLocality: OFFICE_CITY,
    addressRegion: OFFICE_REGION,
    addressCountry: "GR",
  },
  // Street-level, from OpenStreetMap's geometry for Κυδωνίας: the house number
  // does not geocode, so this is the midpoint of a ~115m street and can sit up
  // to ~60m off the door. Good enough to place the office on the right block;
  // replace with the exact pin when someone can read it off Google Maps.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.340555,
    longitude: 25.132414,
  },
  // The machine-readable twin of OFFICE_HOURS_LABEL. Change one, change both.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  areaServed: { "@type": "AdministrativeArea", name: OFFICE_REGION },
  // No `sameAs`: Footer.tsx still marks its Facebook and LinkedIn hrefs as
  // placeholders. Claiming a profile that turns out to be the wrong one is
  // worse than claiming none, so add them here once they are confirmed.
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
