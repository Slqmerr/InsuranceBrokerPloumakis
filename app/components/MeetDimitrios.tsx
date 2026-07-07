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
    <section style={{ background: "#fdf6f6", padding: "72px 64px" }}>
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
          

          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, color: "#7a1519", margin: 0, lineHeight: 1.2 }}
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
                  background: "#fdeeef",
                  color: "#c1272d",
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
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#c1272d", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
            >
              Γνωρίστε με
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
