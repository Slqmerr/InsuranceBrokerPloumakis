// Server half of /emeis: the page itself is a client component (GSAP timelines
// and scroll-triggered counters), and a client component cannot export
// `metadata` — so the route splits the same way /asfaleies does, with the
// server file owning the <head> and the content file owning the rendering.
import type { Metadata } from "next";

import EmeisContent from "./EmeisContent";
import { OG_IMAGE, SITE_URL } from "../siteMeta";

const TITLE = "Ποιοι είμαστε";
const DESCRIPTION =
  "Ο Δημήτριος Πλουμάκης και το ασφαλιστικό του γραφείο στο Ηράκλειο Κρήτης: πάνω από 20 χρόνια εμπειρίας, διακρίσεις και συνεργασίες με τις μεγαλύτερες ασφαλιστικές εταιρείες.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/emeis" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/emeis`,
    images: [OG_IMAGE],
  },
};

export default function EmeisPage() {
  return <EmeisContent />;
}
