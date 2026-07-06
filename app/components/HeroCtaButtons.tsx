"use client";

import Link from "next/link";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const PILL: React.CSSProperties = {
  fontWeight: 700,
  fontFamily: UBUNTU,
  fontSize: "14px",
  padding: "13px 30px",
  borderRadius: "999px",
  textDecoration: "none",
};

/**
 * Hero CTA for the product pages. Lives in its own client file because the
 * hover handlers can't sit in the server-rendered ProductPageContent.
 * "Ζητήστε Προσφορά" sits at the end of the body copy instead — same
 * destination, intentionally.
 */
export default function HeroCtaButtons({ href }: { href: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <Link
        href={href}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "#1E439A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#fff";
        }}
        style={{
          ...PILL,
          background: "transparent",
          color: "#fff",
          border: "1.5px solid rgba(255,255,255,0.7)",
          cursor: "pointer",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        Με ενδιαφέρει
      </Link>
    </div>
  );
}
