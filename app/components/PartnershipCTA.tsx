"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

// Link that accepts motion props, so the CTA keeps client-side navigation
const MotionLink = motion.create(Link);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* CTA — lifts + red glow on hover; "hover" label propagates to the arrow */
const ctaBtn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.045, y: -2, boxShadow: "0 16px 34px rgba(163,0,0,0.4)" },
};

const arrowSlide: Variants = {
  hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 18 } },
};

export default function PartnershipCTA() {
  return (
    <section className="section-pad" style={{ background: "#fff", padding: "88px 64px 96px" }}>
      <div
        className="partner-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "64px",
          alignItems: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Huge text — left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{ display: "flex", flexDirection: "column", gap: "22px" }}
        >
          <motion.span
            variants={fadeUp}
            style={{ color: "#a30000", fontSize: "13px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            Συνεργασία
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: UBUNTU,
              fontSize: "clamp(38px, 5vw, 58px)",
              fontWeight: 700,
              color: "#5e0000",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Χτίσε καριέρα στην ασφάλιση, δίπλα μας
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ color: "#555", fontSize: "17px", lineHeight: 1.75, margin: 0, maxWidth: "460px" }}
          >
            Γίνε συνεργάτης σε ένα δίκτυο με 25+ χρόνια εμπειρίας, πρόσβαση στις κορυφαίες
            ασφαλιστικές εταιρείες και πραγματική υποστήριξη σε κάθε σου βήμα.
          </motion.p>

          <motion.div variants={fadeUp} style={{ marginTop: "6px" }}>
            <MotionLink
              href="/synergasia"
              variants={ctaBtn}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#a30000",
                color: "#fff",
                fontWeight: 700,
                fontFamily: UBUNTU,
                fontSize: "15px",
                padding: "15px 30px",
                borderRadius: "999px",
                textDecoration: "none",
                willChange: "transform",
              }}
            >
              Γίνε συνεργάτης
              <motion.span variants={arrowSlide} style={{ display: "inline-flex" }}>
                <ArrowRight size={17} strokeWidth={2.2} />
              </motion.span>
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* Image — right, with theme-color shadow */}
        <motion.div
          className="partner-photo"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            overflow: "hidden",
            borderTopRightRadius: "160px",
            borderBottomLeftRadius: "160px",
            borderTopLeftRadius: "24px",
            borderBottomRightRadius: "24px",
            minHeight: "440px",
            // Theme-color shadow
            boxShadow: "0 40px 80px -24px rgba(163,0,0,0.5), 0 12px 32px -12px rgba(163,0,0,0.35)",
          }}
        >
          <img
            src="/family.jpg"
            alt="Συνεργασία"
            style={{ width: "100%", height: "100%", minHeight: "440px", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
