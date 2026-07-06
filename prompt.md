# Task for Claude Code — Round 4B

Build a **product-specific quote request page** as a new dynamic route: `/prosfora/[slug]`.
Each product's `Ζητήστε Προσφορά` / `Με ενδιαφέρει` button (added in prompt 10) links to `/prosfora/${product.slug}`. This page shows a contact form whose fields **change depending on the product** — a business quote asks for different things than a health quote.

Conventions unchanged: **inline styles only**, all user-facing copy in **Greek**, lucide-react icons, Ubuntu Sans (`var(--font-ubuntu-sans), sans-serif`), brand blue `#1E439A`.

> **Prerequisite:** run prompt 10 first (it creates the buttons that link here).

---

## Design overview

Rather than hand-writing 14 separate forms, drive the form from **data**. Define a small set of field descriptors, group products into **profiles** (health, life/family, auto, home, business-place, group, cargo, liability, cyber, savings, pet), map each slug to a profile, and render the form generically. Every form = a shared **base block** (contact details + consent) plus the profile's product-specific fields. Adding a product later becomes one line in the slug→profile map.

Create two new files and one new route:
- `app/components/quoteForms.ts` — the field descriptor type, base fields, profile field-sets, and the slug→profile map (data + Greek labels).
- `app/components/QuoteForm.tsx` — a `"use client"` component that renders and validates the form for a given slug.
- `app/prosfora/[slug]/page.tsx` — the dynamic route that resolves the product + profile and renders `QuoteForm`.

---

## 1. `app/components/quoteForms.ts`

### Field descriptor type

```ts
export type QuoteField = {
  name: string;                 // unique key, e.g. "age"
  label: string;                // Greek label shown to the user
  type: "text" | "tel" | "email" | "number" | "select" | "textarea" | "checkbox";
  required?: boolean;
  options?: string[];           // only for type "select"
  placeholder?: string;
};
```

### Base fields — on EVERY form

Order: contact fields first, then (later, after the product fields) the message + consent. Structure the file so the form renders `BASE_TOP` fields, then the profile fields, then `BASE_BOTTOM` fields.

`BASE_TOP`:
| name | label | type | required |
|---|---|---|---|
| `fullName` | `Ονοματεπώνυμο` | text | ✔ |
| `phone` | `Τηλέφωνο` | tel | ✔ |
| `email` | `Email` | email | ✔ |
| `area` | `Περιοχή / Πόλη` | text | |
| `contactPref` | `Προτιμώμενος τρόπος επικοινωνίας` | select — options: `["Τηλέφωνο", "Email", "SMS / Viber"]` | |

`BASE_BOTTOM`:
| name | label | type | required |
|---|---|---|---|
| `message` | `Πρόσθετες πληροφορίες / Σχόλια` | textarea | |
| `consent` | `Συναινώ στην επεξεργασία των στοιχείων μου για την αποστολή προσφοράς, σύμφωνα με την Πολιτική Απορρήτου.` | checkbox | ✔ |

> The `consent` checkbox is a legal requirement (GDPR) for collecting personal data in Greece — do not omit it or make it optional. Its label references a **Πολιτική Απορρήτου** page that doesn't exist yet: render the words "Πολιτική Απορρήτου" inside the label as a link to `/politiki-aporritou` and add `// TODO: create the Privacy Policy page` next to it.

### Profile field-sets

Define each profile as a `QuoteField[]`. Use these exactly (Greek labels as written):

**HEALTH**
- `age` — `Ηλικία` — number — required
- `peopleCount` — `Άτομα προς ασφάλιση` — number
- `coverageType` — `Τύπος κάλυψης που σας ενδιαφέρει` — select — `["Νοσοκομειακή", "Εξωνοσοκομειακή", "Και τα δύο"]`
- `existingCover` — `Έχετε ήδη ασφάλιση υγείας;` — select — `["Ναι", "Όχι"]`
- `smoker` — `Καπνιστής / -τρια;` — select — `["Ναι", "Όχι"]`

**LIFE_FAMILY** (Ζωή, Οικογένεια)
- `age` — `Ηλικία` — number — required
- `dependents` — `Αριθμός εξαρτώμενων μελών` — number
- `goal` — `Κύριος στόχος` — select — `["Προστασία οικογένειας", "Κάλυψη δανείου / στεγαστικού", "Εισοδηματική προστασία", "Αποταμίευση για τα παιδιά"]`
- `coverAmount` — `Επιθυμητό κεφάλαιο κάλυψης` — select — `["Έως 50.000€", "50.000€ – 100.000€", "100.000€ – 200.000€", "Άνω των 200.000€", "Δεν είμαι σίγουρος/-η"]`

**AUTO** (Όχημα, Εταιρικά Οχήματα)
- `vehicleType` — `Τύπος οχήματος` — select — `["Επιβατικό", "Μοτοσικλέτα", "Επαγγελματικό / Φορτηγό", "Στόλος οχημάτων"]`
- `makeModel` — `Μάρκα & Μοντέλο` — text
- `year` — `Έτος πρώτης κυκλοφορίας` — number
- `use` — `Χρήση οχήματος` — select — `["Ιδιωτική", "Επαγγελματική"]`
- `coverLevel` — `Επιθυμητή κάλυψη` — select — `["Βασική (υποχρεωτική αστική ευθύνη)", "Μερική (πυρός / κλοπής)", "Μικτή (ιδίων ζημιών)"]`

**HOME** (Κατοικία)
- `propertyType` — `Τύπος κατοικίας` — select — `["Διαμέρισμα", "Μονοκατοικία", "Εξοχική κατοικία"]`
- `sqm` — `Τετραγωνικά μέτρα` — number
- `ownership` — `Ιδιοκτήτης ή ενοικιαστής;` — select — `["Ιδιοκτήτης", "Ενοικιαστής"]`
- `buildYear` — `Έτος κατασκευής` — number
- `security` — `Υπάρχει συναγερμός / μέτρα ασφαλείας;` — select — `["Ναι", "Όχι"]`

**BUSINESS_PLACE** (Επαγγελματικός Χώρος)
- `companyName` — `Επωνυμία επιχείρησης` — text — required
- `activity` — `Κλάδος / Δραστηριότητα` — text — required
- `employees` — `Αριθμός εργαζομένων` — number
- `sqm` — `Τετραγωνικά μέτρα χώρου` — number
- `turnover` — `Ετήσιος τζίρος` — select — `["Έως 100.000€", "100.000€ – 500.000€", "500.000€ – 1εκ.€", "Άνω του 1εκ.€", "Προτιμώ να μην απαντήσω"]`

**GROUP** (Ομαδική Ασφάλιση)
- `companyName` — `Επωνυμία επιχείρησης` — text — required
- `employees` — `Αριθμός εργαζομένων προς κάλυψη` — number — required
- `activity` — `Κλάδος / Δραστηριότητα` — text
- `desiredCover` — `Επιθυμητές καλύψεις` — select — `["Ζωή", "Υγεία", "Ζωή & Υγεία", "Σύνταξη / Αποταμίευση"]`

**CARGO** (Μεταφορά Εμπορευμάτων)
- `companyName` — `Επωνυμία επιχείρησης` — text — required
- `goodsType` — `Είδος εμπορευμάτων` — text — required
- `transportMode` — `Τρόπος μεταφοράς` — select — `["Οδικώς", "Θαλάσσια", "Αεροπορικά", "Συνδυασμένη"]`
- `frequency` — `Συχνότητα αποστολών` — select — `["Περιστασιακά", "Τακτικά", "Καθημερινά"]`
- `cargoValue` — `Ενδεικτική αξία ανά αποστολή` — text

**LIABILITY** (Αστική Ευθύνη — appears in both Ιδιώτες and Επιχειρήσεις)
- `audience` — `Αφορά ιδιώτη ή επιχείρηση;` — select — `["Ιδιώτης", "Επιχείρηση"]` — required
- `activity` — `Δραστηριότητα / πλαίσιο ευθύνης` — text
- `employees` — `Αριθμός εργαζομένων (εφόσον αφορά επιχείρηση)` — number

**CYBER** (Cyber — both contexts)
- `audience` — `Αφορά ιδιώτη ή επιχείρηση;` — select — `["Ιδιώτης", "Επιχείρηση"]` — required
- `employees` — `Αριθμός εργαζομένων (εφόσον αφορά επιχείρηση)` — number
- `dataSensitivity` — `Διαχειρίζεστε δεδομένα πελατών ή online συναλλαγές;` — select — `["Ναι", "Όχι", "Εν μέρει"]`

**SAVINGS_INVEST** (Αποταμίευση, Επένδυση)
- `age` — `Ηλικία` — number
- `goal` — `Στόχος` — select — `["Σύνταξη", "Αποταμίευση για τα παιδιά", "Δημιουργία κεφαλαίου", "Άλλο"]`
- `horizon` — `Χρονικός ορίζοντας` — select — `["Έως 5 έτη", "5 – 10 έτη", "Άνω των 10 ετών"]`
- `monthly` — `Ενδεικτικό μηνιαίο ποσό` — select — `["Έως 100€", "100€ – 300€", "300€ – 500€", "Άνω των 500€"]`

**PET** (Κατοικίδιο)
- `animalType` — `Είδος ζώου` — select — `["Σκύλος", "Γάτα", "Άλλο"]`
- `breed` — `Ράτσα` — text
- `petAge` — `Ηλικία ζώου` — number

### slug → profile map

```ts
export const SLUG_TO_PROFILE: Record<string, keyof typeof PROFILES> = {
  ygeia: "HEALTH",
  zoi: "LIFE_FAMILY",
  oikogeneia: "LIFE_FAMILY",
  katoikia: "HOME",
  "astiki-efthyni": "LIABILITY",
  oxima: "AUTO",
  ependysi: "SAVINGS_INVEST",
  cyber: "CYBER",
  katoikidio: "PET",
  apotamieusi: "SAVINGS_INVEST",
  "epaggelmatikos-xoros": "BUSINESS_PLACE",
  "etairika-oximata": "AUTO",
  "omadiki-asfalisi": "GROUP",
  "metafora-emporeumaton": "CARGO",
};
```

Expose a helper `getQuoteFields(slug: string): QuoteField[]` that returns `[...BASE_TOP, ...profileFields, ...BASE_BOTTOM]`, falling back to `[...BASE_TOP, ...BASE_BOTTOM]` (contact-only) if the slug isn't in the map.

For the two **SAVINGS_INVEST** and the investment case, when rendering the `Επένδυση` (`ependysi`) form, show a short honest disclosure line above the submit button: *"Οι επενδυτικές επιλογές δεν εγγυώνται απόδοση· ο κίνδυνος βαρύνει τον ασφαλισμένο."* This keeps the site informational and consistent with the product-page framing. (You can flag this with a boolean on the profile, e.g. `investmentDisclosure: true`, rather than special-casing the slug in the component.)

---

## 2. `app/components/QuoteForm.tsx` (`"use client"`)

Props: `{ slug: string; productTitle: string; categoryLabel: string }`.

Behaviour:
- Call `getQuoteFields(slug)` and render each field from its descriptor:
  - `text` / `tel` / `email` / `number` → `<input>` with the matching `type`.
  - `select` → `<select>` with a disabled placeholder first option (`Επιλέξτε…`) then `options`.
  - `textarea` → `<textarea rows={4}>`.
  - `checkbox` → an `<input type="checkbox">` beside its (possibly link-containing) label.
- Manage all values in a single `useState` object keyed by field `name`. **No browser storage** (no `localStorage`/`sessionStorage`).
- **Validation on submit:** every `required` field must be non-empty; `email` must match a basic email pattern; `phone` must be at least 8 digits; `consent` must be checked. Show inline Greek error messages under invalid fields (e.g. `Το πεδίο είναι υποχρεωτικό`, `Μη έγκυρο email`) and do not submit until valid.
- **Do NOT use an HTML `<form>` with native submit** if that causes a full page reload; use a button with an `onClick` handler, or a `<form>` with `onSubmit={e => e.preventDefault()}`. Either is fine as long as there's no unintended reload.
- **On successful submit**, replace the form with a Greek success state: a lucide `CheckCircle2` icon + heading `Ευχαριστούμε!` + `Λάβαμε το αίτημά σας. Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.`

### Submission mechanism (no backend)

This project has **no custom backend**, so the form can't POST to our own server. Implement submission as a single isolated function `submitQuote(payload)` with a clearly-marked integration point, and default to the zero-setup option so it works immediately:

- **Default (works with no signup):** build a `mailto:` link — `mailto:REPLACE_WITH_DIMITRIOS_EMAIL?subject=Αίτημα προσφοράς: <productTitle>&body=<all field labels + values, URL-encoded>` — and trigger it on submit. Add `// TODO: replace REPLACE_WITH_DIMITRIOS_EMAIL with the real address`.
- **Recommended before launch (leave commented, with a clear note):** swap `submitQuote` to POST the payload as JSON to a no-backend form service (e.g. Web3Forms or Formspree) so the visitor never leaves the site and submissions arrive reliably by email. Leave a commented stub and a `// TODO` explaining that this needs an access key from the chosen service.

Keep the mailto vs. form-service choice contained entirely inside `submitQuote` so the rest of the component doesn't care which is used.

### Styling
- Match the site: white page, brand-blue accents, Ubuntu Sans, generous spacing, pill-radius submit button in `#1E439A` with white text. Labels `13–14px`, muted grey (`#4b5563`); inputs full-width with `1px solid #d8dce4`, `10px` radius, `12px 14px` padding, `15px` font; focus state with a blue border. Keep it clean and single-column, max width ~`560px`, centered.
- Submit button label: `Αποστολή αιτήματος`.

---

## 3. `app/prosfora/[slug]/page.tsx`

Mirror the existing product route pattern. Resolve the product across **all** product arrays so any slug works and we can show the correct title:

```tsx
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import QuoteForm from "../../components/QuoteForm";
import { IDIWTES_PRODUCTS, EXTRA_IDIWTES_PAGES, EPIXEIRISI_PRODUCTS } from "../../components/products";

const ALL = [...IDIWTES_PRODUCTS, ...EXTRA_IDIWTES_PAGES, ...EPIXEIRISI_PRODUCTS];

export function generateStaticParams() {
  // de-duplicate slugs (astiki-efthyni & cyber appear twice)
  const slugs = Array.from(new Set(ALL.map((p) => p.slug)));
  return slugs.map((slug) => ({ slug }));
}

export default async function ProsforaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = ALL.find((p) => p.slug === slug);
  if (!product) notFound();


  return (
    <main style={{ fontFamily: "var(--font-ubuntu-sans), sans-serif", background: "#fff", color: "#1a1a1a", minHeight: "100vh" }}>
      <Navbar />
      {/* Breadcrumb: 🏠 > product title > Προσφορά — reuse the same breadcrumb pattern from ProductPageContent */}
      {/* Heading: e.g. "Ζητήστε προσφορά για <product.title>" */}
      <QuoteForm slug={slug} productTitle={product.title} categoryLabel="" />
    </main>
  );
}
```

Add a page heading above the form, e.g. `Ζητήστε προσφορά για {product.title}` with a short subline `Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας με μια εξατομικευμένη προσφορά.` Add the same breadcrumb strip used on product pages, with a third crumb: `🏠 > {product.title} > Προσφορά`.

---

## Verification checklist

1. `npm run dev` — no TypeScript errors.
2. From a product page, clicking `Ζητήστε Προσφορά` **and** `Με ενδιαφέρει` both open `/prosfora/<slug>`.
3. The form fields change by product: check `/prosfora/ygeia` (age, coverage type…), `/prosfora/epaggelmatikos-xoros` (company name, turnover…), `/prosfora/oxima` (vehicle type, make/model…), `/prosfora/astiki-efthyni` (the Ιδιώτης/Επιχείρηση selector appears).
4. Submitting with empty required fields or unchecked consent shows Greek errors and blocks submit.
5. A valid submit shows the `Ευχαριστούμε!` success state.
6. `/prosfora/ependysi` shows the no-guaranteed-return disclosure line.
7. No duplicate-slug warning from `generateStaticParams`.
8. Greek renders correctly; no browser-storage APIs used.

## Commit

```
git add -A
git commit -m "Add product-specific quote request form at /prosfora/[slug]"
git push
```

---

## Open items to hand back (not for Claude Code to guess)

- Dimitrios's real email for the `mailto:` fallback (or the decision to use Web3Forms/Formspree instead).
- A **Πολιτική Απορρήτου** (`/politiki-aporritou`) page — legally required before the form goes live.