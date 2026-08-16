"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Award, TrendingUp, BadgeCheck, ArrowRight } from "lucide-react";
import dimitriosPhoto from "@/public/dimitrios.jpg";

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
    // Full-bleed like the split sections: no max-width cap, so the photo runs
    // from the viewport edge to the centre. `overflow: hidden` keeps the photo's
    // entrance transform from adding scrollable width.
    <section className="meet-section" style={{ background: "#fbf5f5", padding: "72px 0", overflow: "hidden" }}>
      <div className="meet-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
      }}>
        {/* Photo — flush to the viewport edge, rounded on the inner side only */}
        <motion.div
          className="meet-photo"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            overflow: "hidden",
            borderRadius: "0 32px 32px 0",
            // Matches the photo's native 3:2, so nothing gets cropped and the
            // ratio also sets the row height (720×480 at a 1440px viewport).
            // `stretch` lets the cell grow if the copy ever runs taller.
            aspectRatio: "3 / 2",
          }}
        >
          {/* Sized by CSS rather than `fill`: the frame owns the ratio and the
              image just fills it. The static import supplies the intrinsic
              dimensions; `sizes` drives the srcset the browser picks. */}
          <Image
            src={dimitriosPhoto}
            alt="Δημήτριος Πλουμάκης"
            sizes="(max-width: 900px) 100vw, 50vw"
            placeholder="blur"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="meet-content"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "18px",
            padding: "0 64px",
            maxWidth: "620px",
          }}
        >
          

          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, color: "#5e0000", margin: 0, lineHeight: 1.2 }}
          >
            Δημήτριος Πλουμάκης
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ color: "#555", fontSize: "16px", lineHeight: 1.7, margin: 0, maxWidth: "480px" }}
          >
            Με περισσότερα από 25 χρόνια εμπειρίας στον ασφαλιστικό κλάδο, συνδυάζω διεθνείς πιστοποιήσεις με βαθιά γνώση της αγοράς και μια σταθερή αρχή: το συμφέρον του πελάτη πάνω απ' όλα.
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
                  background: "#f9efef",
                  color: "#a30000",
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
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#a30000", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
            >
              Μάθετε περισσότερα
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
