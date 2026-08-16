// Re-encodes the photos in public/ in place, so the image optimizer has a small
// source to work from.
//
// Nothing on the site ever renders a photo wider than 2048px — that is the
// largest entry in `images.deviceSizes` — so anything bigger is pixels the
// optimizer decodes and then throws away on every cold transform. Straight off
// the camera these are 5-6k wide and 8-14MB, which is what makes the first
// request for a given width slow.
//
// mozjpeg at q78 is visually indistinguishable from the source once next/image
// has re-encoded it to WebP at q75, so the only thing lost is transform time.
//
// Run it after dropping new photos into public/ (it is a no-op on files that
// are already within budget):
//   node scripts/optimize-photos.mjs
//   node scripts/optimize-photos.mjs --dry-run
//
// Uses sharp, which ships with Next, so this is a local dev utility rather than
// a build step — the shrunk files are committed and CI never runs this.

import { readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";

// The largest width any layout asks for, matching images.deviceSizes in
// next.config.ts. Applied to the long edge so portrait photos keep enough
// detail for the tall crops they sit in.
const MAX_EDGE = 2048;
const QUALITY = 78;

const DIRS = ["public", "public/products"];
// Logos are flat-colour PNG/SVG and already tiny; re-encoding them as JPEG
// would wreck their transparency.
const PHOTO = /\.jpe?g$/i;

const dryRun = process.argv.includes("--dry-run");
const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

let before = 0;
let after = 0;

for (const dir of DIRS) {
  for (const name of readdirSync(dir).sort()) {
    const src = join(dir, name);
    if (!PHOTO.test(name) || !statSync(src).isFile()) continue;

    const sizeBefore = statSync(src).size;
    // Cameras hand these over as .JPG; Vercel builds on a case-sensitive
    // filesystem, so an import of "./x.jpg" that resolves locally on macOS
    // would 404 in production. Normalise the extension while we are here.
    const dest = join(dir, name.replace(extname(name), ".jpg"));

    const tmp = `${dest}.tmp`;
    const info = await sharp(src)
      .rotate() // bake in the EXIF orientation before the metadata is stripped
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmp);

    before += sizeBefore;
    after += info.size;

    const delta = `${kb(sizeBefore)} -> ${kb(info.size)} (${info.width}x${info.height})`;
    if (dryRun) {
      console.log(`  ${src}: ${delta}`);
      unlinkSync(tmp);
      continue;
    }

    if (dest !== src) unlinkSync(src);
    renameSync(tmp, dest);
    console.log(`  ${dest}: ${delta}`);
  }
}

console.log(`\n${dryRun ? "Would save" : "Saved"} ${kb(before - after)} across public/ (${kb(before)} -> ${kb(after)})`);
