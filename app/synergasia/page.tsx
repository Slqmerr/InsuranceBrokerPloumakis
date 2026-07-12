import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

export default function SynergasiaPage() {
  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%" }}>
      <Navbar />

      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "88px 24px 104px",
          textAlign: "center",
        }}
      >
        <h1
          className="page-title"
          style={{
            fontFamily: UBUNTU,
            fontSize: "36px",
            fontWeight: 700,
            color: "#a30000",
            margin: "0 0 28px",
          }}
        >
          Συνεργαστείτε μαζί μας
        </h1>

        <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#333", margin: "0 0 40px" }}>
          Αν είστε επαγγελματίας στον χώρο της ασφάλισης και αναζητάτε ένα δίκτυο συνεργασίας με
          τεχνογνωσία, υποστήριξη και σταθερές βάσεις, ο Δημήτριος Πλουμάκης σας καλωσορίζει να
          συζητήσετε μια συνεργασία. Με πάνω από 25 χρόνια εμπειρίας στον ασφαλιστικό κλάδο,
          προσφέρουμε στους συνεργάτες μας τεχνική υποστήριξη, πρόσβαση σε κορυφαίες ασφαλιστικές
          εταιρείες και ένα σταθερό πλαίσιο ανάπτυξης.
        </p>

        <Link
          href="/epikoinonia"
          style={{
            display: "inline-block",
            background: "#a30000",
            color: "#fff",
            fontWeight: 700,
            fontFamily: UBUNTU,
            padding: "14px 28px",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          Επικοινωνήστε μαζί μας
        </Link>
      </article>

      <Footer />
    </main>
  );
}
