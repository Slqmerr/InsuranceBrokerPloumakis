"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Link that accepts motion props, so the CTA keeps client-side navigation
const MotionLink = motion.create(Link);

/* Hero CTA — rises in, lifts + glows on hover; the "hover" label propagates
   to the arrow so it slides on button hover */
const ctaBtn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  hover: { scale: 1.045, y: -2, boxShadow: "0 14px 30px rgba(0,0,0,0.22)" },
};

const arrowSlide: Variants = {
  hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 18 } },
};

// height compensates for each file's padding/aspect so the marks look the same size.
// Source PNGs/SVGs are tightly cropped, so height maps directly to the mark's cap height.
const PARTNER_LOGOS = [
  { src: "/partners/interamerican.png", alt: "Interamerican", height: 25 },
  { src: "/partners/eurolife.png", alt: "Eurolife FFH", height: 26 },
  { src: "/partners/allianz.png", alt: "Allianz", height: 26 },
  { src: "/partners/generali.svg", alt: "Generali", height: 36 },
  { src: "/partners/ergo.png", alt: "ERGO", height: 24 },
  { src: "/partners/aig.png", alt: "AIG", height: 30 },
  { src: "/partners/interlife.png", alt: "Interlife", height: 28 },
  { src: "/partners/ethniki.svg", alt: "Εθνική Ασφαλιστική", height: 32 },
];

export default function Hero() {
  return (
    <section className="hero-section" style={{
      position: "relative",
      height: "640px",
      overflow: "hidden",
    }}>
      {/* Background photo — full bleed */}
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

      {/* Red gradient overlay — solid near the text, fading out toward the photo */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(100deg, rgba(163, 0, 0, 0.37) 0%, rgba(163, 0, 0, 0.31) 35%, rgba(163,0,0,0.35) 70%, rgba(163,0,0,0.15) 100%)",
      }} />
{/* KANE ZOOM TO IMAGE KAI POSITION DEKSIA*/}
      {/* Text content */}
      <div className="hero-content" style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px",
        maxWidth: "560px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>
          Αξία έχει ό,τι είναι σημαντικό για σένα
        </p>
        <h1 className="hero-title" style={{
          color: "#fff",
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
          fontSize: "42px",
          fontWeight: 700,
          lineHeight: 1.15,
          margin: "0 0 20px",
        }}>
          Προστατεύουμε ό,τι αγαπάτε περισσότερο
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 700, lineHeight: 1.6, marginBottom: "32px" }}>
          Εξατομικευμένες ασφαλιστικές λύσεις για εσάς, την οικογένεια και την επιχείρησή σας.
        </p>
        <MotionLink
          href="/epikoinonia"
          variants={ctaBtn}
          initial="hidden"
          animate="show"
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          style={{
            background: "#fff",
            color: "#a30000",
            fontWeight: 700,
            fontFamily: "var(--font-ubuntu-sans), sans-serif",
            padding: "14px 32px",
            borderRadius: "999px",
            textDecoration: "none",
            cursor: "pointer",
            width: "fit-content",
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            willChange: "transform",
          }}
        >
          Κλείσε Ραντεβού
          <motion.span variants={arrowSlide} style={{ display: "inline-flex" }}>
            <ArrowRight size={16} strokeWidth={2.2} />
          </motion.span>
        </MotionLink>
      </div>

      {/* Partner logo marquee — full-width, brand colors, lifted above the product card strip */}
      <motion.div
        className="hero-marquee"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: "96px",
          left: 0,
          right: 0,
          zIndex: 2,
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          style={{ display: "flex", alignItems: "center", gap: "72px", width: "max-content", paddingRight: "72px" }}
        >
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={i < PARTNER_LOGOS.length ? logo.alt : ""}
              aria-hidden={i >= PARTNER_LOGOS.length}
              style={{
                height: `${logo.height}px`,
                width: "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
