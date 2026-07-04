import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  icon: LucideIcon;
  title: string;
  slug: string;
  color: string; // revealed on hover when the grayscale filter lifts
};

export const IDIWTES_PRODUCTS: Product[] = [
  { icon: Heart, title: "Υγεία", slug: "ygeia", color: "#e0245e" },
  { icon: Leaf,  title: "Ζωή", slug: "zoi", color: "#2e9e5b" },
  { icon: Home, title: "Κατοικία", slug: "katoikia", color: "#1E439A" },
  { icon: Scale,  title: "Αστική Ευθύνη", slug: "astiki-efthyni", color: "#7c3aed" },
  { icon: Car,  title: "Όχημα", slug: "oxima", color: "#ea580c" },
  { icon: TrendingUp, title: "Επένδυση", slug: "ependysi", color: "#0d9488" },
  { icon: ShieldCheck,  title: "Cyber", slug: "cyber", color: "#4f46e5" },
  { icon: PawPrint, title: "Κατοικίδιο", slug: "katoikidio", color: "#b45309" },
];

export const EPIXEIRISI_PRODUCTS: Product[] = [
  { icon: Building2, title: "Επαγγελματικός Χώρος", slug: "epaggelmatikos-xoros", color: "#1E439A" },
  { icon: Scale, title: "Αστική Ευθύνη", slug: "astiki-efthyni", color: "#7c3aed" },
  { icon: Truck, title: "Εταιρικά Οχήματα", slug: "etairika-oximata", color: "#ea580c" },
  { icon: ShieldAlert, title: "Cyber", slug: "cyber", color: "#4f46e5" },
  { icon: Users, title: "Ομαδική Ασφάλιση", slug: "omadiki-asfalisi", color: "#0d9488" },
  { icon: Package, title: "Μεταφορά Εμπορευμάτων", slug: "metafora-emporeumaton", color: "#2e9e5b" },
];

// Card-strip categories without a dropdown entry still get their own page
export const EXTRA_IDIWTES_PAGES: Product[] = [
  { icon: Users, title: "Οικογένεια", slug: "oikogeneia", color: "#1E439A" },
  { icon: PiggyBank, title: "Αποταμίευση", slug: "apotamieusi", color: "#0d9488" },
];

export const PRODUCT_CARDS = [
  { icon: Users, title: "Οικογένεια", color: "#e4ebfb" },
  { icon: Home, title: "Κατοικία", color: "#e3f3e8" },
  { icon: Car, title: "Οχήματα", color: "#fdeede" },
  { icon: Heart, title: "Υγεία", color: "#fbe4ec" },
  { icon: Briefcase, title: "Επιχείρηση", color: "#ece4fb" },
  { icon: PiggyBank, title: "Αποταμίευση", color: "#fdf3de" },
];
