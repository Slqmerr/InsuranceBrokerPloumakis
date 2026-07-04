import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  icon: LucideIcon;
  subtitle: string;
  title: string;
  slug: string;
};

export const IDIWTES_PRODUCTS: Product[] = [
  { icon: Heart, subtitle: "Νοσηλεία, Περίθαλψη", title: "Υγεία", slug: "ygeia" },
  { icon: Leaf, subtitle: "Προστασία, Οικογένεια", title: "Ζωή", slug: "zoi" },
  { icon: Home, subtitle: "Σπίτι, Περιουσία", title: "Κατοικία", slug: "katoikia" },
  { icon: Scale, subtitle: "Ζημιές, Προστασία", title: "Αστική Ευθύνη", slug: "astiki-efthyni" },
  { icon: Car, subtitle: "Αυτοκίνητο, Μηχανή", title: "Όχημα", slug: "oxima" },
  { icon: TrendingUp, subtitle: "Κεφάλαιο, Απόδοση", title: "Επένδυση", slug: "ependysi" },
  { icon: ShieldCheck, subtitle: "Δεδομένα, Ασφάλεια", title: "Cyber", slug: "cyber" },
  { icon: PawPrint, subtitle: "Ζώο, Περίθαλψη", title: "Κατοικίδιο", slug: "katoikidio" },
];

export const EPIXEIRISI_PRODUCTS: Product[] = [
  { icon: Building2, subtitle: "Χώρος, Εξοπλισμός", title: "Επαγγελματικός Χώρος", slug: "epaggelmatikos-xoros" },
  { icon: Scale, subtitle: "Ζημιές Τρίτων", title: "Αστική Ευθύνη", slug: "astiki-efthyni" },
  { icon: Truck, subtitle: "Στόλος, Οχήματα", title: "Εταιρικά Οχήματα", slug: "etairika-oximata" },
  { icon: ShieldAlert, subtitle: "Δεδομένα, Επιθέσεις", title: "Cyber", slug: "cyber" },
  { icon: Users, subtitle: "Προσωπικό, Παροχές", title: "Ομαδική Ασφάλιση", slug: "omadiki-asfalisi" },
  { icon: Package, subtitle: "Εμπορεύματα, Μεταφορά", title: "Μεταφορά Εμπορευμάτων", slug: "metafora-emporeumaton" },
];

// Card-strip categories without a dropdown entry still get their own page
export const EXTRA_IDIWTES_PAGES: Product[] = [
  { icon: Users, subtitle: "Προστασία, Μέλλον", title: "Οικογένεια", slug: "oikogeneia" },
  { icon: PiggyBank, subtitle: "Κεφάλαιο, Μέλλον", title: "Αποταμίευση", slug: "apotamieusi" },
];

export const PRODUCT_CARDS = [
  { icon: Users, title: "Οικογένεια", color: "#e4ebfb" },
  { icon: Home, title: "Κατοικία", color: "#e3f3e8" },
  { icon: Car, title: "Οχήματα", color: "#fdeede" },
  { icon: Heart, title: "Υγεία", color: "#fbe4ec" },
  { icon: Briefcase, title: "Επιχείρηση", color: "#ece4fb" },
  { icon: PiggyBank, title: "Αποταμίευση", color: "#fdf3de" },
];
