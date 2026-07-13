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

type Props = {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  reverse?: boolean; // true → text left, image right (edge-cut on the right)
};

export default function SplitFeature({
  imageSrc,
  imageAlt,
  imagePosition = "center",
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  reverse = false,
}: Props) {
  const image = (
    <motion.img
      src={imageSrc}
      alt={imageAlt}
      className={`split-img ${reverse ? "split-img-right" : "split-img-left"}`}
      initial={{ opacity: 0, x: reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        height: "480px",
        objectFit: "cover",
        objectPosition: imagePosition,
        display: "block",
        borderRadius: reverse ? "240px 0 0 240px" : "0 240px 240px 0",
        // Theme-color shadow — drop-shadow hugs the rounded curve
        filter: "drop-shadow(0 22px 36px rgba(163,0,0,0.26))",
      }}
    />
  );

  const content = (
    <div
      className="split-content"
      style={{
        position: "relative",
        minHeight: "480px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: reverse ? "flex-end" : "flex-start",
        padding: "48px 64px",
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <motion.span
          variants={fadeUp}
          style={{ color: "#a30000", fontSize: "13px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          {eyebrow}
        </motion.span>

        <motion.h3
          variants={fadeUp}
          style={{
            fontFamily: UBUNTU,
            fontSize: "clamp(34px, 4.4vw, 50px)",
            fontWeight: 700,
            color: "#5e0000",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          style={{ fontSize: "17px", color: "#555", lineHeight: 1.75, margin: 0 }}
        >
          {body}
        </motion.p>

        <motion.div variants={fadeUp} style={{ marginTop: "6px" }}>
          <MotionLink
            href={ctaHref}
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
              padding: "14px 28px",
              borderRadius: "999px",
              textDecoration: "none",
              willChange: "transform",
            }}
          >
            {ctaLabel}
            <motion.span variants={arrowSlide} style={{ display: "inline-flex" }}>
              <ArrowRight size={17} strokeWidth={2.2} />
            </motion.span>
          </MotionLink>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <section
      className={`split-section${reverse ? " split-reverse" : ""}`}
      style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}
    >
      {/* Colored band runs under the photo's curve to the far edge */}
      <div
        aria-hidden
        className="split-band"
        style={{ position: "absolute", inset: reverse ? "0 30% 0 0" : "0 0 0 30%", background: "#f9efef" }}
      />
      {reverse ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </section>
  );
}
