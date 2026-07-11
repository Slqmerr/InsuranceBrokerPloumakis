"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getQuoteFields, hasInvestmentDisclosure, type QuoteField } from "./quoteForms";

const UBUNTU = "var(--font-ubuntu-sans), sans-serif";

// Rounded card that overlaps the blue header band, like the homepage card strip
const CARD: React.CSSProperties = {
  maxWidth: "640px",
  margin: "-40px auto 80px",
  position: "relative",
  zIndex: 10,
  background: "#fff",
  borderRadius: "24px",
  boxShadow: "0 12px 40px rgba(94, 0, 0,0.12)",
  padding: "36px 36px 40px",
  fontFamily: UBUNTU,
};

const INPUT: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #d8dce4",
  borderRadius: "8px",
  padding: "9px 12px",
  fontSize: "14px",
  fontFamily: UBUNTU,
  color: "#1a1a1a",
  background: "#fff",
  outline: "none",
};

const focusOn = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = "#a30000";
};
const focusOff = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = "#d8dce4";
};

type Values = Record<string, string | boolean>;

// Section grouping for the base fields; everything else is product-specific
const PERSONAL_NAMES = ["firstName", "lastName"];
const CONTACT_NAMES = ["phone", "email", "area", "contactPref"];
const BOTTOM_NAMES = ["message", "consent"];

function SectionTitle({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#374151", margin: "10px 0 2px" }}>
      {children}
      {required && <span style={{ color: "#dc2626" }}> *</span>}
    </h3>
  );
}

export default function QuoteForm({
  slug,
  productTitle,
  categoryLabel,
  subject,
}: {
  slug: string;
  productTitle: string;
  categoryLabel: string;
  subject?: string; // email subject override; defaults to a quote request
}) {
  const fields = getQuoteFields(slug);
  const [values, setValues] = React.useState<Values>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const raw = values[field.name];
      if (field.type === "checkbox") {
        if (field.required && raw !== true) next[field.name] = "Απαιτείται η συγκατάθεσή σας";
        continue;
      }
      const text = typeof raw === "string" ? raw.trim() : "";
      if (field.required && !text) {
        next[field.name] = "Το πεδίο είναι υποχρεωτικό";
      } else if (text && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        next[field.name] = "Μη έγκυρο email";
      } else if (text && field.type === "tel" && text.replace(/\D/g, "").length < 8) {
        next[field.name] = "Μη έγκυρος αριθμός τηλεφώνου";
      }
    }
    setErrors(next);
    return Object.values(next).every((msg) => !msg);
  };

  // The API route (/api/quote) re-validates against the same field
  // definitions, builds the email and delivers it
  const handleSubmit = async () => {
    if (!validate() || sending) return;
    setSubmitError("");
    setSending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          subject: subject ?? `Αίτημα προσφοράς: ${productTitle}`,
          categoryLabel,
          values,
          company: honeypot,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        if (data?.fields) setErrors(data.fields);
      }
      setSubmitError("Κάτι πήγε στραβά κατά την αποστολή. Δοκιμάστε ξανά ή καλέστε μας απευθείας.");
    } catch {
      setSubmitError("Κάτι πήγε στραβά κατά την αποστολή. Δοκιμάστε ξανά ή καλέστε μας απευθείας.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="fade-up" style={{ ...CARD, padding: "80px 40px", textAlign: "center" }}>
        <CheckCircle2 size={56} color="#a30000" strokeWidth={1.75} style={{ marginBottom: "20px" }} />
        <h2 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 12px" }}>Ευχαριστούμε!</h2>
        <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
          Λάβαμε το αίτημά σας. Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
        </p>
      </div>
    );
  }

  const renderError = (name: string) =>
    errors[name] ? (
      <p style={{ color: "#dc2626", fontSize: "13px", margin: "6px 0 0" }}>{errors[name]}</p>
    ) : null;

  // The consent label carries a link — split the label text around it
  const renderLabelText = (field: QuoteField) => {
    if (!field.link) return field.label;
    const [before, after] = field.label.split(field.link.text);
    return (
      <>
        {before}
        <Link href={field.link.href} style={{ color: "#a30000", fontWeight: 600 }}>
          {field.link.text}
        </Link>
        {after}
      </>
    );
  };

  
  const placeholderFor = (field: QuoteField) =>
    (field.placeholder ?? field.label) + (field.required ? " *" : "");

  const renderControl = (field: QuoteField) => {
    switch (field.type) {
      case "select":
        return (
          <select
            value={typeof values[field.name] === "string" ? (values[field.name] as string) : ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            style={{ ...INPUT, color: values[field.name] ? "#1a1a1a" : "#9aa1ac", cursor: "pointer" }}
          >
            <option value="" disabled>{placeholderFor(field)}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            rows={3}
            value={typeof values[field.name] === "string" ? (values[field.name] as string) : ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            placeholder={placeholderFor(field)}
            style={{ ...INPUT, resize: "vertical" }}
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={typeof values[field.name] === "string" ? (values[field.name] as string) : ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            placeholder={placeholderFor(field)}
            style={INPUT}
          />
        );
    }
  };

  const renderFieldBlock = (field: QuoteField) =>
    field.type === "checkbox" ? (
      <div key={field.name}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#4b5563", lineHeight: 1.5, cursor: "pointer" }}>
          {/* Real checkbox stays in the tree (keyboard + screen readers); the
              animated .consent-box right after it is what the visitor sees */}
          <input
            type="checkbox"
            checked={values[field.name] === true}
            onChange={(e) => setValue(field.name, e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: "18px", height: "18px", margin: 0, cursor: "pointer" }}
          />
          <span className={`consent-box${values[field.name] === true ? " checked" : ""}`} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 12.5 9.5 18 20 6.5" />
            </svg>
          </span>
          <span>{renderLabelText(field)}</span>
        </label>
        {renderError(field.name)}
      </div>
    ) : (
      <div key={field.name}>
        {renderControl(field)}
        {renderError(field.name)}
      </div>
    );

  const personalFields = fields.filter((f) => PERSONAL_NAMES.includes(f.name));
  const contactFields = fields.filter((f) => CONTACT_NAMES.includes(f.name));
  const bottomFields = fields.filter((f) => BOTTOM_NAMES.includes(f.name));
  const productFields = fields.filter(
    (f) => !PERSONAL_NAMES.includes(f.name) && !CONTACT_NAMES.includes(f.name) && !BOTTOM_NAMES.includes(f.name)
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ ...CARD, display: "grid", gap: "18px" }}
    >
      {/* Προσωπικά Στοιχεία — first & last name side by side */}
      <SectionTitle>Προσωπικά Στοιχεία</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", alignItems: "start" }}>
        {personalFields.map(renderFieldBlock)}
      </div>

      {/* Στοιχεία Επικοινωνίας — stacked full width */}
      <SectionTitle required>Στοιχεία Επικοινωνίας</SectionTitle>
      {contactFields.map(renderFieldBlock)}

      {/* Product-specific fields, two per row */}
      {productFields.length > 0 && (
        <>
          <SectionTitle>Στοιχεία Αιτήματος</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px 24px", alignItems: "start" }}>
            {productFields.map(renderFieldBlock)}
          </div>
        </>
      )}

      {bottomFields.map(renderFieldBlock)}

      {hasInvestmentDisclosure(slug) && (
        <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
          Οι επενδυτικές επιλογές δεν εγγυώνται απόδοση· ο κίνδυνος βαρύνει τον ασφαλισμένο.
        </p>
      )}

      {/* Honeypot — invisible to people, tempting to bots */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      {submitError && (
        <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>{submitError}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={sending}
        onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = "#810000"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#a30000"; }}
        style={{
          background: "#a30000",
          color: "#fff",
          fontWeight: 700,
          fontFamily: UBUNTU,
          fontSize: "14px",
          padding: "12px 30px",
          borderRadius: "999px",
          border: "none",
          cursor: sending ? "wait" : "pointer",
          opacity: sending ? 0.7 : 1,
          width: "fit-content",
          transition: "background 0.2s ease",
        }}
      >
        {sending ? "Αποστολή..." : "Αποστολή αιτήματος"}
      </button>
    </form>
  );
}
