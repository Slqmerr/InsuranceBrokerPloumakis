"use client";

import React from "react";
import { motion, animate, useInView, type Variants } from "framer-motion";
import { Trophy } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnersMarquee from "../components/PartnersMarquee";
const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

/* ── Shared animation variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* Timeline entry pieces */
const dateSlide: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contentSlide: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

const dotPop: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring", stiffness: 320, damping: 16, delay: 0.15 } },
};

const lineGrow: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: "easeOut", delay: 0.3 } },
};

/* Animated count-up for hero stats */
function StatValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* Awards data — lifted out so the summary card can compute totals from it */
type AwardEntry = {
  year: string;
  month?: string;
  event: string;
  awards: { rank: string; category: string }[];
};

const AWARD_ENTRIES: AwardEntry[] = [
  { month: "Μάρτιος", year: "2000", event: "31ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [{ rank: "5ο βραβείο", category: "Κανονισμού Πωλήσεων" }] },
  { month: "Μάρτιος", year: "2002", event: "33ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [{ rank: "3ο βραβείο", category: "Διατηρησιμότητας" }] },
  { month: "Μάρτιος", year: "2003", event: "Ημερίδα Βραβεύσεων, Αθήνα", awards: [{ rank: "5ο βραβείο", category: "Κανονισμού Πωλήσεων" }] },
  { month: "Μάρτιος", year: "2005", event: "36ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [{ rank: "4ο βραβείο", category: "Κανονισμού Πωλήσεων" }] },
  {
    month: "Σεπτέμβριος", year: "2006", event: "36ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [
      { rank: "3ο βραβείο", category: "Παραγωγής Γενικών" },
      { rank: "5ο βραβείο", category: "Παραγωγής Ζωής" },
    ]
  },
  {
    month: "Μάρτιος", year: "2007", event: "37ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [
      { rank: "5ο βραβείο", category: "Παραγωγής Γενικών" },
      { rank: "5ο βραβείο", category: "Παραγωγής Ζωής" },
    ]
  },
  { month: "Μάρτιος", year: "2008", event: "37ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [{ rank: "6ο βραβείο", category: "Παραγωγής Γενικών" }] },
  { month: "Μάρτιος", year: "2012", event: "39ο Πανελλήνιο Συνέδριο Πωλήσεων", awards: [{ rank: "4ο βραβείο", category: "Παραγωγής Γενικών" }] },
  { month: "Μάρτιος", year: "2013", event: "39ο Πανελλήνιο Συνέδριο, Costa Navarino", awards: [{ rank: "2ο βραβείο", category: "Παραγωγής Γενικών" }] },
  { year: "2025", event: "NOW Insurance Group", awards: [{ rank: "Loyalty Award", category: "Sales Awards 2025" }] },
];

const TOTAL_AWARDS = AWARD_ENTRIES.reduce((n, e) => n + e.awards.length, 0);
const AWARD_CATEGORY_COUNTS = Object.entries(
  AWARD_ENTRIES.flatMap((e) => e.awards).reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);

export default function EmeisPage() {
  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* == NAVBAR == */}
      <Navbar />

      {/* === HERO: split layout === */}
      <section style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "480px",
        background: "#1E439A",
        overflow: "hidden",
      }}>
        {/* Left: bio content — staggered entrance */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            flex: "0 0 60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 64px",
          }}
        >
          <motion.h1
            variants={fadeUp}
            style={{
              color: "#fff",
              fontFamily: UBUNTU,
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 24px",
            }}
          >
            Δημήτριος Πλουμάκης
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              color: "rgba(255, 255, 255, 0.95)",
              fontSize: "15px",
              lineHeight: 1.7,
              fontStyle: "italic",
              border: "1px dashed rgba(255,255,255,0.3)",
              padding: "16px",
              borderRadius: "8px",
              maxWidth: "480px",
            }}
          >
            Δραστηριοποιούμαι στον χώρο της ασφαλιστικής αγοράς με σταθερή πορεία στον κλάδο από το 1999 και εξειδικεύομαι στο Sales Management από το 2004. Σήμερα, από τη θέση του Επιθεωρητή Πωλήσεων στη NOW INSURANCE GROUP, εστιάζω στην στρατηγική ανάπτυξη δικτύων, την καθοδήγηση ομάδων και την επίτευξη υψηλών εταιρικών στόχων. Με ισχυρό ακαδημαϊκό υπόβαθρο στις Ανθρωπιστικές Επιστήμες και άριστη γνώση τριών ξένων γλωσσών (Αγγλικά, Ιταλικά, Ισπανικά), συνδυάζω τις εξαιρετικές επικοινωνιακές δεξιότητες με την αποτελεσματικότητα στον επιχειρηματικό στίβο.
          </motion.p>

          {/* Stats — count up when they enter view */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "32px", marginTop: "40px" }}>
            {[
              { value: 25, suffix: "+", label: "Χρόνια εμπειρίας" },
              { value: 12, suffix: "+", label: "Διακρίσεις" },
              { value: 15, suffix: "+", label: "Συνεργαζόμενες εταιρείες" },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <div>
                  <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700, fontFamily: UBUNTU }}>
                    <StatValue value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{stat.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 + i * 0.15 }}
                    style={{ width: "1px", background: "rgba(255,255,255,0.2)", transformOrigin: "top" }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column: 40% width — photo of Dimitrios, slides in */}
        <div style={{
          flex: "0 0 40%",
          overflow: "hidden",
          position: "relative",
        }}>
          <motion.img
            src="/dimitrios.jpg"
            alt="Δημήτριος Πλουμάκης"
            initial={{ opacity: 0, scale: 1.12, x: 48 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          {/* subtle dark gradient on the left edge to blend with blue bg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(30,67,154,0.5) 0%, transparent 40%)",
            }}
          />
        </div>
      </section>

      {/* === CREDENTIALS STRIP === */}
      <section style={{
        background: "#fff",
        padding: "64px 64px",
      }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: UBUNTU,
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F2660",
            marginBottom: "40px",
          }}
        >
          Διεθνώς αναγνωρισμένες πιστοποιήσεις
        </motion.h2>

        {/* Minimal timeline — date first, then organization */}
        <div style={{ maxWidth: "860px" }}>
          {[
            {
              month: "Φεβρουάριος",
              year: "2012",
              org: "LIMRA · Windsor, Connecticut, U.S.A.",
              title: "Management Skills Seminar",
              description: "Διεθνές σεμινάριο διοίκησης πωλήσεων ασφαλιστικής, παρεχόμενο από τον παγκόσμιο οργανισμό LIMRA — έναν από τους πιο έγκυρους φορείς επαγγελματικής κατάρτισης στον ασφαλιστικό κλάδο ανά τον κόσμο.",
              note: "International Life, Ελλάδα",
            },
            {
              month: "Νοέμβριος",
              year: "2013",
              org: "LIMRA · EIAS (Ελληνικό Ινστιτούτο Ασφαλιστικών Σπουδών)",
              title: "Creating Clients: Moving from Sales to Market Development",
              description: "Εξειδικευμένο πρόγραμμα ανάπτυξης αγοράς και στρατηγικής απόκτησης πελατών, σε συνεργασία με το EIAS — τον επίσημο εκπαιδευτικό φορέα του ασφαλιστικού κλάδου στην Ελλάδα.",
              note: "EIAS, Ελλάδα",
            },
          ].map((item, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                style={{ display: "grid", gridTemplateColumns: "150px 56px 1fr" }}
              >

                {/* Date — slides in from the left */}
                <motion.div variants={dateSlide} style={{ textAlign: "right", paddingTop: "2px" }}>
                  <div style={{ color: "#888", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
                    {item.month}
                  </div>
                  <div style={{ fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, color: "#1E439A", lineHeight: 1.1 }}>
                    {item.year}
                  </div>
                </motion.div>

                {/* Divider — dot pops, line grows downward */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div
                    variants={dotPop}
                    whileHover={{ scale: 1.5 }}
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      border: "2px solid #1E439A",
                      background: "#fff",
                      boxShadow: "0 0 0 5px #EEF2FF",
                      marginTop: "8px",
                      flexShrink: 0,
                    }}
                  />
                  <motion.div
                    variants={lineGrow}
                    style={{
                      width: "1px",
                      flex: 1,
                      marginTop: "10px",
                      transformOrigin: "top",
                      background: isLast
                        ? "linear-gradient(to bottom, #C9D4EC 0%, transparent 90%)"
                        : "linear-gradient(to bottom, #C9D4EC 0%, #C9D4EC 70%, rgba(201,212,236,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Content — slides in from the right */}
                <motion.div
                  variants={contentSlide}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ paddingBottom: isLast ? "8px" : "56px", paddingTop: "4px" }}
                >
                  <div style={{ color: "#1E439A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                    {item.org}
                  </div>
                  <h3 style={{ fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#0F2660", margin: "0 0 8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65, margin: "0 0 10px", maxWidth: "560px" }}>
                    {item.description}
                  </p>
                  <div style={{ color: "#888", fontSize: "12px" }}>{item.note}</div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* === AWARDS === */}
      <section style={{
        background: "#F5F7FB",
        padding: "64px 64px",
      }}>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: UBUNTU,
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F2660",
            marginBottom: "12px",
          }}
        >
          Αναγνώριση σε εθνικό επίπεδο
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ color: "#555", fontSize: "15px", lineHeight: 1.6, maxWidth: "600px", marginBottom: "48px" }}
        >
          Για πάνω από μια δεκαετία, βραβέυτηκα επανειλημμένα στα Πανελλήνια Συνέδρια Πωλήσεων, ανακηρύσσoντάς με ανάμεσα στους κορυφαίους ασφαλιστές της χώρας.
        </motion.p>

        {/* Minimal timeline — year first, then event; multiple awards grouped per year.
            Sticky summary card fills the right column. */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 860px) 300px", gap: "64px", alignItems: "start" }}>
        <div>
          {AWARD_ENTRIES.map((entry, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <motion.div
                key={entry.year + entry.event}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                style={{ display: "grid", gridTemplateColumns: "150px 56px 1fr" }}
              >

                {/* Date — slides in from the left */}
                <motion.div variants={dateSlide} style={{ textAlign: "right", paddingTop: "2px" }}>
                  {entry.month && (
                    <div style={{ color: "#888", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2px" }}>
                      {entry.month}
                    </div>
                  )}
                  <div style={{ fontFamily: UBUNTU, fontSize: "32px", fontWeight: 700, color: "#1E439A", lineHeight: 1.1 }}>
                    {entry.year}
                  </div>
                </motion.div>

                {/* Divider — dot pops, line grows downward */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div
                    variants={dotPop}
                    whileHover={{ scale: 1.5 }}
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      border: "2px solid #1E439A",
                      background: "#fff",
                      boxShadow: "0 0 0 5px #EEF2FF",
                      marginTop: "12px",
                      flexShrink: 0,
                    }}
                  />
                  <motion.div
                    variants={lineGrow}
                    style={{
                      width: "1px",
                      flex: 1,
                      marginTop: "10px",
                      transformOrigin: "top",
                      background: isLast
                        ? "linear-gradient(to bottom, #C9D4EC 0%, transparent 90%)"
                        : "linear-gradient(to bottom, #C9D4EC 0%, #C9D4EC 70%, rgba(201,212,236,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Content — slides in from the right */}
                <motion.div
                  variants={contentSlide}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ paddingBottom: isLast ? "8px" : "40px", paddingTop: "6px" }}
                >
                  <div style={{ color: "#1E439A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                    {entry.event}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {entry.awards.map((award) => (
                      <div key={award.rank + award.category} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                        <span style={{ color: "#1E439A", fontWeight: 700, fontSize: "13px", whiteSpace: "nowrap" }}>
                          {award.rank}
                        </span>
                        <span style={{ fontFamily: UBUNTU, fontWeight: 600, fontSize: "16px", color: "#0F2660" }}>
                          {award.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* Sticky summary card — totals computed from AWARD_ENTRIES */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            position: "sticky",
            top: "112px",
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 12px 40px rgba(18,35,85,0.12)",
            padding: "32px 28px",
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "#e8eef8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
          }}>
            <Trophy size={24} color="#1E439A" strokeWidth={1.75} />
          </div>

          <div style={{ fontFamily: UBUNTU, fontSize: "42px", fontWeight: 700, color: "#1E439A", lineHeight: 1 }}>
            <StatValue value={TOTAL_AWARDS} />
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F2660", margin: "6px 0 2px" }}>
            διακρίσεις συνολικά
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "22px" }}>
            2000 – 2025 · 25 χρόνια πορείας
          </div>

          <div style={{ height: "1px", background: "#eef0f4", marginBottom: "18px" }} />

          <div style={{ display: "grid", gap: "12px" }}>
            {AWARD_CATEGORY_COUNTS.map(([category, count]) => (
              <div key={category} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ fontSize: "13px", color: "#555" }}>{category}</span>
                <span style={{ fontFamily: UBUNTU, fontSize: "15px", fontWeight: 700, color: "#1E439A" }}>{count}</span>
              </div>
            ))}
          </div>
        </motion.aside>
        </div>

        {/* Context note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          style={{ color: "#777", fontSize: "13px", marginTop: "32px", fontStyle: "italic" }}
        >
          Όλα τα παραπάνω βραβεία απονεμήθηκαν από τον Όμιλο International Life στα ετήσια Πανελλήνια Συνέδρια Πωλήσεων, όπου αξιολογούνται όλοι οι ασφαλιστές και Managers της χώρας.
        </motion.p>
      </section>
<PartnersMarquee/>
      {/* == FOOTER == */}
      <Footer />

    </main>
  );
}
