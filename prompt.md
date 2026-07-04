# Task for Claude Code — Footer

Add a full-width footer to `app/page.tsx`. This is a **new section** appended at the very bottom of the page — do not move, delete, or restyle anything above it.

---

## 0. Setup — do this first

No new packages are needed. Confirm the following imports already exist at the top of `app/page.tsx` (they should after Round 3):

```tsx
import { motion } from "framer-motion";
import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
} from "lucide-react";
```

You will also need two Lucide icons that may not yet be imported. Add them to the existing import block if they're missing:

```tsx
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
```

---

## 1. Footer — Append at the Bottom of the Page

Add the following JSX **after** all existing sections (partners marquee, split sections, stats band — after everything) and **before** the closing `</main>` (or `</>` fragment) tag.

```tsx
<footer style={{
  background: "#0F2660",
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
        Εξατομικευμένες ασφαλιστικές λύσεις για ιδιώτες και επιχειρήσεις, με εμπειρία άνω των 20 ετών στη Λάρισα.
      </p>

      {/* Contact info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <a
          href="tel:+302410000000"
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
          2410 000 000
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
          Λάρισα, Θεσσαλία
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
      © {new Date().getFullYear()} Δημήτριος Πλουμάκης — Ασφαλιστικός Διαμεσολαβητής. Με επιφύλαξη παντός δικαιώματος.
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
```

---

## 2. Phone Number — Update Before Going Live

The phone number in the footer is currently a placeholder (`2410 000 000`). Before deploying to production, find this line in `app/page.tsx` and replace the number with the real one:

```tsx
href="tel:+302410000000"   // ← update this
...
2810 326 400               // ← and this display text
```

---

## Constraints

- Keep inline styles throughout — no Tailwind, no CSS modules
- Preserve all existing Greek copy exactly as written elsewhere in the file
- Do not touch any section above the footer
- `new Date().getFullYear()` is intentional — it keeps the copyright year current automatically, no manual update needed each year
- The `href="#"` on product links is a placeholder — these will be replaced with real routes once the individual product pages are built
- Run `npm run dev` and verify the footer renders at the bottom of the page with no layout shifts or overflow issues