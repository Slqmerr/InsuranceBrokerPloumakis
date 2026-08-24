// Icon name ↔ component translation for data that crosses the server/client
// boundary.
//
// Why this exists: the navbar and the /asfaleies index are client components,
// but their product list is now read from the CMS on the server. lucide-react
// ships without a "use client" directive, so its icon components are server
// functions and CANNOT be passed as props into a client component — React has
// no way to serialize them. Only the *name* can cross, and the client resolves
// it back to a component here.
import {
  BriefcaseBusiness, PackageCheck, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ICON_MAP } from "./iconMap";

// ICON_MAP is the vocabulary offered to editors in the CMS icon picker. These
// two are used only by the hardcoded astiki-efthyni hub family in products.ts
// and are deliberately NOT in ICON_MAP: adding them there would make them
// appear in the editor's picker (iconField shows every ICON_MAP key, grouped
// or under "Λοιπά"), which is a change to what Dimitrios can choose — not
// something a nav refactor should do as a side effect.
//
// `Hotel` used to sit here for the same reason. It moved into ICON_MAP when the
// ξενοδοχεία/Airbnb product was added, and stays there now that the product is
// gone: ICON_MAP is a general vocabulary rather than a list of icons in use —
// most of its entries belong to no product — so pulling `Hotel` back out would
// only narrow what Dimitrios can choose, for nothing.
const NAV_ONLY_ICONS = { BriefcaseBusiness, PackageCheck };

export const NAV_ICON_MAP: Record<string, LucideIcon> = {
  ...ICON_MAP,
  ...NAV_ONLY_ICONS,
};

// Component → name. Built once at module load. Identity-keyed: lucide exports
// one stable component object per icon, so this is a reliable reverse lookup
// for the hardcoded entries in products.ts, which carry components rather than
// the names CMS entries store.
const NAME_BY_COMPONENT = new Map<LucideIcon, string>(
  Object.entries(NAV_ICON_MAP).map(([name, component]) => [component, name])
);

/** Name for a hardcoded product's icon component. Falls back to ShieldCheck's
 *  name for an icon nobody registered, matching iconForName()'s tolerance —
 *  a missing icon shouldn't blank out a navbar entry. */
export function navIconName(icon: LucideIcon): string {
  return NAME_BY_COMPONENT.get(icon) ?? "ShieldCheck";
}

/** Component for a name, client-side. Same fallback in the other direction. */
export function navIconFor(name: string): LucideIcon {
  return NAV_ICON_MAP[name] ?? ShieldCheck;
}
