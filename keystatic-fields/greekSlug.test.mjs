import { greekSlug, uniqueGreekSlug } from "./greekSlug.ts";

const cases = [
  ["Εταιρικά Οχήματα", "etairika-oximata"],
  ["Μεταφορά Εμπορευμάτων", "metafora-emporeumaton"],
  ["Ομαδική Ασφάλιση", "omadiki-asfalisi"],
  ["Αποταμίευση", "apotamieusi"],
  ["Έργα Τέχνης", "erga-texnis"],
  ["Κατά Παντός Κινδύνου", "kata-pantos-kindynou"],
  ["Κατοικία", "katoikia"],
  ["Νομική Προστασία", "nomiki-prostasia"],
  ["Οικογένεια", "oikogeneia"],
  ["Όχημα", "oxima"],
  ["Σκάφη", "skafi"],
  ["Υγεία", "ygeia"],
  ["Cyber Edge", "cyber-edge"],
  ["hello world", "hello-world"],
  ["Ασφάλιση Cyber", "asfalisi-cyber"],
  ["Αστική Ευθύνη", "astiki-euthyni"],
  ["  Πολλά   κενά  ", "polla-kena"],
  ["Ψάρια & Θάλασσα", "psaria-thalassa"],
  ["Βαγγέλης 2024", "vaggelis-2024"],
  ["", ""],
  ["!!!", ""],
];

let fail = 0;
for (const [input, expected] of cases) {
  const got = greekSlug(input);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  "${input}" -> "${got}"${ok ? "" : `   EXPECTED "${expected}"`}`);
}
console.log("\n--- uniqueness ---");
console.log('  collision  ->', uniqueGreekSlug("Ασφάλιση Cyber", ["asfalisi-cyber"]));
console.log('  double     ->', uniqueGreekSlug("Κατοικία", ["katoikia", "katoikia-2"]));
console.log('  free       ->', uniqueGreekSlug("Υγεία", []));
console.log(`\n${fail === 0 ? "ALL PASS" : fail + " FAILING"}`);
