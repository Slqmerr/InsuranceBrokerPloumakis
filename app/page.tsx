"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-inter), sans-serif", background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "#7587b1",
        display: "flex",
        alignItems: "center",
        padding: "0 36px",
        height: "88px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Δημήτριος Πλουμάκης"
            style={{ height: "60px", objectFit: "contain" }}
          />
        </div>
        <ul style={{ display: "flex", alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0 }}>
          {["Ιδιώτες", "Επιχείρηση", "Εμείς"].map((link) => (
            <li key={link}>
              <a href="#" style={{
                color: "rgba(255,255,255,0.80)",
                textDecoration: "none",
                fontSize: "13px",
                padding: "6px 12px",
                borderRadius: "4px",
                display: "inline-block",
              }}>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ flex: 1 }} />
      </nav>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "520px", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Background photos grid */}
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1.1fr 0.55fr 0.55fr" }}>
        </div>

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(18,35,85,0.83) 0%, rgba(18,35,85,0.52) 48%, rgba(18,35,85,0.15) 100%)",
        }} />

        {/* Text content */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 52px", maxWidth: "520px" }}>
          
          <h1 style={{
            fontFamily: "'Century Gothic', 'Gill Sans', sans-serif",
            fontSize: "38px", fontWeight: 600, color: "#fff",
            lineHeight: 1.22, marginBottom: "18px", letterSpacing: "-0.5px",
          }}>
            Προστατεύουμε<br />ό,τι <span style={{ color: "#a8bfff" }}>αγαπάτε</span><br />περισσότερο
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.78)", lineHeight: 1.65, marginBottom: "32px", maxWidth: "380px" }}>
            Εξατομικευμένες ασφαλιστικές λύσεις για εσάς, την οικογένεια και την επιχείρησή σας. Εμπιστοσύνη και αξιοπιστία για πάνω από 20 χρόνια.
          </p>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            
            
          </div>
        </div>

      </div>

      {/* ── INTRO ── */}
      <div style={{ padding: "64px 52px 32px" }}>
        
        <h2 style={{
          fontFamily: "'Century Gothic','Gill Sans',sans-serif",
          fontSize: "32px", fontWeight: 600, color: "#1a1a1a",
          maxWidth: "600px", lineHeight: 1.25, marginBottom: "12px",
        }}>
          Με δύναμη, εξειδίκευση και ειλικρίνεια στο πλευρό σας
        </h2>
        <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65, maxWidth: "600px" }}>
          Φροντίζω ώστε η προστασία αυτών που αγαπάτε να είναι μια επένδυση που αποδίδει — σε κάθε φάση της ζωής σας.
        </p>
      </div>

      

      {/* ── SPLIT: Family ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }}>
        <img src="/family.jpg" alt="family" style={{width: "100%", height: "100%", objectFit: "cover", clipPath: "inset(400px 0 0 0 round 0 100px 100px 0)", display: "block" }} />
        <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>

          <h3 style={{ fontFamily: "'Century Gothic','Gill Sans',sans-serif", fontSize: "28px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25 }}>
            Η οικογένειά σας αξίζει την καλύτερη κάλυψη
          </h3>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7 }}>
            Ζωή, υγεία, εισοδηματική προστασία — σχεδιάζω ολοκληρωμένα πακέτα που φροντίζουν για κάθε μέλος της οικογένειάς σας, σε κάθε στιγμή.
          </p>
          <a href="#" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Δείτε τα προϊόντα Οικογένειας →
          </a>
        </div>
      </div>

      {/* ── SPLIT: Figurines ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px", background: "#f7f8fc" }}>
        <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
          
          <h3 style={{ fontFamily: "'Century Gothic','Gill Sans',sans-serif", fontSize: "28px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25 }}>
            Προστατέψτε αυτό που έχτισατε με κόπο
          </h3>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7 }}>
            Από το σπίτι και το αυτοκίνητο μέχρι την επιχείρησή σας — καλύπτω όλους τους κλάδους με λύσεις που ταιριάζουν στις πραγματικές σας ανάγκες.
          </p>
          <a href="#" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Δείτε τα προϊόντα Περιουσίας →
          </a>
        </div>
        <img src="/figurines.jpg" alt="figurines" style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "200px", borderBottomLeftRadius: "200px", display: "block" }} />
      </div>

      {/* ── STATS BAND ── */}
      <div style={{
        background: "#1E439A", padding: "52px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      }}>
        {[
          { num: "20+", label: "Χρόνια στην ασφαλιστική αγορά" },
          { num: "500+", label: "Ικανοποιημένοι πελάτες" },
          { num: "15+", label: "Συνεργαζόμενες ασφαλιστικές" },
          { num: "24/7", label: "Υποστήριξη & εξυπηρέτηση" },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: "0 24px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
          }}>
            <div style={{ fontFamily: "'Century Gothic','Gill Sans',sans-serif", fontSize: "42px", fontWeight: 600, color: "#fff" }}>{stat.num}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

    </main>
  );
}