// Backend for every form on the site (product quote forms + /epikoinonia).
// Validates against the same field definitions the client renders
// (app/components/quoteForms.ts), then emails the submission via Resend.
//
// Environment variables (see .env.example):
//   RESEND_API_KEY   — API key from https://resend.com
//   QUOTE_TO_EMAIL   — where submissions are delivered (Dimitrios' inbox)
//   QUOTE_FROM_EMAIL — verified sender; defaults to Resend's onboarding sender
//
// Without a key in development the submission is logged to the console and
// treated as delivered, so the forms stay testable before Resend is set up.

import { getQuoteFields } from "../../components/quoteForms";

type Payload = {
  slug?: unknown;
  subject?: unknown;
  categoryLabel?: unknown;
  values?: unknown;
  company?: unknown; // honeypot — real users never fill it
};

// Best-effort in-memory rate limit. Instances are reused across requests on
// Vercel's Fluid Compute, so this blocks bursts without external storage.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (text: string, max: number) =>
  text.replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn they were caught
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const slug = typeof payload.slug === "string" ? payload.slug : "";
  const values =
    payload.values && typeof payload.values === "object" && !Array.isArray(payload.values)
      ? (payload.values as Record<string, unknown>)
      : {};

  // Same rules as the client — never trust client-side validation alone
  const fields = getQuoteFields(slug);
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const raw = values[field.name];
    if (field.type === "checkbox") {
      if (field.required && raw !== true) errors[field.name] = "Απαιτείται η συγκατάθεσή σας";
      continue;
    }
    const text = typeof raw === "string" ? raw.trim() : "";
    if (field.required && !text) {
      errors[field.name] = "Το πεδίο είναι υποχρεωτικό";
    } else if (text && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      errors[field.name] = "Μη έγκυρο email";
    } else if (text && field.type === "tel" && text.replace(/\D/g, "").length < 8) {
      errors[field.name] = "Μη έγκυρος αριθμός τηλεφώνου";
    } else if (text && field.type === "select" && field.options && !field.options.includes(text)) {
      errors[field.name] = "Μη έγκυρη επιλογή";
    }
  }
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Validation failed", fields: errors }, { status: 422 });
  }

  // Build the email from the known field definitions only — unknown keys in
  // the payload are ignored, values are clamped to sane lengths
  const entries: { label: string; value: string }[] = [];
  const categoryLabel = typeof payload.categoryLabel === "string" ? oneLine(payload.categoryLabel, 120) : "";
  if (categoryLabel) entries.push({ label: "Κατηγορία", value: categoryLabel });
  for (const field of fields) {
    if (field.type === "checkbox") continue;
    const raw = values[field.name];
    const text = typeof raw === "string" ? raw.trim().slice(0, 2000) : "";
    if (text) entries.push({ label: field.label, value: text });
  }

  const subject = oneLine(
    typeof payload.subject === "string" && payload.subject.trim()
      ? payload.subject
      : "Αίτημα προσφοράς μέσω ιστοσελίδας",
    150
  );
  const body = entries.map(({ label, value }) => `${label}: ${value}`).join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[quote] RESEND_API_KEY / QUOTE_TO_EMAIL not set — logging submission instead:");
      console.warn(`[quote] Subject: ${subject}\n${body}`);
      return Response.json({ ok: true });
    }
    console.error("[quote] Email service not configured (RESEND_API_KEY / QUOTE_TO_EMAIL missing)");
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  const senderEmail = fields.some((f) => f.name === "email") ? values["email"] : undefined;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Ploumakis Website <${from}>`,
      to: [to],
      subject,
      text: body,
      // Reply straight to the visitor from the inbox
      ...(typeof senderEmail === "string" && senderEmail.includes("@")
        ? { reply_to: senderEmail.trim() }
        : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[quote] Resend error ${res.status}: ${detail}`);
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
