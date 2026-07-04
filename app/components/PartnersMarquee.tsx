"use client";

import { motion } from "framer-motion";

const GOTHIC = "var(--font-ubuntu-sans), sans-serif";

/**
 * Partner insurance companies. Logo files live in /public/partners.
 * To add one: drop the file in that folder and add a { name, src } entry here.
 */
const PARTNERS = [
  { name: "Interamerican", src: "/partners/interamerican.png" },
  { name: "Allianz", src: "/partners/allianz.png" },
  { name: "Generali", src: "/partners/generali.svg" },
  { name: "Eurolife", src: "/partners/eurolife.png" },
  { name: "AIG", src: "/partners/aig.png" },
  { name: "ERGO", src: "/partners/ergo.png" },
  { name: "NN", src: "/partners/nn.svg" },
  { name: "Υδρόγειος", src: "/partners/ydrogios.png" },
  { name: "Interlife", src: "/partners/interlife.png" },
];

// gap between logos — applied as a right margin so translateX(-50%) stays seamless
const GAP = 28;

export default function PartnersMarquee() {
  // duplicate the list once; the animation shifts by exactly one set width (-50%)
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section style={{ background: "#fff", padding: "56px 0 64px" }}>
      <h2
        style={{
          textAlign: "center",
          fontFamily: GOTHIC,
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: "#8a93a6",
          margin: "0 0 36px",
        }}
      >
        Οι ασφαλιστικές μας εταιρίες
      </h2>

      <div className="marquee-viewport">
        <div className="marquee-track">
          {loop.map((partner, i) => {
            const isClone = i >= PARTNERS.length;
            return (
              <motion.div
                key={`${partner.name}-${i}`}
                aria-hidden={isClone}
                title={partner.name}
                initial={{ filter: "grayscale(0%)", opacity: 1 }}
                whileHover={{ filter: "grayscale(0%)", opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  flex: "0 0 auto",
                  marginRight: `${GAP}px`,
                  width: "168px",
                  height: "76px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 20px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  loading="lazy"
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "48px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
