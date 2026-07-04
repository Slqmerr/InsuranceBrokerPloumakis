"use client";

import { PRODUCT_CARDS } from "./products";

export default function ProductCardStrip() {
  return (
    <div style={{
      background: "#fff",
      boxShadow: "0 12px 40px rgba(18,35,85,0.12)",
      borderRadius: "24px",
      margin: "-48px 52px 0",
      position: "relative",
      zIndex: 10,
      padding: "40px 48px",
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "8px",
    }}>
      {PRODUCT_CARDS.map((card) => (
        <div
          key={card.title}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "20px 8px",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4ff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "#e8eef8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <card.icon size={22} color="#1E439A" strokeWidth={1.75} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#888", fontSize: "11px" }}>Λύσεις για</div>
            <div style={{
              color: "#1E439A",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "var(--font-ubuntu-sans), sans-serif",
            }}>
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
