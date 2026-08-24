import {
  Users, Heart, HeartPulse, Stethoscope, Hospital, Ambulance, Baby, PawPrint,
  Car, Bike, Bus, Caravan, Truck, Plane, Sailboat, Ship, Container, Package,
  Home, Building2, Hotel, Palette, Umbrella,
  Briefcase, Store, Factory, Warehouse, HardHat, Handshake, Scale, Gavel,
  PiggyBank, TrendingUp,
  Laptop, Smartphone, Lock, Fingerprint, ShieldCheck, ShieldAlert,
  Flame, Droplets, Zap, TreePine, Leaf,
  type LucideIcon,
} from "lucide-react";

// The icon vocabulary exposed to the CMS, and the single source of truth for
// it: keystatic-fields/iconField.tsx builds the admin picker from these keys,
// so adding an icon here is enough to offer it to editors. `satisfies` rather
// than a `Record<string, LucideIcon>` annotation so the keys stay literal and
// `IconName` can constrain the picker's grouping table.
export const ICON_MAP = {
  Users, Heart, HeartPulse, Stethoscope, Hospital, Ambulance, Baby, PawPrint,
  Car, Bike, Bus, Caravan, Truck, Plane, Sailboat, Ship, Container, Package,
  Home, Building2, Hotel, Palette, Umbrella,
  Briefcase, Store, Factory, Warehouse, HardHat, Handshake, Scale, Gavel,
  PiggyBank, TrendingUp,
  Laptop, Smartphone, Lock, Fingerprint, ShieldCheck, ShieldAlert,
  Flame, Droplets, Zap, TreePine, Leaf,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

/** Resolve a CMS icon name to its component; a typo falls back to ShieldCheck
 *  instead of crashing the build. The cast is what lets an arbitrary string be
 *  looked up against the literal-keyed map above. */
export function iconForName(name: string): LucideIcon {
  return (ICON_MAP as Record<string, LucideIcon>)[name] ?? ShieldCheck;
}
