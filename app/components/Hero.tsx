"use client";

import React from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const HERO_STATS = [
  { value: 20, suffix: "+", label: "Χρόνια εμπειρίας" },
  { value: 500, suffix: "+", label: "Ικανοποιημένοι πελάτες" },
  { value: 15, suffix: "+", label: "Ασφαλιστικές εταιρείες" },
];

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  React.useEffect(() => {
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut", delay: 0.4 });
    return () => controls.stop();
  }, [count, value]);

  return (
    <div>
      <motion.div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>
        {display}
      </motion.div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>{label}</div>
    </div>
  );
}

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

      {/* Stats row — bottom-left, lifted above the overlapping product card strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: "96px",
          left: "64px",
          zIndex: 2,
          display: "flex",
          gap: "40px",
        }}
      >
        {HERO_STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />}
            <CountUpStat value={stat.value} suffix={stat.suffix} label={stat.label} />
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
