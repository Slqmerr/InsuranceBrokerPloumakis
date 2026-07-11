"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCardStrip from "./components/ProductCardStrip";
import PartnersMarquee from "./components/PartnersMarquee";
import Footer from "./components/Footer";
import WhyBroker from "./components/WhyBroker";
import HowItWorks from "./components/HowItWorks";
import MeetDimitrios from "./components/MeetDimitrios";

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
      <div style={{ padding: "112px 64px 96px", textAlign: "center" }}>
        
        <h2 style={{
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
          fontSize: "34px", fontWeight: 600, color: "#1a1a1a",
          maxWidth: "620px", lineHeight: 1.25, margin: "0 auto 16px",
        }}>
          Με δύναμη, εξειδίκευση και ειλικρίνεια στο πλευρό σας
        </h2>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.65, maxWidth: "540px", margin: "0 auto" }}>
          Φροντίζω ώστε η προστασία αυτών που αγαπάτε να είναι μια επένδυση που αποδίδει σε κάθε φάση της ζωής σας.
        </p>
      </div>

      {/* === WHY A BROKER === */}
      <WhyBroker />

      {/* ── SPLIT: Family — photo cut by the left edge, its curve carving into the colored band that fills the rest.
          No margin below: it butts against the mirrored Figurines split so the two bands read as one S-curve. ── */}
      <section style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
        {/* Colored band runs under the photo's curve all the way to the right edge */}
        <div aria-hidden style={{ position: "absolute", inset: "0 0 0 30%", background: "#f9efef" }} />
        <img
          src="/family.jpg"
          alt="Οικογένεια"
          style={{
            position: "relative",
            width: "100%", height: "480px", objectFit: "cover", objectPosition: "center 70%", display: "block",
            borderRadius: "0 240px 240px 0",
          }}
        />
        <div style={{
          position: "relative",
          minHeight: "480px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "48px 64px",
        }}>
          <div style={{ maxWidth: "460px" }}>
            
            <h3 style={{
              fontFamily: "var(--font-ubuntu-sans), sans-serif",
              fontSize: "30px", fontWeight: 600, color: "#a30000", lineHeight: 1.25, marginBottom: "16px",
            }}>
              Η οικογένειά σας αξίζει την καλύτερη κάλυψη
            </h3>
            <p style={{ fontSize: "15px", color: "#4a5568", lineHeight: 1.7, marginBottom: "24px" }}>
              Ζωή, υγεία, εισοδηματική προστασία.Σχεδιάζω ολοκληρωμένα πακέτα που φροντίζουν για κάθε μέλος της οικογένειάς σας, σε κάθε στιγμή.
            </p>
            <a href="/idiotes/oikogeneia" style={{ color: "#a30000", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
              Δείτε τα προϊόντα Οικογένειας →
            </a>
          </div>
        </div>
      </section>

      {/* ── SPLIT: Figurines — colored band fills up to the photo's curve, photo cut by the right edge ── */}
      <section style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
        {/* Colored band runs from the left edge under the photo's curve */}
        <div aria-hidden style={{ position: "absolute", inset: "0 30% 0 0", background: "#f9efef" }} />
        <div style={{
          position: "relative",
          minHeight: "480px",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end",
          padding: "48px 64px",
        }}>
          <div style={{ maxWidth: "460px" }}>
            
            <h3 style={{
              fontFamily: "var(--font-ubuntu-sans), sans-serif",
              fontSize: "30px", fontWeight: 600, color: "#a30000", lineHeight: 1.25, marginBottom: "16px",
            }}>
              Προστατέψτε αυτό που έχτισατε με κόπο
            </h3>
            <p style={{ fontSize: "15px", color: "#4a5568", lineHeight: 1.7, marginBottom: "24px" }}>
              Από το σπίτι και το αυτοκίνητο μέχρι την επιχείρησή σας.Καλύπτω όλους τους κλάδους με λύσεις που ταιριάζουν στις πραγματικές σας ανάγκες.
            </p>
            <a href="/idiotes/katoikia" style={{ color: "#a30000", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
              Δείτε τα προϊόντα Κατοικίας →
            </a>
          </div>
        </div>
        <img
          src="/figurines.jpg"
          alt="Περιουσία"
          style={{
            position: "relative",
            width: "100%", height: "480px", objectFit: "cover", display: "block",
            borderRadius: "240px 0 0 240px",
          }}
        />
      </section>

      {/* === HOW IT WORKS === */}
      <HowItWorks />

      {/* === MEET DIMITRIOS === */}
      <MeetDimitrios />

      {/* === PARTNERS === */}
      <PartnersMarquee />

      {/* ==== FOOTER =====*/}
      <Footer />

    </main>
  );
}
