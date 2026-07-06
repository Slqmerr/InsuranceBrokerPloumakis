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
  boxShadow: "0 12px 40px rgba(18,35,85,0.12)",
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
  e.currentTarget.style.borderColor = "#1E439A";
};
const focusOff = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = "#d8dce4";
};

// TODO: replace REPLACE_WITH_DIMITRIOS_EMAIL with the real address
const QUOTE_EMAIL = "REPLACE_WITH_DIMITRIOS_EMAIL";

/**
 * Single integration point for delivering the quote request — the rest of the
 * component doesn't know (or care) how it's sent.
 *
 * Default: zero-setup mailto link, works with no signup.
 *
 * TODO (recommended before launch): swap to a no-backend form service so the
 * visitor never leaves the site and submissions arrive reliably by email.
 * Needs an access key from the chosen service (e.g. web3forms.com):
 *
 *   return fetch("https://api.web3forms.com/submit", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({
 *       access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
 *       subject,
 *       ...Object.fromEntries(entries.map(({ label, value }) => [label, value])),
 *     }),
 *   });
 */
function submitQuote(subject: string, entries: { label: string; value: string }[]) {
  const body = encodeURIComponent(entries.map(({ label, value }) => `${label}: ${value}`).join("\n"));
  window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

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

  const handleSubmit = () => {
    if (!validate()) return;
    const entries = fields
      .filter((f) => f.type !== "checkbox")
      .map((f) => ({
        label: f.label,
        value: typeof values[f.name] === "string" ? (values[f.name] as string).trim() : "",
      }))
      .filter((entry) => entry.value);
    if (categoryLabel) entries.unshift({ label: "Κατηγορία", value: categoryLabel });
    submitQuote(subject ?? `Αίτημα προσφοράς: ${productTitle}`, entries);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ ...CARD, padding: "80px 40px", textAlign: "center" }}>
        <CheckCircle2 size={56} color="#1E439A" strokeWidth={1.75} style={{ marginBottom: "20px" }} />
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
        <Link href={field.link.href} style={{ color: "#1E439A", fontWeight: 600 }}>
          {field.link.text}
        </Link>
        {after}
      </>
    );
  };

  // Eurolife-style: the label lives inside the field as placeholder text
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
          <input
            type="checkbox"
            checked={values[field.name] === true}
            onChange={(e) => setValue(field.name, e.target.checked)}
            style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: "#1E439A", flexShrink: 0, cursor: "pointer" }}
          />
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

      <button
        type="button"
        onClick={handleSubmit}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#16337a"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#1E439A"; }}
        style={{
          background: "#1E439A",
          color: "#fff",
          fontWeight: 700,
          fontFamily: UBUNTU,
          fontSize: "14px",
          padding: "12px 30px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          width: "fit-content",
          transition: "background 0.2s ease",
        }}
      >
        Αποστολή αιτήματος
      </button>
    </form>
  );
}
