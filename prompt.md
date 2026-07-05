# Task for Claude Code — File 7: "Εμείς" / About Page

Create a new page at `app/emeis/page.tsx`. This is the About page for Dimitrios Ploumakis.

**Stack rules (same as always):** Inline styles only. No Tailwind. No CSS modules. Greek for all user-facing copy. English for code and file names.

---

## Page structure (top to bottom)

1. Navbar (import and render the existing Navbar component)
2. Hero section — split layout with bio placeholder
3. Credentials strip
4. Awards section
5. Footer (import and render the existing Footer component)

---

## Section 1 — Hero (split layout)

Full-width section, `min-height: 480px`, background `#1E439A`.

Use a **two-column flex layout** (`flexDirection: "row"`):

**Left column** (60% width) — text content:
```tsx
<section style={{
  display: "flex",
  flexDirection: "row",
  minHeight: "480px",
  background: "#1E439A",
}}>
  {/* Left: bio content */}
  <div style={{
    flex: "0 0 60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "80px 64px",
  }}>
    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", marginBottom: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
      Ο άνθρωπος πίσω από την ασφάλιση
    </p>
    <h1 style={{
      color: "#fff",
      fontFamily: "var(--font-ubuntu-sans), sans-serif",
      fontSize: "38px",
      fontWeight: 700,
      lineHeight: 1.2,
      margin: "0 0 24px",
    }}>
      Δημήτριος Πλουμάκης
    </h1>

    {/*
      ⚠️ BIO PLACEHOLDER — DO NOT FILL THIS IN YET.
      Leave the following <p> block exactly as shown below.
      The actual bio text will be provided separately by the client.
      Keep the placeholder style so it is visually distinct during dev.
    */}
    <p style={{
      color: "rgba(255,255,255,0.55)",
      fontSize: "15px",
      lineHeight: 1.7,
      fontStyle: "italic",
      border: "1px dashed rgba(255,255,255,0.3)",
      padding: "16px",
      borderRadius: "8px",
      maxWidth: "480px",
    }}>
      [Βιογραφικό κείμενο — αναμένεται από τον πελάτη]
    </p>

    <div style={{ display: "flex", gap: "32px", marginTop: "40px" }}>
      <div>
        <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>25+</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Χρόνια εμπειρίας</div>
      </div>
      <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
      <div>
        <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>12+</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Εθνικές διακρίσεις</div>
      </div>
      <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
      <div>
        <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>6</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Συνεργαζόμενες εταιρείες</div>
      </div>
    </div>
  </div>

  {/* Right column: 40% width — photo of Dimitrios */}
  <div style={{
    flex: "0 0 40%",
    overflow: "hidden",
    position: "relative",
  }}>
    <img
      src="/dimitrios.jpg"
      alt="Δημήτριος Πλουμάκης"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
      }}
    />
    {/* subtle dark gradient on the left edge to blend with blue bg */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to right, rgba(30,67,154,0.5) 0%, transparent 40%)",
    }} />
  </div>
</section>
```

---

## Section 2 — Credentials strip

White background, centered content. Two credential cards side by side.

```tsx
<section style={{
  background: "#fff",
  padding: "64px 64px",
}}>
  <p style={{ color: "#1E439A", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
    Εκπαίδευση & Πιστοποιήσεις
  </p>
  <h2 style={{
    fontFamily: "var(--font-ubuntu-sans), sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#0F2660",
    marginBottom: "40px",
  }}>
    Διεθνώς αναγνωρισμένες πιστοποιήσεις
  </h2>

  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>

    {/* Credential card 1 */}
    <div style={{
      flex: "1 1 300px",
      border: "1px solid #e0e6f0",
      borderRadius: "12px",
      padding: "32px",
      borderLeft: "4px solid #1E439A",
    }}>
      <div style={{ color: "#1E439A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
        LIMRA · Windsor, Connecticut, U.S.A.
      </div>
      <h3 style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", fontSize: "17px", fontWeight: 700, color: "#0F2660", margin: "0 0 8px" }}>
        Management Skills Seminar
      </h3>
      <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, margin: "0 0 12px" }}>
        Διεθνές σεμινάριο διοίκησης πωλήσεων ασφαλιστικής, παρεχόμενο από τον παγκόσμιο οργανισμό LIMRA — έναν από τους πιο έγκυρους φορείς επαγγελματικής κατάρτισης στον ασφαλιστικό κλάδο ανά τον κόσμο.
      </p>
      <div style={{ color: "#888", fontSize: "12px" }}>Φεβρουάριος 2012 · International Life, Ελλάδα</div>
    </div>

    {/* Credential card 2 */}
    <div style={{
      flex: "1 1 300px",
      border: "1px solid #e0e6f0",
      borderRadius: "12px",
      padding: "32px",
      borderLeft: "4px solid #1E439A",
    }}>
      <div style={{ color: "#1E439A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
        LIMRA · EIAS (Ελληνικό Ινστιτούτο Ασφαλιστικών Σπουδών)
      </div>
      <h3 style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", fontSize: "17px", fontWeight: 700, color: "#0F2660", margin: "0 0 8px" }}>
        Creating Clients: Moving from Sales to Market Development
      </h3>
      <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, margin: "0 0 12px" }}>
        Εξειδικευμένο πρόγραμμα ανάπτυξης αγοράς και στρατηγικής απόκτησης πελατών, σε συνεργασία με το EIAS — τον επίσημο εκπαιδευτικό φορέα του ασφαλιστικού κλάδου στην Ελλάδα.
      </p>
      <div style={{ color: "#888", fontSize: "12px" }}>Νοέμβριος 2013 · EIAS, Ελλάδα</div>
    </div>

  </div>
</section>
```

---

## Section 3 — Awards

Light background (`#F5F7FB`), full-width.

```tsx
<section style={{
  background: "#F5F7FB",
  padding: "64px 64px",
}}>
  <p style={{ color: "#1E439A", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
    Διακρίσεις
  </p>
  <h2 style={{
    fontFamily: "var(--font-ubuntu-sans), sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#0F2660",
    marginBottom: "12px",
  }}>
    Αναγνώριση σε εθνικό επίπεδο
  </h2>
  <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.6, maxWidth: "600px", marginBottom: "48px" }}>
    Για πάνω από μια δεκαετία, ο Δημήτριος Πλουμάκης βραβεύθηκε επανειλημμένα στα Πανελλήνια Συνέδρια Πωλήσεων, ανακηρύσσoντας τον ανάμεσα στους κορυφαίους ασφαλιστές της χώρας.
  </p>

  {/* Awards grid */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>

    {[
      { year: "2000", rank: "5ο βραβείο", category: "Ασφαλίστρων Κανονισμού", event: "31ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2002", rank: "3ο βραβείο", category: "Διατηρησιμότητας", event: "33ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2003", rank: "5ο βραβείο", category: "Κανονισμού Πωλήσεων", event: "Ημερίδα Βραβεύσεων, Αθήνα" },
      { year: "2005", rank: "4ο βραβείο", category: "Κανονισμού Πωλήσεων", event: "36ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2006", rank: "3ο βραβείο", category: "Παραγωγής Γενικών", event: "36ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2006", rank: "5ο βραβείο", category: "Παραγωγής Ζωής", event: "36ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2007", rank: "5ο βραβείο", category: "Παραγωγής Γενικών", event: "37ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2007", rank: "5ο βραβείο", category: "Παραγωγής Ζωής", event: "37ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2008", rank: "6ο βραβείο", category: "Παραγωγής Γενικών", event: "37ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2012", rank: "4ο βραβείο", category: "Παραγωγής Γενικών", event: "39ο Πανελλήνιο Συνέδριο Πωλήσεων" },
      { year: "2013", rank: "2ο βραβείο", category: "Παραγωγής Γενικών", event: "39ο Πανελλήνιο Συνέδριο, Costa Navarino" },
      { year: "2025", rank: "Loyalty Award", category: "Sales Awards 2025", event: "NOW Insurance Group" },
    ].map((award, i) => (
      <div key={i} style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            background: "#EEF2FF",
            color: "#1E439A",
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "999px",
          }}>{award.year}</span>
          <span style={{ color: "#1E439A", fontWeight: 700, fontSize: "13px" }}>{award.rank}</span>
        </div>
        <div style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", fontWeight: 600, fontSize: "15px", color: "#0F2660" }}>
          {award.category}
        </div>
        <div style={{ color: "#888", fontSize: "12px" }}>{award.event}</div>
      </div>
    ))}

  </div>

  {/* Context note */}
  <p style={{ color: "#777", fontSize: "13px", marginTop: "32px", fontStyle: "italic" }}>
    Όλα τα παραπάνω βραβεία απονεμήθηκαν από τον Όμιλο International Life στα ετήσια Πανελλήνια Συνέδρια Πωλήσεων, όπου αξιολογούνται όλοι οι ασφαλιστές και Unit Managers της χώρας.
  </p>
</section>
```

---

## Constraints

- Inline styles only — no Tailwind, no CSS modules
- Import Navbar and Footer from their existing component files
- Do NOT invent bio text — leave the placeholder exactly as written above
- All text copy is final and in Greek — do not translate or modify
- Run `npm run dev` and confirm the page renders at `/emeis`