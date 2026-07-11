"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// height compensates for each file's padding/aspect so the marks look the same size
const PARTNER_LOGOS = [
  { src: "/partners/interamerican.png", alt: "Interamerican", height: 22 },
  { src: "/partners/eurolife.png", alt: "Eurolife FFH", height: 56 },
  { src: "/partners/allianz.png", alt: "Allianz", height: 26 },
  { src: "/partners/generali.svg", alt: "Generali", height: 36 },
  { src: "/partners/ergo.png", alt: "ERGO", height: 24 },
  { src: "/partners/aig.png", alt: "AIG", height: 30 },
  { src: "/partners/interlife.png", alt: "Interlife", height: 28 },
  { src: "/partners/ethniki.svg", alt: "Εθνική Ασφαλιστική", height: 32 },
];

export default function Hero() {
  return (
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
        <Link href="/epikoinonia" style={{
          background: "#fff",
          color: "#1E439A",
          fontWeight: 700,
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
          padding: "14px 32px",
          borderRadius: "999px",
          textDecoration: "none",
          cursor: "pointer",
          width: "fit-content",
          fontSize: "14px",
        }}>
          Κλείσε Ραντεβού
        </Link>
      </div>

      {/* Partner logo marquee — full-width, lifted above the overlapping product card strip */}
      <motion.div
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
                filter: "brightness(0) invert(1)",
                opacity: 0.75,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
