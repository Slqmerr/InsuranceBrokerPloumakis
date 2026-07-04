# Task for Claude Code — Round 3
 
This prompt makes 5 changes to `app/page.tsx` (and `app/layout.tsx` for the font). **Do the sections in order** — later sections depend on things set up in earlier ones.
 
This prompt **replaces** the hero section from the earlier "Hero + Product Card Strip" prompt and the icon-rendering part of the earlier "Mega-dropdown" prompt. Everything else from those two prompts (the product card strip layout, the dropdown's open/close logic and product data) stays as-is except where noted below.
 
---
 
## 0. Setup — do this first IF YOU HAVEN'T ALREADY.
 
```bash
npm install lucide-react
```
 
Confirm `framer-motion` is already installed (it should be — check `package.json`). If not:
 
```bash
npm install framer-motion
```
 
**File check:** Move the photo `FAG_0805.JPG` into the `/public` folder and rename it to `/public/dimitrios.jpg` (lowercase, no spaces — this avoids case-sensitivity bugs when deployed to Vercel, which runs on Linux and is picky about filename casing unlike Windows/Mac). If it currently lives outside `/public` (e.g. in a separate `/assets` folder), it must be moved — a plain `<img src="/dimitrios.jpg">` tag only resolves files sitting inside `/public`.
 
---
 
## 1. Hero Section — Replace with Dimitrios Photo + Gradient Overlay
 
Replace the entire hero `<section>` with this:
 
```tsx
<section style={{
  position: "relative",
  height: "640px",
  overflow: "hidden",
}}>
  {/* Background photo */}
  <img
    src="/dimitrios.jpg"
    alt="Δημήτριος Πλουμάκης"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 20%",
    }}
  />
 
  {/* Blue gradient overlay — solid near the text, fading out toward the photo */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(100deg, rgba(30,67,154,0.93) 0%, rgba(30,67,154,0.75) 35%, rgba(30,67,154,0.35) 70%, rgba(30,67,154,0.15) 100%)",
  }} />
 
  {/* Text content */}
  <div style={{
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 64px",
    maxWidth: "560px",
  }}>
    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "12px" }}>
      Αξία έχει ό,τι είναι σημαντικό για σένα
    </p>
    <h1 style={{
      color: "#fff",
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
      fontSize: "42px",
      fontWeight: 700,
      lineHeight: 1.15,
      margin: "0 0 20px",
    }}>
      Προστατεύουμε ό,τι αγαπάτε περισσότερο
    </h1>
    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
      Εξατομικευμένες ασφαλιστικές λύσεις για εσάς, την οικογένεια και την επιχείρησή σας.
    </p>
    <button style={{
      background: "#fff",
      color: "#1E439A",
      fontWeight: 700,
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
      padding: "14px 32px",
      borderRadius: "999px",
      border: "none",
      cursor: "pointer",
      width: "fit-content",
      fontSize: "14px",
    }}>
      Ζητήστε Προσφορά
    </button>
  </div>
 
  {/* Stats row — unchanged content, repositioned bottom-left */}
  <div style={{
    position: "absolute",
    bottom: "32px",
    left: "64px",
    zIndex: 2,
    display: "flex",
    gap: "40px",
  }}>
    <div>
      <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>20+</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Χρόνια εμπειρίας</div>
    </div>
    <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
    <div>
      <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>500+</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Ικανοποιημένοι πελάτες</div>
    </div>
    <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
    <div>
      <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>15+</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Ασφαλιστικές εταιρείες</div>
    </div>
  </div>
</section>
```
 
**Leave the product card strip (the white card with 6 categories) directly below this exactly where it is** — do not move or restyle its layout. Its icons get swapped in Section 5.
 
---
 
## 2. Navbar — Center the Nav Links
 
Change the `<nav>` from its current 2-zone layout (logo | links+CTA together) to a 3-zone grid: logo left, links centered, CTA right. Also change the arrows make them something more minimal and simple adding a frame motion effect each time you mouseclick it. 
 
```tsx
<nav style={{
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  background: "#1E439A",
  height: "88px",
  padding: "0 36px",
  position: "sticky",
  top: 0,
  zIndex: 100,
}}>
  {/* Logo — left */}
  <img
    src="/logo.png"
    alt="Δημήτριος Πλουμάκης"
    style={{ height: "60px", objectFit: "contain", justifySelf: "start" }}
  />
 
  {/* Nav links — centered */}
  <ul style={{
    justifySelf: "center",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  }}>
    {/* keep the existing Ιδιώτες / Επιχείρηση / Εμείς <li> items exactly as they are — only the parent <ul>'s positioning changes */}
  </ul>
 
  {/* CTA — right, standing alone now (remove the old divider, it's no longer needed) */}
  <button style={{
    justifySelf: "end",
    background: "#fff",
    color: "#1E439A",
    fontWeight: 700,
    fontFamily: "var(--font-ubuntu-sans), sans-serif",
    padding: "10px 20px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
  }}>
    Ζητήστε Προσφορά
  </button>
</nav>
```
 
---

## 3. NavBar Options
So in the options tab in "Ιδιώτες" and "Επιχείρηση" make the text larger and also the options to be grayscale 100% and whileHover to make it grayscale 0%. 
---

## 4. Font Family — Switch to Ubuntu Sans
 
In `app/layout.tsx`, replace the current font setup with:
 
```tsx
import { Ubuntu_Sans } from "next/font/google";
 
const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin", "greek"], // "greek" subset is required — without it, Greek characters won't load correctly
  weight: ["400", "500", "600", "700"],
  variable: "--font-ubuntu-sans",
});
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={ubuntuSans.variable}>
      <body>{children}</body>
    </html>
  );
}
```
 
Then, in `app/page.tsx` and `app/components/PartnersMarquee.tsx`: **find every instance** of
```
fontFamily: "'Century Gothic', 'Gill Sans', sans-serif"
```
and replace it with:
```
fontFamily: "var(--font-ubuntu-sans), sans-serif"
```
 
---
 
## 5. Framer Motion — Navbar Interactions
 
**Nav link hover:** wrap each nav link/button in `motion.button` or `motion.a`:
 
```tsx
<motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
  onClick={() => toggleMenu("idiwtes")}
  style={{ /* keep existing style object unchanged */ }}
>
  Ιδιώτες
  <span style={{ fontSize: "10px", opacity: 0.7 }}>▼</span>
</motion.button>
```
Apply the same `whileHover`/`whileTap` wrapper to the "Επιχείρηση" button and the "Εμείς" link.
 
**Mega-dropdown open/close:** replace the plain conditional rendering with `AnimatePresence` so the panel animates out instead of vanishing instantly:
 
```tsx
import { motion, AnimatePresence } from "framer-motion";
 
// ...
 
<AnimatePresence>
  {activeMenu && (
    <React.Fragment key="menu-group">
      <motion.div
        key="backdrop"
        onClick={closeMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          inset: 0,
          top: "88px",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
        }}
      />
      <motion.div
        key="panel"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: "88px",
          left: 0,
          right: 0,
          zIndex: 95,
          background: "#fff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          padding: "48px 64px 56px",
          borderBottom: "1px solid #e8eaef",
        }}
      >
        {/* keep all existing panel content (header + product grid) exactly as it is */}
      </motion.div>
    </React.Fragment>
  )}
</AnimatePresence>
```
 
---
 
## 6. Lucide Icons — Replace Emojis
 
Add this import near the top of `app/page.tsx`:
 
```tsx
import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
} from "lucide-react";
```
 
**Product card strip** — update the categories array to store the icon *component* (not an emoji string):
 
```tsx
const PRODUCT_CARDS = [
  { icon: Users, title: "Οικογένεια" },
  { icon: Home, title: "Κατοικία" },
  { icon: Car, title: "Αυτοκίνητο" },
  { icon: Heart, title: "Υγεία" },
  { icon: Briefcase, title: "Επιχείρηση" },
  { icon: PiggyBank, title: "Αποταμίευση" },
];
```
 
In the render, replace the emoji text inside each icon circle with the actual component:
 
```tsx
<card.icon size={22} color="#1E439A" strokeWidth={1.75} />
```
 
**Mega-dropdown** — update both product arrays the same way:
 
```tsx
const IDIWTES_PRODUCTS = [
  { icon: Heart, subtitle: "Νοσηλεία, Περίθαλψη", title: "Υγεία" },
  { icon: Leaf, subtitle: "Προστασία, Οικογένεια", title: "Ζωή" },
  { icon: Home, subtitle: "Σπίτι, Περιουσία", title: "Κατοικία" },
  { icon: Scale, subtitle: "Ζημιές, Προστασία", title: "Αστική Ευθύνη" },
  { icon: Car, subtitle: "Αυτοκίνητο, Ασφάλεια", title: "Όχημα" },
  { icon: TrendingUp, subtitle: "Κεφάλαιο, Απόδοση", title: "Επένδυση" },
  { icon: ShieldCheck, subtitle: "Δεδομένα, Ασφάλεια", title: "Cyber" },
  { icon: PawPrint, subtitle: "Ζώο, Περίθαλψη", title: "Κατοικίδιο" },
];
 
const EPIXEIRISI_PRODUCTS = [
  { icon: Building2, subtitle: "Χώρος, Εξοπλισμός", title: "Επαγγελματικός Χώρος" },
  { icon: Scale, subtitle: "Ζημιές Τρίτων", title: "Αστική Ευθύνη" },
  { icon: Truck, subtitle: "Στόλος, Οχήματα", title: "Εταιρικά Οχήματα" },
  { icon: ShieldAlert, subtitle: "Δεδομένα, Επιθέσεις", title: "Cyber" },
  { icon: Users, subtitle: "Προσωπικό, Παροχές", title: "Ομαδική Ασφάλιση" },
  { icon: Package, subtitle: "Εμπορεύματα, Μεταφορά", title: "Μεταφορά Εμπορευμάτων" },
];
```
 
In the dropdown's icon circle, replace the emoji render with:
 
```tsx
<product.icon size={20} color="#1E439A" strokeWidth={1.75} />
```
 
---
## 7. Adde New Pages
For each product category, add a new page giving in detail descriptions about the plans. We will get into that later. For now you can just add the pages.

---
 
## 8. Organize all the assets and components
Make all the components look clean in a folder making them ,all together and delete the assets in the `/assets` folder that are already in the `/public/partners` folder.

## Constraints
 
- Keep inline styles throughout — no Tailwind, no CSS modules
- Preserve all existing Greek copy exactly
- Do not touch the split sections, stats band (aside from moving it inside the new hero per Section 1), `globals.css`, or Partners marquee logic beyond the font swap in Section 3
- Run `npm run dev` and check the Greek text renders correctly after the font change — if any Greek characters look like boxes/tofu, the `greek` subset didn't load properly