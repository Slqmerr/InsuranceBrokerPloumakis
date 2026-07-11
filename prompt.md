# Task for Claude Code — Prompt 15 (v3): Product Sidebar — "Πώς λειτουργεί" Process

This replaces both earlier versions of Prompt 15 — if neither was run yet, ignore them and
use this one. Goal: replace the "Τι θα χρειαστείτε" checklist in the sticky product-page
sidebar with just a "Πώς λειτουργεί" numbered 3-step process. No trust-card section this
time — just the process.

**File to edit:** `app/components/ProductPageContent.tsx`

Do not touch `products.ts`, the hero section, the "Τι καλύπτει" list, the footer, or any
other file.

---

## What changes

Inside the `<aside>` sidebar, find the block currently showing the "Τι θα χρειαστείτε"
heading and the checklist built from `product.needs.map(...)`. Replace that whole block
with a single new section: a "Πώς λειτουργεί" heading followed by 3 numbered steps
(numbered circles, not icons).

The steps should read naturally as being about the specific product the visitor is
looking at, not generic copy. Do this by writing the step descriptions as a small function
that takes the current `product` and returns the text, rather than static strings, so the
product's title gets woven in. `ProductPageContent` already receives `product` as a prop —
use that.

**Important grammar note:** always wrap the product title in guillemets (« ») when
inserting it mid-sentence — e.g. `«${product.title}»` — rather than inserting it bare.
Greek noun endings change depending on grammatical role, and several product titles in
this codebase (e.g. "Επαγγελματικός Χώρος") would come out grammatically wrong if slotted
in as plain text. Quoting the name as a label sidesteps that entirely and matches how
insurance companies already name their own programs in this niche (e.g. «Bewell»,
«Fly Away»). The steps below already have the guillemets placed correctly — keep them
exactly as written, don't move them or drop them.

Use exactly this text (replace `${product.title}` with the actual interpolation, don't
just paste the literal placeholder):

**Process steps** (heading: "Πώς λειτουργεί", numbered 1–3):
```
1. Επικοινωνία — Μας καλείτε ή ζητάτε προσφορά για «${product.title}» online, χωρίς καμία δέσμευση.
2. Σύγκριση — Εξετάζουμε τα προγράμματα «${product.title}» των συνεργαζόμενων εταιρειών για εσάς.
3. Απόφαση — Επιλέγετε το πρόγραμμα που ταιριάζει σε εσάς — τα υπόλοιπα τα αναλαμβάνουμε εμείς.
```

---

## Visual structure

Match the site's existing sidebar conventions (same fonts/sizes/colors already used
elsewhere in this component — Ubuntu Sans, brand blue `#1E439A`, navy `#0F2660`):

- Each step gets a small numbered circle (1, 2, 3 — plain numbers, not icons) in brand
  blue with white text, step title in bold, one-line description below it in a lighter
  gray.
- Keep a thin divider below the process steps, before the existing CTA buttons.
- Do not change anything below this block — the "Ζητήστε Προσφορά" / "Κλείσε Ραντεβού"
  buttons and the phone number stay exactly as they are.

If the `FileText` icon import becomes unused after this change (check — it was only used
for the old checklist), remove it from the import line.

---

## Constraints

- Inline styles only — no Tailwind, no CSS modules.
- Do not touch `products.ts`. The `needs` field on each product becomes unused after this
  change — leave it defined, it's not being removed in this pass.
- Reproduce the Greek copy above exactly (aside from the `${product.title}` interpolation)
  — no translating, paraphrasing, or "improving" it.
- Run `npm run dev` and check a few different product pages (e.g. `/idiotes/ygeia`,
  `/idiotes/oxima`, `/epixeirisi/epaggelmatikos-xoros`) to confirm the sidebar text
  correctly reflects each product's actual title and nothing looks visually broken.