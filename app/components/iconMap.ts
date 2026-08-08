import {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
  Sailboat, Plane, Palette, Gavel, Umbrella,
  type LucideIcon,
} from "lucide-react";

// The icon vocabulary exposed to the CMS. Must stay in sync with the
// iconName select options in keystatic.config.ts.
export const ICON_MAP: Record<string, LucideIcon> = {
  Users, Home, Car, Heart, Briefcase, PiggyBank,
  Leaf, Scale, TrendingUp, ShieldCheck, PawPrint,
  Building2, Truck, ShieldAlert, Package,
  Sailboat, Plane, Palette, Gavel, Umbrella,
};

/** Resolve a CMS icon name to its component; a typo falls back to ShieldCheck
 *  instead of crashing the build. */
export function iconForName(name: string): LucideIcon {
  return ICON_MAP[name] ?? ShieldCheck;
}
