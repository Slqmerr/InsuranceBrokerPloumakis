"use client";

import Hero from "./components/Hero";
import ProductCardStrip from "./components/ProductCardStrip";
import Footer from "./components/Footer";
import WhyBroker from "./components/WhyBroker";
import HowItWorks from "./components/HowItWorks";
import MeetDimitrios from "./components/MeetDimitrios";
import PartnershipCTA from "./components/PartnershipCTA";
import SplitFeature from "./components/SplitFeature";
import familyPhoto from "@/public/family.jpg";
// Unsplash — Moses Malik Roldan (@mosesmroldan), photo DGDZizsR5IQ
import housePhoto from "@/public/house.jpg";

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* == NAVBAR + MEGA DROPDOWN == */}

      {/* === HERO ===*/}
      <Hero/>

      {/* === PRODUCT CARD STRIP ===*/}
      <ProductCardStrip />

     
      {/* === WHY A BROKER === */}
      <WhyBroker />

      {/* ── SPLIT: Family — photo cut by the left edge, its curve carving into the colored band.
          Butts against the mirrored House split so the two bands read as one S-curve. ── */}
      <SplitFeature
        imageSrc={familyPhoto}
        imageAlt="Οικογένεια"
        imagePosition="center 70%"
        title="Η οικογένειά σας αξίζει την καλύτερη κάλυψη"
        body="Κανείς δεν σχεδιάζει τα δύσκολα. Φροντίζουμε ζωή, υγεία και εισόδημα — ώστε, αν έρθουν, να μη βρουν κανέναν απροετοίμαστο."
        ctaLabel="Δείτε τα προϊόντα Οικογένειας"
        ctaHref="/idiotes/oikogeneia"
      />

      {/* ── SPLIT: House — mirrored, photo cut by the right edge ── */}
      <SplitFeature
        reverse
        imageSrc={housePhoto}
        imageAlt="Οικογενειακή κατοικία"
        title="Προστατέψτε αυτό που χτίσατε με κόπο"
        body="Το σπίτι σας δεν είναι απλώς ένα ακίνητο. Το ασφαλίζουμε σωστά ώστε μια ζημιά να μην σας γυρίσει χρόνια πίσω."
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
