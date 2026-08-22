"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/public/logo_white-2.png";
import mapStill from "@/public/map-office.webp";
import { OFFICE_ADDRESS, OFFICE_EMAIL, OFFICE_HOURS_LABEL, OFFICE_PHONES } from "../siteMeta";

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

// Keyless Google Maps embed — geocodes the address server-side.
// Only mounted once the visitor asks for the live map: the embed pulls well over
// a megabyte of third-party JS, so the footer ships a self-hosted still instead
// (public/map-office.webp — OpenStreetMap tiles at z18, centred on the office).
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent("Κυδωνίας 8, Ηράκλειο 71202")}&z=17&hl=el&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`;

export default function Footer() {
  const [liveMap, setLiveMap] = useState(false);
  const [mapHover, setMapHover] = useState(false);

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
          <Image
            src={logo}
            alt="Δημήτριος Πλουμάκης"
            // 56px tall at a 2.45 ratio ≈ 137px wide
            sizes="140px"
            style={{
              height: "56px",
              width: "auto",
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
              <a href={`tel:${OFFICE_PHONES[0].tel}`} style={{ color: "inherit", textDecoration: "none" }}>
                {OFFICE_PHONES[0].display}
              </a>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <a href={`tel:${OFFICE_PHONES[1].tel}`} style={{ color: "inherit", textDecoration: "none" }}>
                {OFFICE_PHONES[1].display}
              </a>
            </div>
            <a
              href={`mailto:${OFFICE_EMAIL}`}
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
              {OFFICE_EMAIL}
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
              {OFFICE_HOURS_LABEL}
            </span>
          </div>

          {/* Social links — placeholder hrefs, swap when the real URLs are ready */}
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            {[
              { label: "Facebook", href: "https://www.facebook.com/dploumakis", Icon: FacebookIcon },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/dimitrios-ploumakis-9b0b98104/", Icon: LinkedinIcon },
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
          <div style={{
            position: "relative",
            height: "260px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
          }}>
            {liveMap ? (
              <iframe
                src={MAP_EMBED_SRC}
                title={`Χάρτης — ${OFFICE_ADDRESS}`}
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            ) : (
              <>
                <Image
                  src={mapStill}
                  alt={`Χάρτης — ${OFFICE_ADDRESS}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 700px"
                  placeholder="blur"
                  style={{
                    objectFit: "cover",
                    transform: mapHover ? "scale(1.04)" : "none",
                    transition: "transform 0.4s ease",
                  }}
                />

                {/* Full-card hit target — swaps in the real Google embed on demand */}
                <button
                  type="button"
                  onClick={() => setLiveMap(true)}
                  onMouseEnter={() => setMapHover(true)}
                  onMouseLeave={() => setMapHover(false)}
                  aria-label="Φόρτωση διαδραστικού χάρτη"
                  title="Φόρτωση διαδραστικού χάρτη"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    padding: 0,
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  {/* Pin tip sits on the office — the still is centred on it */}
                  <span style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -100%)",
                    filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))",
                    lineHeight: 0,
                  }}>
                    <svg width="30" height="35" viewBox="0 0 24 28" aria-hidden="true">
                      <path
                        d="M12 1.5c-4.7 0-8.5 3.8-8.5 8.5 0 6.2 8.5 16.5 8.5 16.5s8.5-10.3 8.5-16.5c0-4.7-3.8-8.5-8.5-8.5Z"
                        fill="#a30000"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="10" r="3.4" fill="#fff" />
                    </svg>
                  </span>
                </button>

                {/* Bottom bar sits above the hit target so the link wins the click */}
                <div style={{
                  position: "absolute",
                  insetInline: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "28px 12px 10px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  pointerEvents: "none",
                }}>
                  <a
                    href={MAP_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 12px",
                      borderRadius: "999px",
                      background: "#fff",
                      color: "#a30000",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      pointerEvents: "auto",
                    }}
                  >
                    <MapPin size={14} strokeWidth={2} />
                    Οδηγίες
                  </a>
                  <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "11px",
                      textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                      textDecoration: "none",
                      pointerEvents: "auto",
                    }}
                  >
                    © OpenStreetMap
                  </a>
                </div>
              </>
            )}
          </div>
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
            { label: "Πολιτική Απορρήτου", href: "/politiki-aporritou" },
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
