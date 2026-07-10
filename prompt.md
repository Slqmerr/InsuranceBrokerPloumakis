# Task for Claude Code — Prompt 16: Footer Socials, Terms Page, New Products, Card Strip, Partnership Page

This prompt covers 5 independent tasks. They touch different files and don't depend on
each other — do them in any order, and if one runs into trouble, skip it and continue
with the rest rather than stopping.

Read `REPO-STRUCTURE.md` at the repo root first if you haven't already, for the current
file layout and conventions (inline styles only, `var(--font-ubuntu-sans), sans-serif`,
brand blue `#1E439A`, deep navy `#0F2660`, lucide-react icons).

---

## 1. Footer — social icons (no links yet)

**File:** `app/components/Footer.tsx`

Add two icon links — Facebook and LinkedIn — near the existing contact info in the first
footer column (below the phone/email/address block, or wherever fits the existing layout
best). Use the `Facebook` and `Linkedin` icons from `lucide-react`, styled consistently
with the existing contact icons in that column (same size/stroke conventions already used
for the Phone/Mail/MapPin icons there).

Do **not** invent real URLs. Use these exact placeholder hrefs so they're easy to find and
swap later:

```
href="REPLACE_WITH_FACEBOOK_URL"
href="REPLACE_WITH_LINKEDIN_URL"
```

(This matches the existing `REPLACE_WITH_DIMITRIOS_EMAIL` placeholder convention already
used elsewhere in the project — grep for it if you want to see the pattern.)

Also add the business hours to the same column, using a `Clock` icon in the same style as
the other contact rows. Exact text:

```
Δευτέρα – Παρασκευή: 9:00 – 21:00
```

---

## 2. New page — Όροι Χρήσης (Terms of Use)

**New file:** `app/oroi-xrisis/page.tsx`
**Also edit:** `app/components/Footer.tsx`

Create a new page at the route `/oroi-xrisis`. Follow the same overall page pattern used
by other standalone pages in the app (e.g. `app/emeis/page.tsx`): render `<Navbar />` at
the top, `<Footer />` at the bottom, and the page content in between as a simple centered
article — a max-width reading column, generous line-height, headings styled consistently
with the rest of the site (Ubuntu Sans, brand blue for the H1). No fancy layout needed,
this is a plain content page.

There is no shared "legal page" component in the codebase to reuse — just build this page
directly.

Use this exact Greek copy, reproduced as-is (don't translate, paraphrase, or shorten it).
Keep the bracketed placeholder exactly as written — it's intentional, for Dimitrios to
fill in later, not a mistake to "complete":

```
Όροι Χρήσης

Καλωσορίσατε στην ιστοσελίδα του Δημήτριου Πλουμάκη (dploumakis.gr). Η χρήση της
ιστοσελίδας συνεπάγεται την αποδοχή των παρακάτω όρων.

1. Σκοπός της ιστοσελίδας
Η παρούσα ιστοσελίδα έχει ενημερωτικό χαρακτήρα. Παρουσιάζει ασφαλιστικά προϊόντα και
υπηρεσίες, χωρίς να αποτελεί πρόταση ασφάλισης, ούτε να καταρτίζεται οποιαδήποτε
ασφαλιστική σύμβαση μέσω αυτής. Οι όροι, οι καλύψεις και το κόστος κάθε ασφαλιστικού
προγράμματος καθορίζονται αποκλειστικά από την εκάστοτε ασφαλιστική εταιρεία και
οριστικοποιούνται κατόπιν προσωπικής επικοινωνίας.

2. Πνευματική ιδιοκτησία
Το περιεχόμενο της ιστοσελίδας (κείμενα, εικόνες, λογότυπο) προστατεύεται από τη
νομοθεσία περί πνευματικής ιδιοκτησίας. Απαγορεύεται η αναπαραγωγή ή διανομή του χωρίς
προηγούμενη έγγραφη άδεια.

3. Ακρίβεια περιεχομένου
Καταβάλλεται κάθε δυνατή προσπάθεια ώστε οι πληροφορίες να είναι ακριβείς και
ενημερωμένες. Ωστόσο, δεδομένου ότι οι όροι των ασφαλιστικών προγραμμάτων ενδέχεται να
μεταβάλλονται, δεν παρέχεται εγγύηση πληρότητας ή επικαιρότητας του περιεχομένου. Για
δεσμευτικές πληροφορίες, ο επισκέπτης παραπέμπεται στα επίσημα έγγραφα κάθε ασφαλιστικής
εταιρείας ή σε προσωπική επικοινωνία.

4. Περιορισμός ευθύνης
Ο ιδιοκτήτης της ιστοσελίδας δεν φέρει ευθύνη για τυχόν ζημία που προκύψει από τη χρήση ή
την αδυναμία χρήσης της ιστοσελίδας, ή από απόφαση που βασίστηκε αποκλειστικά στο
περιεχόμενό της χωρίς προηγούμενη προσωπική διαβούλευση.

5. Σύνδεσμοι προς τρίτους ιστότοπους
Η ιστοσελίδα ενδέχεται να περιλαμβάνει συνδέσμους προς ιστότοπους τρίτων (π.χ.
ασφαλιστικές εταιρείες). Δεν φέρουμε ευθύνη για το περιεχόμενο ή τις πρακτικές αυτών των
ιστότοπων.

6. Εφαρμοστέο δίκαιο
Οι παρόντες όροι διέπονται από το Ελληνικό δίκαιο. Για κάθε διαφορά που τυχόν προκύψει,
αρμόδια είναι τα Δικαστήρια Ηρακλείου.

7. Στοιχεία επικοινωνίας
Δημήτριος Πλουμάκης
[ΣΥΜΠΛΗΡΩΣΤΕ: αριθμός μητρώου ασφαλιστικού διαμεσολαβητή / εποπτεύουσα αρχή]
Κυδωνίας 8 & Ανδρεαδάκη, 71202 Ηράκλειο
2810 326 400

8. Τροποποιήσεις
Οι παρόντες όροι ενδέχεται να αναθεωρούνται περιοδικά. Η τελευταία ενημέρωση αναγράφεται
παρακάτω.

Τελευταία ενημέρωση: [ημερομηνία]
```

Add a short, visually distinct note near the top of the page (a styled callout box, not
just plain text) saying this content should be reviewed by a qualified legal professional
and the bracketed placeholders completed before the site goes live — same idea as the
review notice already used on other legal-adjacent content in this project, if you can
find that pattern to match its style.

**Footer link wiring:** update the "Όροι Χρήσης" link in `Footer.tsx` to point to
`/oroi-xrisis` instead of `#`. Leave the "Πολιτική Απορρήτου" link as `#` for now — that
page isn't part of this prompt.

---

## 3. Two new products — Σκάφη (Boats) and Ταξίδι (Travel)

**File:** `app/components/products.ts`

Add two new entries to the `IDIWTES_PRODUCTS` array (append at the end), following the
exact same object shape as the existing entries (icon, title, slug, color, image, intro,
description, covers, needs). Import `Sailboat` and `Plane` from `lucide-react` for the
icons. Use `color: "#0ea5e9"` for Σκάφη and `color: "#f59e0b"` for Ταξίδι — both unused so
far in this file. Use slugs `"skafi"` and `"taxidi"`, and image paths
`/products/skafi.jpg` and `/products/taxidi.jpg` (these image files don't exist yet — that's
expected, they'll be added later; don't let a missing image block anything).

No new route file is needed — the existing `app/idiotes/[slug]/page.tsx` dynamic route
picks up any product added to `IDIWTES_PRODUCTS` automatically, including its own detail
page and its quote-request page.

Use this exact Greek copy:

**Σκάφη**
```
intro: Η υποχρεωτική Αστική Ευθύνη σκάφους, και πολλά περισσότερα, για να απολαμβάνετε τη
θάλασσα με ασφάλεια.

description: Η ασφάλιση σκάφους αναψυχής καλύπτει, πρώτα απ' όλα, την Αστική Ευθύνη προς
τρίτους και επιβαίνοντες, που είναι υποχρεωτική από τον νόμο (Ν.4926/2022) για όλα τα
ταχύπλοα ιδιωτικά και επαγγελματικά σκάφη αναψυχής. Πέρα από αυτήν, προγράμματα με
διαβαθμισμένα επίπεδα κάλυψης προσφέρουν επιπλέον προστασία — από νομική υποστήριξη και
ιατρική βοήθεια για τους επιβαίνοντες, έως κάλυψη ιδίων ζημιών του σκάφους.

covers:
- Αστική ευθύνη προς τρίτους και επιβαίνοντες (υποχρεωτική κάλυψη βάσει Ν.4926/2022)
- Νομική προστασία για υποθέσεις σχετικές με το σκάφος
- Άμεση ιατρική βοήθεια για τους επιβαίνοντες, 24 ώρες το 24ωρο
- Προαιρετική κάλυψη ιδίων ζημιών: πυρκαγιά, έκρηξη, κλοπή, κακόβουλες πράξεις
- Κίνδυνοι της θάλασσας και ζημιές κατά την οδική μεταφορά του σκάφους
- Διαβάθμιση κάλυψης ανάλογα με τις ανάγκες σας (ιδιωτική ή επαγγελματική χρήση)

needs:
- Στοιχεία σκάφους (τύπος, μήκος, ιπποδύναμη)
- Χρήση: ιδιωτική ή επαγγελματική
- Επιθυμητό επίπεδο κάλυψης πέρα από την υποχρεωτική Αστική Ευθύνη
```

**Ταξίδι**
```
intro: Ηρεμία σε κάθε ταξίδι, στην Ελλάδα και στο εξωτερικό — από μια καθυστερημένη
πτήση έως ένα απρόοπτο ιατρικό περιστατικό.

description: Η ταξιδιωτική ασφάλιση αναλαμβάνει τα απρόοπτα που μπορεί να προκύψουν πριν
ή κατά τη διάρκεια ενός ταξιδιού: από ένα επείγον ιατρικό περιστατικό στο εξωτερικό, μέχρι
καθυστέρηση πτήσης ή απώλεια αποσκευών. Τα προγράμματα προσαρμόζονται στον προορισμό, τη
διάρκεια και τον σκοπό του ταξιδιού σας, είτε πρόκειται για διακοπές, επαγγελματική
μετακίνηση ή ταξίδι που απαιτεί θεώρηση Schengen.

covers:
- Επείγοντα ιατρικά έξοδα στο εξωτερικό, με 24ωρη τηλεφωνική υποστήριξη
- Καθυστέρηση ή απώλεια αποσκευών
- Ακύρωση ή διακοπή ταξιδιού λόγω ασθένειας, ατυχήματος ή έκτακτου περιστατικού
- Απώλεια ή κλοπή ταξιδιωτικών εγγράφων
- Κάλυψη που πληροί τις προϋποθέσεις για έκδοση θεώρησης Schengen
- Προγράμματα προσαρμοσμένα σε ατομικά, οικογενειακά ή επαγγελματικά ταξίδια

needs:
- Προορισμός και διάρκεια ταξιδιού
- Αριθμός και ηλικίες ταξιδιωτών
- Σκοπός ταξιδιού (διακοπές, επαγγελματικό, σπουδές)
```

**Also in this file — move Οικογένεια, don't delete it:**

Find the existing "Οικογένεια" product object inside `IDIWTES_PRODUCTS` (title:
"Οικογένεια", slug: "oikogeneia"). Cut it out of `IDIWTES_PRODUCTS` and paste it, unchanged,
into the `EXTRA_IDIWTES_PAGES` array instead. This removes it from the dropdown menu while
keeping its detail page alive at `/idiotes/oikogeneia` (that array exists specifically for
products with a page but no dropdown entry — see the comment already above
`EXTRA_IDIWTES_PAGES` in this file explaining that pattern; the "Αποταμίευση" entry already
works this way).

**Also in this file — update `PRODUCT_CARDS`** (the homepage's 6-card strip):
- Remove the "Οικογένεια" entry entirely.
- Add a new "Ταξίδι" entry, `href: "/idiotes/taxidi"`, using the same icon/color you gave
  it above.
- Reorder the array so "Υγεία" is first.

End result should be 6 cards, in this order: Υγεία, Κατοικία, Οχήματα, Επιχείρηση,
Αποταμίευση, Ταξίδι. (I'm assuming that relative order for the untouched four cards is
fine — flag it to Ploum if a different order was intended.)

---

## 4. New nav item — Συνεργάσου μαζί μας

**File:** `app/components/Navbar.tsx`

Add a fourth item to the centered nav list, after "Καριέρα". Follow the exact same pattern
already used for the "Καριέρα" link — a plain `motion` link, no dropdown, same hover/tap
animation, same font size and spacing as the other three items. Link it to a new route,
`/synergasia`. Label text: `Συνεργάσου μαζί μας`.

Check that four items still fit comfortably in the centered nav area at the current font
size — if it looks cramped, use your judgment on minor spacing adjustments, but don't
change the 3-zone grid layout of the navbar itself.

---

## 5. New page — Συνεργάσου μαζί μας (Partnership)

**New file:** `app/synergasia/page.tsx`

Same page pattern as the Terms of Use page in section 2 — `<Navbar />`, centered content,
`<Footer />`. This is a short, simple page, not a long article.

Use this exact Greek copy:

```
Συνεργαστείτε μαζί μας

Αν είστε επαγγελματίας στον χώρο της ασφάλισης και αναζητάτε ένα δίκτυο συνεργασίας με
τεχνογνωσία, υποστήριξη και σταθερές βάσεις, ο Δημήτριος Πλουμάκης σας καλωσορίζει να
συζητήσετε μια συνεργασία. Με πάνω από 25 χρόνια εμπειρίας στον ασφαλιστικό κλάδο,
προσφέρουμε στους συνεργάτες μας τεχνική υποστήριξη, πρόσβαση σε κορυφαίες ασφαλιστικές
εταιρείες και ένα σταθερό πλαίσιο ανάπτυξης.
```

Below that, a single CTA button linking to `/epikoinonia`, styled like the other primary
CTA buttons already used across the site (brand blue background, white text, pill shape).
Button text: `Επικοινωνήστε μαζί μας`.

This is a first draft of the copy — it's deliberately generic since the exact partnership
terms weren't specified. Dimitrios should review and adjust the specifics before launch.

---

## Constraints (apply to all 5 sections)

- Inline styles only — no Tailwind, no CSS modules.
- Reproduce all Greek copy exactly as given above — no translating, paraphrasing, or
  "improving" it.
- Don't touch the Privacy Policy, the English-language question, the homepage's main
  image, or the mislabeled "Καριέρα → /emeis" link — none of those are part of this prompt.
- Match existing design tokens: `var(--font-ubuntu-sans), sans-serif`, brand blue
  `#1E439A`, deep navy `#0F2660`, lucide-react icons at `strokeWidth={1.75}` where
  consistent with existing usage.
- Run `npm run dev` afterward and check: the footer (socials + hours), `/oroi-xrisis`,
  `/synergasia`, the navbar with 4 items, the homepage card strip (6 cards, new order),
  and the two new product pages `/idiotes/skafi` and `/idiotes/taxidi` — plus confirm
  `/idiotes/oikogeneia` still loads even though it's no longer in the dropdown or the
  homepage strip.