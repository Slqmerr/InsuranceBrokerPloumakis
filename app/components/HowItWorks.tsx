"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, Scale, ShieldCheck } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const STEPS = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Μιλήστε μαζί μας",
    text: "Μας λέτε τις ανάγκες και τις ανησυχίες σας. Ακούμε προσεκτικά και κατανοούμε τι θέλετε να προστατέψετε.",
  },
  {
    num: "02",
    icon: Scale,
    title: "Συγκρίνουμε για εσάς",
    text: "Αναζητούμε και συγκρίνουμε προσφορές από τις συνεργαζόμενες εταιρείες, για να βρούμε τη σωστή κάλυψη στη σωστή τιμή.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Σας στηρίζουμε διαρκώς",
    text: "Αναλαμβάνουμε τα πάντα — από τη σύναψη του συμβολαίου μέχρι την υποστήριξη σε κάθε αποζημίωση.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ background: "#fff", padding: "72px 64px" }}>
      

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#0F2660", margin: "0 0 48px", maxWidth: "620px", lineHeight: 1.25 }}
      >
        Απλά βήματα προς τη σωστή ασφάλιση
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
      >
        {STEPS.map((step) => (
          <motion.div
            key={step.num}
            variants={fadeUp}
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#f7f8fc",
              borderRadius: "20px",
              padding: "40px 28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Big watermark number */}
            <span style={{
              position: "absolute",
              top: "8px",
              right: "20px",
              fontFamily: UBUNTU,
              fontSize: "72px",
              fontWeight: 800,
              color: "#e4ebfb",
              lineHeight: 1,
              zIndex: 0,
              pointerEvents: "none",
            }}>
              {step.num}
            </span>

            {/* Icon circle */}
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#e8eef8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <step.icon size={26} color="#1E439A" strokeWidth={1.75} />
            </div>

            <h3 style={{ position: "relative", zIndex: 1, fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#0F2660", margin: 0, lineHeight: 1.3 }}>
              {step.title}
            </h3>
            <p style={{ position: "relative", zIndex: 1, color: "#555", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
              {step.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
