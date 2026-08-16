// Server half of /asfaleies: reads the full catalogue from the CMS and hands
// it to the client component that renders it. Uses indexProducts rather than
// navProducts because this page is the complete listing — it shows products
// hidden from the navbar too, which is how the astiki-efthyni hub pages have
// always appeared here but not in the menu.
import type { Metadata } from "next";

import AsfaleiesContent from "./AsfaleiesContent";
import { indexProducts } from "../components/cmsProducts";
import { OG_IMAGE, SITE_URL } from "../siteMeta";

const TITLE = "Όλες οι ασφάλειες";
const DESCRIPTION =
  "Ο πλήρης κατάλογος ασφαλιστικών προγραμμάτων για ιδιώτες και επιχειρήσεις: υγεία, ζωή, κατοικία, όχημα, αστική ευθύνη, cyber, επαγγελματικός χώρος και άλλα.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/asfaleies" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/asfaleies`,
    images: [OG_IMAGE],
  },
};

export default async function AsfaleiesPage() {
  const [idiotes, epixeirisi] = await Promise.all([
    indexProducts("idiotes"),
    indexProducts("epixeirisi"),
  ]);

  return <AsfaleiesContent idiotes={idiotes} epixeirisi={epixeirisi} />;
}
