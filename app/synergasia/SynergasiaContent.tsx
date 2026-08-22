"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useInView, AnimatePresence, type Variants } from "framer-motion";
import { GraduationCap, Building2, LifeBuoy, TrendingUp, ChevronDown, UserPlus, Rocket, Target, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import PartnersMarquee from "../components/PartnersMarquee";
import QuoteForm from "../components/QuoteForm";
import heroPhoto from "@/public/634A9662.jpg";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

// Link that accepts motion props, so the outline CTA keeps client-side nav
const MotionLink = motion.create(Link);

// next/image forwards its ref to the underlying <img>, so it animates like one
const MotionImage = motion.create(Image);

/* ── Shared animation variants (mirrors /emeis) ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* Hero CTAs — fade up in sequence, lift + glow on hover, "hover" label
   propagates to the arrow so it slides on button hover */
const primaryBtn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.045, y: -2, boxShadow: "0 14px 30px rgba(0,0,0,0.22)" },
};

const outlineBtn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.045, y: -2, backgroundColor: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.9)" },
};

const arrowSlide: Variants = {
  hover: { x: 5, transition: { type: "spring", stiffness: 400, damping: 18 } },
};

/* Animated count-up for the credibility strip.
   The number is written straight to the DOM node instead of through state:
   a setState per frame re-renders three of these at 60fps at exactly the
   scroll position where the partners marquee is on screen, and that was
   enough main-thread work to visibly stall it. */
function StatValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  // never re-rendered after mount, so the imperative writes above are safe
  return <span ref={ref}>{`0${suffix}`}</span>;
}

/* ── Data ── */
const VALUE_CARDS = [
  {
    icon: GraduationCap,
    title: "Εκπαίδευση & πιστοποίηση",
    body: "Σε καθοδηγούμε από το μηδέν μέχρι την προετοιμασία για την πιστοποίηση διαμεσολαβητή και τις τεχνικές πωλήσεων που δουλεύουν στην πράξη, βασισμένα σε διεθνή προγράμματα (LIMRA / EIAS).",
  },
  {
    icon: Building2,
    title: "Πρόσβαση σε κορυφαίες εταιρείες",
    body: "Συνεργάζεσαι με ένα δίκτυο 15+ ασφαλιστικών εταιρειών. Προτείνεις πάντα την καλύτερη λύση για τον πελάτη.",
  },
  {
    icon: LifeBuoy,
    title: "Τεχνική & διοικητική υποστήριξη",
    body: "Προσφορές, ανάληψη κινδύνου, back-office και υποστήριξη σε κάθε βήμα.",
  },
  {
    icon: TrendingUp,
    title: "Ξεκάθαρο πλάνο ανάπτυξης",
    body: "Μαθαίνεις το σύστημα αμοιβών με προμήθειες και bonus, οδηγώντας σε μια πραγματική πορεία εξέλιξης.",
  },
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Γνωριμία",
    body: "Μια πρώτη συζήτηση, για να απαντήσουμε σε κάθε ερώτησή σου.",
  },
  {
    icon: GraduationCap,
    title: "Εκπαίδευση & πιστοποίηση",
    body: "Σε προετοιμάζουμε για την πιστοποίηση και σου δίνουμε τα εργαλεία και τη γνώση για να ξεκινήσεις σωστά.",
  },
  {
    icon: Target,
    title: "Πρώτοι πελάτες με υποστήριξη",
    body: "Ξεκινάς με τη δική μας καθοδήγηση δίπλα σου σε κάθε ραντεβού και προσφορά, μέχρι να αποκτήσεις εξοικείωση και τριβή με το αντικείμενο.",
  },
  {
    icon: Rocket,
    title: "Ανάπτυξη χαρτοφυλακίου",
    body: "Χτίζεις το δικό σου πελατολόγιο, αυξάνεις το εισόδημά σου και — αν θέλεις — δημιουργείς τη δική σου ομάδα.",
  },
];

const STATS = [
  { value: 25, suffix: "+", label: "Χρόνια εμπειρίας" },
  { value: 12, suffix: "+", label: "Διακρίσεις" },
  { value: 15, suffix: "+", label: "Συνεργαζόμενες εταιρείες" },
];

const PERSONAS = [
  {
    title: "Ξεκινάς νέα καριέρα",
    body: "Χωρίς προηγούμενη εμπειρία στην ασφάλιση — αναζητάς ένα επάγγελμα με προοπτική και σταθερή καθοδήγηση.",
  },
  {
    title: "Έρχεσαι από πωλήσεις",
    body: "Έχεις ταλέντο στην επικοινωνία και τις πωλήσεις και θέλεις να το αξιοποιήσεις σε έναν κλάδο με μεγαλύτερες αμοιβές.",
  },
  {
    title: "Είσαι ήδη στον κλάδο",
    body: "Ασφαλιστικός διαμεσολαβητής που ψάχνει ένα ισχυρότερο δίκτυο, καλύτερη υποστήριξη και περισσότερες εταιρείες.",
  },
];

const FAQS = [
  {
    q: "Χρειάζομαι προϋπηρεσία στην ασφάλιση;",
    a: "Όχι. Οι περισσότεροι συνεργάτες μας ξεκίνησαν χωρίς εμπειρία στον κλάδο. Σε εκπαιδεύουμε από την αρχή και σε στηρίζουμε μέχρι να σταθείς στα πόδια σου.",
  },
  {
    q: "Πληρώνω κάτι για να ξεκινήσω;",
    a: "Δεν υπάρχει κόστος εισόδου. Επενδύεις τον χρόνο και τη διάθεσή σου. Παρέχουμε την εκπαίδευση, τα εργαλεία και την υποστήριξη.",
  },
  {
    q: "Μπορώ να ξεκινήσω με μερική απασχόληση;",
    a: "Ναι. Πολλοί ξεκινούν ως δεύτερη δραστηριότητα και περνούν σε πλήρη απασχόληση όταν το χαρτοφυλάκιό τους αυξάνεται.",
  },
  {
    q: "Πώς αμείβομαι;",
    a: "Με προμήθειες επί των συμβολαίων και πρόσθετα bonus παραγωγής. Το σύστημα είναι διαφανές και σου το εξηγούμε αναλυτικά από την πρώτη στιγμή.",
  },
  {
    q: "Χρειάζομαι άδεια ή πιστοποίηση;",
    a: "Ναι, η άσκηση του επαγγέλματος απαιτεί πιστοποίηση διαμεσολαβητή. Σε προετοιμάζουμε και σε καθοδηγούμε σε όλη τη διαδικασία.",
  },
];

/* ── FAQ accordion item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: "1px solid #eddede" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: "20px 4px",
          fontFamily: UBUNTU,
          fontSize: "16px",
          fontWeight: 600,
          color: "#5e0000",
        }}
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: "inline-flex", flexShrink: 0 }}>
          <ChevronDown size={20} color="#a30000" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.7, margin: "0 4px 20px" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SynergasiaContent() {
  return (
    <main style={{ fontFamily: UBUNTU, background: "#fff", color: "#1a1a1a", width: "100%" }}>

      {/* === HERO: split layout, mirrors /emeis === */}
      <section className="emeis-hero" style={{ display: "flex", flexDirection: "row", minHeight: "460px", background: "#a30000", overflow: "hidden" }}>
        <motion.div
          className="emeis-hero-bio"
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ flex: "0 0 58%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px" }}
        >

          <motion.h1
            variants={fadeUp}
            style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "40px", fontWeight: 700, lineHeight: 1.18, margin: "0 0 22px", maxWidth: "560px" }}
          >
            Χτίσε καριέρα στην ασφάλιση, δίπλα σε έναν μέντορα με 25 χρόνια πορεία
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{ color: "rgba(255,255,255,0.92)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 32px", maxWidth: "520px" }}
          >
            Δεν χρειάζεσαι εμπειρία. Χρειάζεσαι ένα δίκτυο που σε εκπαιδεύει, σε στηρίζει και σου
            ανοίγει πρόσβαση στις κορυφαίες ασφαλιστικές εταιρείες της αγοράς.
          </motion.p>

          <motion.div variants={stagger} style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <motion.a
              href="#aitisi"
              variants={primaryBtn}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#a30000", fontWeight: 700, fontFamily: UBUNTU, padding: "14px 28px", borderRadius: "999px", textDecoration: "none", fontSize: "15px", willChange: "transform" }}
            >
              Κάνε αίτηση συνεργασίας
              <motion.span variants={arrowSlide} style={{ display: "inline-flex" }}>
                <ArrowRight size={17} strokeWidth={2.2} />
              </motion.span>
            </motion.a>
            <MotionLink
              href="/epikoinonia"
              variants={outlineBtn}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              style={{ display: "inline-block", background: "transparent", color: "#fff", fontWeight: 700, fontFamily: UBUNTU, padding: "14px 28px", borderRadius: "999px", textDecoration: "none", fontSize: "15px", border: "1px solid rgba(255,255,255,0.5)", willChange: "transform" }}
            >
              Κλείσε ραντεβού γνωριμίας
            </MotionLink>
          </motion.div>
        </motion.div>

        <div className="emeis-hero-photo" style={{ flex: "0 0 42%", overflow: "hidden", position: "relative" }}>
          {/* `fill` against .emeis-hero-photo, which is already position:relative
              and is what the ≤900px height override targets. */}
          <MotionImage
            src={heroPhoto}
            alt="Ο χώρος του γραφείου"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            preload
            placeholder="blur"
            initial={{ opacity: 0, scale: 1.12, x: 48 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(163,0,0,0.5) 0%, transparent 40%)" }}
          />
        </div>
      </section>

      {/* === VALUE CARDS === */}
      <section className="section-pad" style={{ background: "#fff", padding: "72px 64px" }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#5e0000", textAlign: "center", margin: "0 0 12px" }}
        >
          Γιατί να συνεργαστείς μαζί μας
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ color: "#555", fontSize: "16px", lineHeight: 1.6, textAlign: "center", maxWidth: "620px", margin: "0 auto 48px" }}
        >
          Ό,τι χρειάζεσαι για να ξεκινήσεις σωστά και να αναπτυχθείς.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", maxWidth: "1080px", margin: "0 auto" }}
        >
          {VALUE_CARDS.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ background: "#fff", border: "1px solid #f0e3e3", borderRadius: "20px", padding: "28px 24px", boxShadow: "0 10px 30px rgba(94,0,0,0.06)" }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f7e8e8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                <Icon size={24} color="#a30000" strokeWidth={1.75} />
              </div>
              <h3 style={{ fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#5e0000", margin: "0 0 10px" }}>{title}</h3>
              <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* === CREDIBILITY STRIP (count-up) === */}
      <section style={{ background: "#a30000", padding: "56px 64px" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "56px" }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "44px", fontWeight: 700, lineHeight: 1 }}>
                <StatValue value={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "8px" }}>{stat.label}</div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "24px", fontWeight: 700, lineHeight: 1, marginTop: "8px" }}>NOW</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "12px" }}>Insurance Group</div>
          </div>
        </div>
      </section>

      {/* Companies the associate gets to work with */}
      <PartnersMarquee showTitle={false}/>

      {/* === PERSONAS === */}
      <section className="section-pad" style={{ background: "#fff", padding: "72px 64px" }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#5e0000", textAlign: "center", margin: "0 0 48px" }}
        >
          Σε ποιους απευθύνεται
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", maxWidth: "980px", margin: "0 auto" }}
        >
          {PERSONAS.map(({ title, body }) => (
            <motion.div key={title} variants={fadeUp} style={{ borderLeft: "3px solid #a30000", padding: "6px 0 6px 20px" }}>
              <h3 style={{ fontFamily: UBUNTU, fontSize: "18px", fontWeight: 700, color: "#5e0000", margin: "0 0 10px" }}>{title}</h3>
              <p style={{ color: "#555", fontSize: "15px", lineHeight: 1.65, margin: 0 }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === FAQ === */}
      <section className="section-pad" style={{ background: "#fbf5f5", padding: "72px 64px" }}>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ fontFamily: UBUNTU, fontSize: "28px", fontWeight: 700, color: "#5e0000", textAlign: "center", margin: "0 0 40px" }}
        >
          Συχνές ερωτήσεις
        </motion.h2>

        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* === LEAD FORM === */}
      <section id="aitisi" style={{ background: "#fff", scrollMarginTop: "96px" }}>
        <div className="band-header" style={{ background: "#a30000", padding: "56px 64px 88px", textAlign: "center" }}>
          <h2 className="fade-up" style={{ color: "#fff", fontFamily: UBUNTU, fontSize: "30px", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
            Ξεκίνα σήμερα
          </h2>
          <p className="fade-up" style={{ color: "rgba(255,255,255,0.88)", fontSize: "16px", lineHeight: 1.6, margin: "0 auto", maxWidth: "520px", animationDelay: "0.08s" }}>
            Συμπλήρωσε τα στοιχεία σου και θα επικοινωνήσουμε μαζί σου για μια πρώτη κουβέντα, χωρίς καμία δέσμευση.
          </p>
        </div>

        <div className="fade-up" style={{ animationDelay: "0.16s" }}>
          <QuoteForm
            slug="synergasia"
            productTitle="Συνεργασία"
            categoryLabel="Συνεργασία — Ασφαλιστικός σύμβουλος"
            subject="Αίτηση συνεργασίας μέσω ιστοσελίδας"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
