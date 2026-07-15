"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCardStrip from "./components/ProductCardStrip";
import PartnersMarquee from "./components/PartnersMarquee";
import Footer from "./components/Footer";
import WhyBroker from "./components/WhyBroker";
import HowItWorks from "./components/HowItWorks";
import MeetDimitrios from "./components/MeetDimitrios";
import PartnershipCTA from "./components/PartnershipCTA";
import SplitFeature from "./components/SplitFeature";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* == NAVBAR + MEGA DROPDOWN == */}
      <Navbar/>

      {/* === HERO ===*/}
      <Hero/>

      {/* === PRODUCT CARD STRIP ===*/}
      <ProductCardStrip />

     
      {/* === WHY A BROKER === */}
      <WhyBroker />

      {/* ── SPLIT: Family — photo cut by the left edge, its curve carving into the colored band.
          Butts against the mirrored Figurines split so the two bands read as one S-curve. ── */}
      <SplitFeature
        imageSrc="/family.jpg"
        imageAlt="Οικογένεια"
        imagePosition="center 70%"
        title="Η οικογένειά σας αξίζει την καλύτερη κάλυψη"
        body="Ζωή, υγεία, εισοδηματική προστασία. Σχεδιάζω ολοκληρωμένα πακέτα που φροντίζουν για κάθε μέλος της οικογένειάς σας, σε κάθε στιγμή."
        ctaLabel="Δείτε τα προϊόντα Οικογένειας"
        ctaHref="/idiotes/oikogeneia"
      />

      {/* ── SPLIT: Figurines — mirrored, photo cut by the right edge ── */}
      <SplitFeature
        reverse
        imageSrc="/figurines.jpg"
        imageAlt="Περιουσία"
        title="Προστατέψτε αυτό που έχτισατε με κόπο"
        body="Από το σπίτι και το αυτοκίνητο μέχρι την επιχείρησή σας. Καλύπτω όλους τους κλάδους με λύσεις που ταιριάζουν στις πραγματικές σας ανάγκες."
        ctaLabel="Δείτε τα προϊόντα Κατοικίας"
        ctaHref="/idiotes/katoikia"
      />

      {/* === HOW IT WORKS === */}
      <HowItWorks />

      {/* === MEET DIMITRIOS === */}
      <MeetDimitrios />

      {/* === PARTNERSHIP CTA — last section === */}
      <PartnershipCTA />

      {/* ==== FOOTER =====*/}
      <Footer />

    </main>
  );
}
