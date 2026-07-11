"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { PRODUCT_CARDS } from "./products";

const SWIPE = { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as const;
const COL_W = 100 / PRODUCT_CARDS.length; // width of one tile, as % of the strip

export default function ProductCardStrip() {
  // A single shared highlight — only one coloured element ever exists, so two
  // tiles can never show colour at once. It slides between tiles on hover.
  const controls = useAnimationControls();
  const active = useRef<number | null>(null);

  const activate = (i: number, fromLeft: boolean) => {
    const wasIdle = active.current === null;
    active.current = i;
    if (wasIdle) {
      // Appear at the hovered tile, sliding in from the side the cursor entered.
      const startX = fromLeft ? i - 0.5 : i + 0.5;
      controls.set({ x: `${startX * 100}%`, backgroundColor: PRODUCT_CARDS[i].color, opacity: 0 });
      controls.start({ x: `${i * 100}%`, opacity: 1, transition: SWIPE });
    } else {
      // Slide to the new tile and crossfade to its colour.
      controls.start({ x: `${i * 100}%`, backgroundColor: PRODUCT_CARDS[i].color, transition: SWIPE });
    }
  };

  const deactivate = () => {
    active.current = null;
    controls.start({ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } });
  };

  return (
    <div
      onMouseLeave={deactivate}
      style={{
        background: "#fff",
        boxShadow: "0 12px 40px rgba(94, 0, 0,0.12)",
        borderRadius: "24px",
        margin: "-48px 52px 0",
        position: "relative",
        zIndex: 10,
        padding: 0,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "0px",
      }}
    >
      {/* Shared sliding highlight */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${COL_W}%`,
          background: PRODUCT_CARDS[0].color,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {PRODUCT_CARDS.map((card, i) => (
        // display: contents keeps the Link out of the grid layout — the
        // motion.div stays the grid item, the whole tile navigates.
        <Link key={card.title} href={card.href} style={{ textDecoration: "none", display: "contents" }}>
          <motion.div
            onMouseEnter={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              activate(i, e.clientX - r.left < r.width / 2);
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "60px 8px",
              cursor: "pointer",
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#f7e8e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <card.icon size={22} color="#a30000" strokeWidth={1.75} />
            </div>
            <div style={{
              textAlign: "center",
              color: "#a30000",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "var(--font-ubuntu-sans), sans-serif",
            }}>
              {card.title}
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
