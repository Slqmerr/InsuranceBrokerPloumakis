"use client";

import { Phone, Mail, MapPin } from "lucide-react";

const OFFICE_ADDRESS = "Κυδωνίας 8 & Ανδρεαδάκη, 71202 Ηράκλειο";
// Keyless Google Maps embed — geocodes the address server-side
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent("Κυδωνίας 8, Ηράκλειο 71202")}&z=17&hl=el&output=embed`;

export default function Footer() {
  return (
    <footer style={{
      background: "#c1272d",
      color: "#fff",
      padding: "64px 64px 32px",
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
    }}>

      {/* ── Top grid: contact column + location minimap ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "64px",
        paddingBottom: "48px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>

        {/* Column 1 — Logo + tagline */}
        <div>
          <img
            src="/logo.png"
            alt="Δημήτριος Πλουμάκης"
            style={{
              height: "56px",
              objectFit: "contain",
              marginBottom: "20px",
              display: "block",
            }}
          />
          <p style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "14px",
            lineHeight: 1.7,
            maxWidth: "280px",
            margin: "0 0 24px",
          }}>
            Εξατομικευμένες ασφαλιστικές λύσεις για ιδιώτες και επιχειρήσεις, με εμπειρία άνω των 20 ετών στην Κρήτη.
          </p>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a
              href="tel:+302810326400"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              <Phone size={15} strokeWidth={1.75} />
              2810 326 400
            </a>
            <a
              href="mailto:dploumakis@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              <Mail size={15} strokeWidth={1.75} />
              dploumakis@gmail.com
            </a>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px",
              }}
            >
              <MapPin size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              {OFFICE_ADDRESS}
            </span>
          </div>
        </div>

        {/* Column 2 — Location minimap */}
        <div>
          <h4 style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}>
            Πού θα μας βρείτε
          </h4>
          <iframe
            src={MAP_EMBED_SRC}
            title={`Χάρτης — ${OFFICE_ADDRESS}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              width: "100%",
              height: "260px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* ── Bottom bar: copyright + legal links ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "28px",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          margin: 0,
        }}>
          © {new Date().getFullYear()} Δημήτριος Πλουμάκης — Ασφαλιστικός Πράκτορας. Με επιφύλαξη παντός δικαιώματος.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Πολιτική Απορρήτου", "Όροι Χρήσης"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
