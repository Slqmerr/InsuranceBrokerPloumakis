"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, Handshake, LifeBuoy, Wallet } from "lucide-react";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const REASONS = [
  {
    icon: Compass,
    title: "Ανεξάρτητη καθοδήγηση",
    text: "Δεν δεσμευόμαστε από μία εταιρεία. Συγκρίνω προϊόντα από κορυφαίες ασφαλιστικές και προτείνω ό,τι ταιριάζει πραγματικά σε εσάς.",
  },
  {
    icon: Handshake,
    title: "Ένας συνεργάτης για όλα",
    text: "Υγεία, κατοικία, όχημα, επιχείρηση. Όλες οι ασφαλίσεις σας από έναν έμπιστο άνθρωπο.",
  },
  {
    icon: LifeBuoy,
    title: "Στο πλευρό σας στην αποζημίωση",
    text: "Όταν συμβεί το απρόοπτο, είμαι εκεί. Αναλαμβάνω τη διαδικασία μαζί σας και φροντίζω να λάβετε ό,τι δικαιούστε.",
  },
  {
    icon: Wallet,
    title: "Χωρίς επιπλέον κόστος",
    text: "Η καθοδήγηση και η υποστήριξή μας δεν επιβαρύνουν το ασφάλιστρό σας. Κερδίζετε έναν σύμβουλο, χωρίς κρυφές χρεώσεις.",
  },
];

export default function WhyBroker() {
  return (
    <section style={{ background: "#fdf6f6", padding: "72px 64px" }}>
      
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#7a1519", margin: "0 0 12px", maxWidth: "620px", lineHeight: 1.25 }}
      >
        Γιατί να με εμπιστευτείτε;
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ color: "#555", fontSize: "16px", lineHeight: 1.65, maxWidth: "620px", margin: "0 0 48px" }}
      >
        Ένας ασφαλιστικός πράκτορας δεν πουλά απλώς ασφάλειες , σας βοηθά να επιλέξετε σωστά. Να τι σημαίνει αυτό για εσάς:
      </motion.p>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}
      >
        {REASONS.map((r) => (
          <motion.div
            key={r.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px 28px",
              boxShadow: "0 12px 40px rgba(122,21,25,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#fbe9ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <r.icon size={26} color="#c1272d" strokeWidth={1.75} />
            </div>
            <h3 style={{ fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#7a1519", margin: 0, lineHeight: 1.3 }}>
              {r.title}
            </h3>
            <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
              {r.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
