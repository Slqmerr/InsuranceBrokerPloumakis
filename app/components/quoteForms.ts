// Data-driven quote forms: every product form = BASE_TOP (contact details)
// + the product profile's fields + BASE_BOTTOM (message + GDPR consent).
// Adding a product later = one line in SLUG_TO_PROFILE.

export type QuoteField = {
  name: string; // unique key, e.g. "age"
  label: string; // Greek label shown to the user
  type: "text" | "tel" | "email" | "number" | "select" | "textarea" | "checkbox";
  required?: boolean;
  options?: string[]; // only for type "select"
  placeholder?: string;
  link?: { text: string; href: string }; // substring of label rendered as a link
};

type QuoteProfile = {
  fields: QuoteField[];
  // Honest no-guaranteed-return line, shown above the submit button
  investmentDisclosure?: boolean;
};

export const BASE_TOP: QuoteField[] = [
  { name: "firstName", label: "Όνομα", type: "text", required: true },
  { name: "lastName", label: "Επώνυμο", type: "text", required: true },
  { name: "phone", label: "Τηλέφωνο (Κινητό ή Σταθερό)", type: "tel", required: true },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "area", label: "Περιοχή / Πόλη", type: "text" },
  {
    name: "contactPref",
    label: "Προτιμώμενος τρόπος επικοινωνίας",
    type: "select",
    options: ["Τηλέφωνο", "Email", "SMS / Viber"],
  },
];

export const BASE_BOTTOM: QuoteField[] = [
  { name: "message", label: "Πρόσθετες πληροφορίες / Σχόλια", type: "textarea" },
  {
    name: "consent",
    label:
      "Συναινώ στην επεξεργασία των στοιχείων μου για την αποστολή προσφοράς, σύμφωνα με την Πολιτική Απορρήτου.",
    type: "checkbox",
    required: true, // GDPR — collecting personal data requires explicit consent
    // TODO: create the Privacy Policy page
    link: { text: "Πολιτική Απορρήτου", href: "/politiki-aporritou" },
  },
];

export const PROFILES: Record<string, QuoteProfile> = {
  HEALTH: {
    fields: [
      { name: "age", label: "Ηλικία", type: "number", required: true },
      { name: "peopleCount", label: "Άτομα προς ασφάλιση", type: "number" },
      {
        name: "coverageType",
        label: "Τύπος κάλυψης που σας ενδιαφέρει",
        type: "select",
        options: ["Νοσοκομειακή", "Εξωνοσοκομειακή", "Και τα δύο"],
      },
      { name: "existingCover", label: "Έχετε ήδη ασφάλιση υγείας;", type: "select", options: ["Ναι", "Όχι"] },
      { name: "smoker", label: "Καπνιστής / -τρια;", type: "select", options: ["Ναι", "Όχι"] },
    ],
  },
  LIFE_FAMILY: {
    fields: [
      { name: "age", label: "Ηλικία", type: "number", required: true },
      { name: "dependents", label: "Αριθμός εξαρτώμενων μελών", type: "number" },
      {
        name: "goal",
        label: "Κύριος στόχος",
        type: "select",
        options: [
          "Προστασία οικογένειας",
          "Κάλυψη δανείου / στεγαστικού",
          "Εισοδηματική προστασία",
          "Αποταμίευση για τα παιδιά",
        ],
      },
      {
        name: "coverAmount",
        label: "Επιθυμητό κεφάλαιο κάλυψης",
        type: "select",
        options: [
          "Έως 50.000€",
          "50.000€ – 100.000€",
          "100.000€ – 200.000€",
          "Άνω των 200.000€",
          "Δεν είμαι σίγουρος/-η",
        ],
      },
    ],
  },
  AUTO: {
    fields: [
      {
        name: "vehicleType",
        label: "Τύπος οχήματος",
        type: "select",
        options: ["Επιβατικό", "Μοτοσικλέτα", "Επαγγελματικό / Φορτηγό", "Στόλος οχημάτων"],
      },
      { name: "makeModel", label: "Μάρκα & Μοντέλο", type: "text" },
      { name: "year", label: "Έτος πρώτης κυκλοφορίας", type: "number" },
      { name: "use", label: "Χρήση οχήματος", type: "select", options: ["Ιδιωτική", "Επαγγελματική"] },
      {
        name: "coverLevel",
        label: "Επιθυμητή κάλυψη",
        type: "select",
        options: [
          "Βασική (υποχρεωτική αστική ευθύνη)",
          "Μερική (πυρός / κλοπής)",
          "Μικτή (ιδίων ζημιών)",
        ],
      },
    ],
  },
  HOME: {
    fields: [
      {
        name: "propertyType",
        label: "Τύπος κατοικίας",
        type: "select",
        options: ["Διαμέρισμα", "Μονοκατοικία", "Εξοχική κατοικία"],
      },
      { name: "sqm", label: "Τετραγωνικά μέτρα", type: "number" },
      { name: "ownership", label: "Ιδιοκτήτης ή ενοικιαστής;", type: "select", options: ["Ιδιοκτήτης", "Ενοικιαστής"] },
      { name: "buildYear", label: "Έτος κατασκευής", type: "number" },
      { name: "security", label: "Υπάρχει συναγερμός / μέτρα ασφαλείας;", type: "select", options: ["Ναι", "Όχι"] },
    ],
  },
  BUSINESS_PLACE: {
    fields: [
      { name: "companyName", label: "Επωνυμία επιχείρησης", type: "text", required: true },
      { name: "activity", label: "Κλάδος / Δραστηριότητα", type: "text", required: true },
      { name: "employees", label: "Αριθμός εργαζομένων", type: "number" },
      { name: "sqm", label: "Τετραγωνικά μέτρα χώρου", type: "number" },
      {
        name: "turnover",
        label: "Ετήσιος τζίρος",
        type: "select",
        options: [
          "Έως 100.000€",
          "100.000€ – 500.000€",
          "500.000€ – 1εκ.€",
          "Άνω του 1εκ.€",
          "Προτιμώ να μην απαντήσω",
        ],
      },
    ],
  },
  GROUP: {
    fields: [
      { name: "companyName", label: "Επωνυμία επιχείρησης", type: "text", required: true },
      { name: "employees", label: "Αριθμός εργαζομένων προς κάλυψη", type: "number", required: true },
      { name: "activity", label: "Κλάδος / Δραστηριότητα", type: "text" },
      {
        name: "desiredCover",
        label: "Επιθυμητές καλύψεις",
        type: "select",
        options: ["Ζωή", "Υγεία", "Ζωή & Υγεία", "Σύνταξη / Αποταμίευση"],
      },
    ],
  },
  CARGO: {
    fields: [
      { name: "companyName", label: "Επωνυμία επιχείρησης", type: "text", required: true },
      { name: "goodsType", label: "Είδος εμπορευμάτων", type: "text", required: true },
      {
        name: "transportMode",
        label: "Τρόπος μεταφοράς",
        type: "select",
        options: ["Οδικώς", "Θαλάσσια", "Αεροπορικά", "Συνδυασμένη"],
      },
      {
        name: "frequency",
        label: "Συχνότητα αποστολών",
        type: "select",
        options: ["Περιστασιακά", "Τακτικά", "Καθημερινά"],
      },
      { name: "cargoValue", label: "Ενδεικτική αξία ανά αποστολή", type: "text" },
    ],
  },
  LIABILITY: {
    fields: [
      {
        name: "audience",
        label: "Αφορά ιδιώτη ή επιχείρηση;",
        type: "select",
        options: ["Ιδιώτης", "Επιχείρηση"],
        required: true,
      },
      { name: "activity", label: "Δραστηριότητα / πλαίσιο ευθύνης", type: "text" },
      { name: "employees", label: "Αριθμός εργαζομένων (εφόσον αφορά επιχείρηση)", type: "number" },
    ],
  },
  CYBER: {
    fields: [
      {
        name: "audience",
        label: "Αφορά ιδιώτη ή επιχείρηση;",
        type: "select",
        options: ["Ιδιώτης", "Επιχείρηση"],
        required: true,
      },
      { name: "employees", label: "Αριθμός εργαζομένων (εφόσον αφορά επιχείρηση)", type: "number" },
      {
        name: "dataSensitivity",
        label: "Διαχειρίζεστε δεδομένα πελατών ή online συναλλαγές;",
        type: "select",
        options: ["Ναι", "Όχι", "Εν μέρει"],
      },
    ],
  },
  SAVINGS_INVEST: {
    investmentDisclosure: true,
    fields: [
      { name: "age", label: "Ηλικία", type: "number" },
      {
        name: "goal",
        label: "Στόχος",
        type: "select",
        options: ["Σύνταξη", "Αποταμίευση για τα παιδιά", "Δημιουργία κεφαλαίου", "Άλλο"],
      },
      {
        name: "horizon",
        label: "Χρονικός ορίζοντας",
        type: "select",
        options: ["Έως 5 έτη", "5 – 10 έτη", "Άνω των 10 ετών"],
      },
      {
        name: "monthly",
        label: "Ενδεικτικό μηνιαίο ποσό",
        type: "select",
        options: ["Έως 100€", "100€ – 300€", "300€ – 500€", "Άνω των 500€"],
      },
    ],
  },
  PET: {
    fields: [
      { name: "animalType", label: "Είδος ζώου", type: "select", options: ["Σκύλος", "Γάτα", "Άλλο"] },
      { name: "breed", label: "Ράτσα", type: "text" },
      { name: "petAge", label: "Ηλικία ζώου", type: "number" },
    ],
  },
  // General contact page (/epikoinonia) — questions & appointments, no product
  CONTACT: {
    fields: [
      {
        name: "reason",
        label: "Τι σας ενδιαφέρει;",
        type: "select",
        options: ["Ερώτηση", "Κλείσιμο ραντεβού", "Προσφορά"],
        required: true,
      },
    ],
  },
  // Recruitment page (/synergasia) — people who want to join the network as
  // insurance advisors, not a product quote
  SYNERGASIA: {
    fields: [
      {
        name: "profileStatus",
        label: "Η τρέχουσα κατάστασή σας",
        type: "select",
        required: true,
        options: [
          "Χωρίς εμπειρία στην ασφάλιση",
          "Με εμπειρία σε πωλήσεις / εξυπηρέτηση",
          "Ήδη στον ασφαλιστικό κλάδο",
          "Πιστοποιημένος/-η ασφαλιστικός διαμεσολαβητής",
        ],
      },
      {
        name: "availability",
        label: "Διαθεσιμότητα",
        type: "select",
        options: [
          "Πλήρης απασχόληση",
          "Μερική απασχόληση",
          "Ως δεύτερη δραστηριότητα",
          "Δεν είμαι σίγουρος/-η ακόμη",
        ],
      },
      { name: "motivation", label: "Τι σας ενδιαφέρει στη συνεργασία;", type: "text" },
    ],
  },
};

export const SLUG_TO_PROFILE: Record<string, keyof typeof PROFILES> = {
  ygeia: "HEALTH",
  zoi: "LIFE_FAMILY",
  oikogeneia: "LIFE_FAMILY",
  katoikia: "HOME",
  "astiki-efthyni": "LIABILITY",
  motosikleta: "AUTO",
  aftokinito: "AUTO",
  ependysi: "SAVINGS_INVEST",
  cyber: "CYBER",
  katoikidio: "PET",
  apotamieusi: "SAVINGS_INVEST",
  "epaggelmatikos-xoros": "BUSINESS_PLACE",
  "etairika-oximata": "AUTO",
  "omadiki-asfalisi": "GROUP",
  "metafora-emporeumaton": "CARGO",
  epikoinonia: "CONTACT",
  synergasia: "SYNERGASIA",
};

const profileFor = (slug: string): QuoteProfile | undefined => PROFILES[SLUG_TO_PROFILE[slug]];

// Unknown slug → contact-only form, never a crash
export function getQuoteFields(slug: string): QuoteField[] {
  return [...BASE_TOP, ...(profileFor(slug)?.fields ?? []), ...BASE_BOTTOM];
}

export function hasInvestmentDisclosure(slug: string): boolean {
  return profileFor(slug)?.investmentDisclosure === true;
}
