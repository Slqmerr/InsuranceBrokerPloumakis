"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

// lucide-react removed its brand glyphs (Facebook/Linkedin) in this version,
// so the social marks are inline SVGs sized to match the contact-row icons.
function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const OFFICE_ADDRESS = "Κυδωνίας 8 & Ανδρεαδάκη, 71202 Ηράκλειο";
// Keyless Google Maps embed — geocodes the address server-side
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent("Κυδωνίας 8, Ηράκλειο 71202")}&z=17&hl=el&output=embed`;

export default function Footer() {
  return (
    <footer className="footer" style={{
      background: "#a30000",
      color: "#fff",
      padding: "64px 64px 32px",
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
    }}>

      {/* ── Top grid: contact column + location minimap ── */}
      <div className="footer-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "64px",
        paddingBottom: "48px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>

        {/* Column 1 — Logo + tagline */}
        <div>
          <img
            src="/logo_white-2.png"
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
            {/* Both numbers share one row — each stays its own tel: link */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px",
              }}
            >
              <Phone size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              <a href="tel:+302810326400" style={{ color: "inherit", textDecoration: "none" }}>
                2810 326 400
              </a>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <a href="tel:+306945021091" style={{ color: "inherit", textDecoration: "none" }}>
                6945 021 091
              </a>
            </div>
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
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px",
              }}
            >
              <Clock size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              Δευτέρα – Παρασκευή: 9:00 – 21:00
            </span>
          </div>

          {/* Social links — placeholder hrefs, swap when the real URLs are ready */}
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            {[
              { label: "Facebook", href: "REPLACE_WITH_FACEBOOK_URL", Icon: FacebookIcon },
              { label: "LinkedIn", href: "REPLACE_WITH_LINKEDIN_URL", Icon: LinkedinIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
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
          {[
            { label: "Πολιτική Απορρήτου", href: "#" },
            { label: "Όροι Χρήσης", href: "/oroi-xrisis" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
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
