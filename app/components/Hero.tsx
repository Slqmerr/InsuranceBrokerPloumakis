"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Statically imported so Next infers each mark's intrinsic width/height — the
// marquee sets height and leaves width auto, so only the aspect ratio matters
// and nothing has to be re-measured by hand when a logo file is swapped.
import interamericanLogo from "@/public/partners/interamerican.png";
import eurolifeLogo from "@/public/partners/eurolife.png";
import allianzLogo from "@/public/partners/allianz.png";
import generaliLogo from "@/public/partners/generali.svg";
import ergoLogo from "@/public/partners/ergo.png";
import aigLogo from "@/public/partners/aig.png";
import interlifeLogo from "@/public/partners/interlife.png";
import ethnikiLogo from "@/public/partners/ethniki.svg";
import heroPhoto from "@/public/dimitrios.jpg";

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
const PARTNER_LOGOS: { src: StaticImageData; alt: string; height: number }[] = [
  { src: interamericanLogo, alt: "Interamerican", height: 25 },
  { src: eurolifeLogo, alt: "Eurolife FFH", height: 26 },
  { src: allianzLogo, alt: "Allianz", height: 26 },
  { src: generaliLogo, alt: "Generali", height: 36 },
  { src: ergoLogo, alt: "ERGO", height: 24 },
  { src: aigLogo, alt: "AIG", height: 30 },
  { src: interlifeLogo, alt: "Interlife", height: 28 },
  { src: ethnikiLogo, alt: "Εθνική Ασφαλιστική", height: 32 },
];

export default function Hero() {
  return (
    <section className="hero-section" style={{
      position: "relative",
      height: "640px",
      overflow: "hidden",
    }}>
      {/* Background photo — full bleed */}
      {/* `fill` against the section's position:relative — full bleed at every
          width, hence sizes="100vw". preload: this is the homepage LCP. */}
      <Image
        src={heroPhoto}
        alt="Δημήτριος Πλουμάκης"
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        style={{
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
      />

      {/* Red gradient overlay — the color ramps down alongside the alpha. Full brand
          red holds through the first ~35%, which is where the text column sits (a
          560px content box), so the headline keeps its red backdrop and contrast.
          Past that it shifts to a darkened red (half the red channel of #a30000) so
          the photo itself takes a near-neutral scrim instead of a red wash. */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(100deg, rgba(163,0,0,0.42) 0%, rgba(155,0,0,0.34) 35%, rgba(82,0,0,0.24) 65%, rgba(82,0,0,0.12) 100%)",
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
          Εξατομικευμένες ασφαλιστικές λύσεις για εσάς,την οικογένεια σας και την επιχείρησή σας.
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
            <Image
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={i < PARTNER_LOGOS.length ? logo.alt : ""}
              aria-hidden={i >= PARTNER_LOGOS.length}
              // The static import supplies intrinsic width/height; the style pins
              // the rendered height and lets width follow the aspect ratio.
              // .svg marks are passed through unoptimized by next/image.
              // `sizes` is required even at a fixed size: without it the srcset is
              // built from the intrinsic width, and these source files are huge
              // (allianz.png is 3840px wide for a ~105px slot). 200px is the
              // widest any mark renders — interamerican at 25px tall.
              sizes="200px"
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
