# Task for Claude Code — Homepage Trust Sections

> Adjust the leading number (`12-`) to follow whatever your latest prompt file is.

This prompt adds **three new sections** to the homepage (`app/page.tsx`) as three new
components, then wires them into the page. It does **not** touch product-page content,
the navbar, the hero, or the footer.

**Why these three:** the homepage currently shows *what* products exist but never says
*why* a visitor should choose this broker, *how* working together actually works, or
*who* Dimitrios is. These sections fill that gap — they do the trust-building work a
broker homepage needs.

---

## Hard rules (from `CLAUDE.md` — do not break)

- **Inline styles only.** No Tailwind utility classes, no CSS modules.
- **All user-facing copy stays in Greek, exactly as written below.** Do not translate,
  paraphrase, or "improve" the Greek text.
- **Do not invent or alter any insurance product claims.** These sections describe the
  broker's service, process, and credentials — not insurance products — so no partner
  research is involved. Just reproduce the copy as given.
- Icons: `lucide-react`. Animations: `framer-motion`. Font: `var(--font-ubuntu-sans), sans-serif`.
- Match the existing design tokens (listed below). These sections must look native to
  the site, not bolted on.

## Design tokens to reuse (already used elsewhere in the repo)

| Token | Value |
|---|---|
| Brand blue | `#1E439A` |
| Deep navy (headings) | `#0F2660` |
| Light tints (section backgrounds) | `#F5F7FB`, `#f7f8fc` |
| Chip / ring tint | `#EEF2FF` |
| Icon-circle background | `#e8eef8` |
| Body text | `#555` |
| Card radius | `24px` (feature cards), `20px` (step cards) |
| Pill radius | `999px` |
| Soft card shadow | `0 12px 40px rgba(18,35,85,0.08)` |
| Font const | `const UBUNTU = "var(--font-ubuntu-sans), sans-serif";` |

If any `lucide-react` icon name below throws an "not exported" error, swap it for the
closest available icon and leave a `// TODO: icon swapped` comment — do not remove the icon.

---

## 1. Create `app/components/WhyBroker.tsx`

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, Handshake, LifeBuoy, Wallet } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const REASONS = [
  {
    icon: Compass,
    title: "Ανεξάρτητη καθοδήγηση",
    text: "Δεν δεσμευόμαστε από μία εταιρεία. Συγκρίνουμε προϊόντα από κορυφαίες ασφαλιστικές και προτείνουμε ό,τι ταιριάζει πραγματικά σε εσάς.",
  },
  {
    icon: Handshake,
    title: "Ένας συνεργάτης για όλα",
    text: "Υγεία, κατοικία, όχημα, επιχείρηση — όλες οι ασφαλίσεις σας από έναν έμπιστο άνθρωπο, χωρίς περιττά τηλεφωνικά κέντρα.",
  },
  {
    icon: LifeBuoy,
    title: "Στο πλευρό σας στην αποζημίωση",
    text: "Όταν συμβεί το απρόοπτο, είμαστε εκεί. Αναλαμβάνουμε τη διαδικασία μαζί σας και φροντίζουμε να λάβετε ό,τι δικαιούστε.",
  },
  {
    icon: Wallet,
    title: "Χωρίς επιπλέον κόστος",
    text: "Η καθοδήγηση και η υποστήριξή μας δεν επιβαρύνουν το ασφάλιστρό σας. Κερδίζετε έναν σύμβουλο, χωρίς κρυφές χρεώσεις.",
  },
];

export default function WhyBroker() {
  return (
    <section style={{ background: "#F5F7FB", padding: "72px 64px" }}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ color: "#1E439A", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}
      >
        Γιατί εμείς
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#0F2660", margin: "0 0 12px", maxWidth: "620px", lineHeight: 1.25 }}
      >
        Γιατί να εμπιστευτείτε έναν ασφαλιστικό σύμβουλο
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ color: "#555", fontSize: "16px", lineHeight: 1.65, maxWidth: "620px", margin: "0 0 48px" }}
      >
        Ένας ανεξάρτητος σύμβουλος δεν πουλά απλώς ασφάλειες — σας βοηθά να επιλέξετε σωστά. Να τι σημαίνει αυτό για εσάς:
      </motion.p>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}
      >
        {REASONS.map((r) => (
          <motion.div
            key={r.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px 28px",
              boxShadow: "0 12px 40px rgba(18,35,85,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#e8eef8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <r.icon size={26} color="#1E439A" strokeWidth={1.75} />
            </div>
            <h3 style={{ fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#0F2660", margin: 0, lineHeight: 1.3 }}>
              {r.title}
            </h3>
            <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
              {r.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

---

## 2. Create `app/components/HowItWorks.tsx`

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, Scale, ShieldCheck } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const STEPS = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Μιλήστε μαζί μας",
    text: "Μας λέτε τις ανάγκες και τις ανησυχίες σας. Ακούμε προσεκτικά και κατανοούμε τι θέλετε να προστατέψετε.",
  },
  {
    num: "02",
    icon: Scale,
    title: "Συγκρίνουμε για εσάς",
    text: "Αναζητούμε και συγκρίνουμε προσφορές από τις συνεργαζόμενες εταιρείες, για να βρούμε τη σωστή κάλυψη στη σωστή τιμή.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Σας στηρίζουμε διαρκώς",
    text: "Αναλαμβάνουμε τα πάντα — από τη σύναψη του συμβολαίου μέχρι την υποστήριξη σε κάθε αποζημίωση.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ background: "#fff", padding: "72px 64px" }}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ color: "#1E439A", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}
      >
        Η διαδικασία
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#0F2660", margin: "0 0 48px", maxWidth: "620px", lineHeight: 1.25 }}
      >
        Απλά βήματα προς τη σωστή ασφάλιση
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
      >
        {STEPS.map((step) => (
          <motion.div
            key={step.num}
            variants={fadeUp}
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#f7f8fc",
              borderRadius: "20px",
              padding: "40px 28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Big watermark number */}
            <span style={{
              position: "absolute",
              top: "8px",
              right: "20px",
              fontFamily: UBUNTU,
              fontSize: "72px",
              fontWeight: 800,
              color: "#e4ebfb",
              lineHeight: 1,
              zIndex: 0,
              pointerEvents: "none",
            }}>
              {step.num}
            </span>

            {/* Icon circle */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#e8eef8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <step.icon size={26} color="#1E439A" strokeWidth={1.75} />
            </div>

            <h3 style={{ position: "relative", zIndex: 1, fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#0F2660", margin: 0, lineHeight: 1.3 }}>
              {step.title}
            </h3>
            <p style={{ position: "relative", zIndex: 1, color: "#555", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
              {step.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

---

## 3. Create `app/components/MeetDimitrios.tsx`

Credential figures below are pulled from the existing `app/emeis/page.tsx` (LIMRA 2012 &
2013, national awards 2000–2013, Loyalty Award 2025). Do not change them.

```tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Award, TrendingUp, BadgeCheck, ArrowRight } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const CREDENTIALS = [
  { icon: Award, label: "Πιστοποιήσεις LIMRA · 2012 & 2013" },
  { icon: TrendingUp, label: "13 χρόνια εθνικών διακρίσεων" },
  { icon: BadgeCheck, label: "Loyalty Award 2025" },
];

export default function MeetDimitrios() {
  return (
    <section style={{ background: "#F5F7FB", padding: "72px 64px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "56px",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {/* Photo — opposite-corner pill curve, echoing the split sections */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            overflow: "hidden",
            borderTopLeftRadius: "160px",
            borderBottomRightRadius: "160px",
            borderTopRightRadius: "24px",
            borderBottomLeftRadius: "24px",
            minHeight: "440px",
          }}
        >
          <img
            src="/dimitrios.jpg"
            alt="Δημήτριος Πλουμάκης"
            style={{ width: "100%", height: "100%", minHeight: "440px", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <motion.p
            variants={fadeUp}
            style={{ color: "#1E439A", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}
          >
            Ο άνθρωπος πίσω από την ασφάλιση
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, color: "#0F2660", margin: 0, lineHeight: 1.2 }}
          >
            Δημήτριος Πλουμάκης
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ color: "#555", fontSize: "16px", lineHeight: 1.7, margin: 0, maxWidth: "480px" }}
          >
            Με περισσότερα από 25 χρόνια εμπειρίας στον ασφαλιστικό κλάδο, ο Δημήτριος συνδυάζει διεθνείς πιστοποιήσεις με βαθιά γνώση της αγοράς — και μια σταθερή αρχή: το συμφέρον του πελάτη πάνω απ' όλα.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "4px" }}
          >
            {CREDENTIALS.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#EEF2FF",
                  color: "#1E439A",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <c.icon size={15} strokeWidth={2} />
                {c.label}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: "8px" }}>
            <Link
              href="/emeis"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#1E439A", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
            >
              Γνωρίστε τον Δημήτριο
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4. Wire the three components into `app/page.tsx`

### 4a. Add imports

At the top of `app/page.tsx`, alongside the existing component imports, add:

```tsx
import WhyBroker from "./components/WhyBroker";
import HowItWorks from "./components/HowItWorks";
import MeetDimitrios from "./components/MeetDimitrios";
```

### 4b. Insert `<WhyBroker />` after the intro block

Find the end of the intro `<div>` (the one that contains the heading
`Με δύναμη, εξειδίκευση και ειλικρίνεια στο πλευρό σας`). It closes right before the
comment `{/* ── SPLIT: Family ── */}`. Insert `<WhyBroker />` **between** them:

```tsx
      </div>

      {/* === WHY A BROKER === */}
      <WhyBroker />

      {/* ── SPLIT: Family ── */}
```

### 4c. Insert `<HowItWorks />` and `<MeetDimitrios />` after the Figurines split

Find the closing `</div>` of the Figurines split block (the one whose image is
`/figurines.jpg`). It sits right before the comment `{/* ==== PARTNERS MARQUEE ==== */}`.
Insert both new sections **between** them, in this order:

```tsx
      </div>

      {/* === HOW IT WORKS === */}
      <HowItWorks />

      {/* === MEET DIMITRIOS === */}
      <MeetDimitrios />

      {/* ==== PARTNERS MARQUEE ==== */}
```

**Resulting page order:** Navbar → Hero → ProductCardStrip → intro → **WhyBroker** →
Family split → Figurines split → **HowItWorks** → **MeetDimitrios** → PartnersMarquee → Footer.

This alternates section backgrounds (white → tint → white → tint → white → tint) so no two
adjacent sections share the same colour.

---


## Verification checklist


2. Homepage shows, in order: intro → **Why a broker (4 cards)** → Family split → Figurines
   split → **How it works (3 numbered steps)** → **Meet Dimitrios (photo + chips + link)** →
   partners → footer.
3. All Greek text renders correctly (no boxes/tofu). If Greek looks broken, the font
   subset is the cause — not this prompt.
4. Hovering a "Why a broker" card lifts it slightly; scrolling into each section triggers
   the fade-up animation.
5. The "Γνωρίστε τον Δημήτριο" link navigates to `/emeis`.
6. `/dimitrios.jpg` loads inside the Meet Dimitrios photo frame (it already exists in
   `/public`).
7. No `lucide-react` import errors. If one occurred, confirm the `// TODO: icon swapped`
   comment is present.

