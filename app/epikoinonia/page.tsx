import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "../components/Navbar";
import QuoteForm from "../components/QuoteForm";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

// General contact page — questions & appointment requests. Every generic
// "Κλείσε Ραντεβού" CTA (navbar, homepage hero, dropdown panels) lands here.
export default function EpikoinoniaPage() {
  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%", minHeight: "100vh" }}>
      <Navbar />

      {/* Red header band — breadcrumb + heading, matching the product hero style */}
      <section style={{ background: "#a30000", padding: "24px 64px 88px" }}>
        <nav
          aria-label="breadcrumb"
          className="fade-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: UBUNTU,
            fontSize: "13px",
            marginBottom: "36px",
          }}
        >
          <Link href="/" aria-label="Αρχική" style={{ display: "inline-flex", alignItems: "center", color: "rgba(255,255,255,0.75)" }}>
            <Home size={16} strokeWidth={1.9} />
          </Link>
          <ChevronRight size={14} strokeWidth={1.9} color="rgba(255,255,255,0.5)" />
          <span style={{ color: "#fff", fontWeight: 600 }}>Επικοινωνία</span>
        </nav>

        <h1 className="fade-up" style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2, animationDelay: "0.08s" }}>
          Κλείστε ραντεβού ή στείλτε μας την ερώτησή σας
        </h1>
        <p className="fade-up" style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", lineHeight: 1.6, margin: 0, maxWidth: "560px", animationDelay: "0.16s" }}>
          Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
        </p>
      </section>

      <div className="fade-up" style={{ animationDelay: "0.24s" }}>
        <QuoteForm
          slug="epikoinonia"
          productTitle="Επικοινωνία"
          categoryLabel=""
          subject="Επικοινωνία / Ραντεβού μέσω ιστοσελίδας"
        />
      </div>
    </main>
  );
}
