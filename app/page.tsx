"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCardStrip from "./components/ProductCardStrip";
import PartnersMarquee from "./components/PartnersMarquee";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* == NAVBAR + MEGA DROPDOWN == */}
      <Navbar/>

      {/* === HERO ===*/}
      <Hero/>

      {/* === PRODUCT CARD STRIP ===*/}
      <ProductCardStrip />

      {/* == INTRO == */}
      <div style={{ padding: "64px 52px 32px" }}>

        <h2 style={{
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
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

          <h3 style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", fontSize: "28px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25 }}>
            Η οικογένειά σας αξίζει την καλύτερη κάλυψη
          </h3>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7 }}>
            Ζωή, υγεία, εισοδηματική προστασία — σχεδιάζω ολοκληρωμένα πακέτα που φροντίζουν για κάθε μέλος της οικογένειάς σας, σε κάθε στιγμή.
          </p>
          <a href="#" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Δείτε τα προϊόντα Οικογένειας 
          </a>
        </div>
      </div>

      {/* ── SPLIT: Figurines ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px", background: "#f7f8fc" }}>
        <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>

          <h3 style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", fontSize: "28px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.25 }}>
            Προστατέψτε αυτό που έχτισατε με κόπο
          </h3>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.7 }}>
            Από το σπίτι και το αυτοκίνητο μέχρι την επιχείρησή σας — καλύπτω όλους τους κλάδους με λύσεις που ταιριάζουν στις πραγματικές σας ανάγκες.
          </p>
          <a href="#" style={{ color: "#1E439A", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Δείτε τα προϊόντα Περιουσίας 
          </a>
        </div>
        <img src="/figurines.jpg" alt="figurines" style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "200px", borderBottomLeftRadius: "200px", display: "block" }} />
      </div>

      {/* ==== PARTNERS MARQUEE ==== */}
      <PartnersMarquee/>

      {/* ==== FOOTER =====*/}
      <Footer />

    </main>
  );
}
