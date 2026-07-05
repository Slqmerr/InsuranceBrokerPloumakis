"use client";

import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "#1E439A",
      color: "#fff",
      padding: "64px 64px 32px",
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
    }}>

      {/* ── Top grid: 4 columns ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
        gap: "48px",
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
              <MapPin size={15} strokeWidth={1.75} />
              Ηράκλειο,Κρήτης
            </span>
          </div>
        </div>

        {/* Column 2 — Ιδιώτες links */}
        <div>
          <h4 style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}>
            Ιδιώτες
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Υγεία" },
              { label: "Ζωή" },
              { label: "Κατοικία" },
              { label: "Αστική Ευθύνη" },
              { label: "Όχημα" },
              { label: "Επένδυση" },
              { label: "Κατοικίδιο" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >
                  <ChevronRight size={12} strokeWidth={2} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Επιχείρηση links */}
        <div>
          <h4 style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}>
          Επιχείρηση
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Επαγγελματικός Χώρος" },
              { label: "Αστική Ευθύνη" },
              { label: "Εταιρικά Οχήματα" },
              { label: "Cyber" },
              { label: "Ομαδική Ασφάλιση" },
              { label: "Μεταφορά Εμπορευμάτων" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >
                  <ChevronRight size={12} strokeWidth={2} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Partners */}
        <div>
          <h4 style={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}>
            Συνεργαζόμενες Εταιρείες
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Interamerican",
              "Allianz",
              "Generali",
              "AXA",
              "Eurolife",
              "Εθνική Ασφαλιστική",
            ].map((name) => (
              <li
                key={name}
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "14px",
                }}
              >
                {name}
              </li>
            ))}
          </ul>
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
