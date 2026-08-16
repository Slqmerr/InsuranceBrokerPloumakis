// Server half of /synergasia — see the note in app/emeis/page.tsx for why the
// route is split in two.
import type { Metadata } from "next";

import SynergasiaContent from "./SynergasiaContent";
import { OG_IMAGE, SITE_URL } from "../siteMeta";

const TITLE = "Συνεργασία — Καριέρα στην ασφάλιση";
const DESCRIPTION =
  "Χτίσε καριέρα στην ασφάλιση δίπλα μας. Εκπαίδευση και προετοιμασία για την πιστοποίηση διαμεσολαβητή, εργαλεία, υποστήριξη στα πρώτα ραντεβού και ξεκάθαρο πλάνο αμοιβών — χωρίς κόστος εισόδου.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/synergasia" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/synergasia`,
    images: [OG_IMAGE],
  },
};

export default function SynergasiaPage() {
  return <SynergasiaContent />;
}
