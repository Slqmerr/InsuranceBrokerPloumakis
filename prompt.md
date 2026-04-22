# Task for Claude Code

Apply the following changes to `app/page.tsx` in this Next.js project. Do not change anything else.

## 1. Make the navbar taller so the logo is more visible

- Increase the nav `height` from `64px` to `88px` (or similar — aim for a noticeably taller bar).
- Increase the logo `height` from `38px` to around `60px` so it scales up with the bar.
- Keep the sticky behavior and the `#1E439A` background.

## 2. Replace the nav links

Replace the current link array:

```
["Αρχική", "Σχετικά", "Συνεργάτες", "Επικοινωνία"]
```

with exactly these three items, in this order:

```
["Ιδιώτες", "Επιχείρηση", "Εμείς"]
```

Also remove the extra "Προϊόντα ▼" dropdown link (the `<li>` right after the `.map(...)`), since it is not part of the new list.

## 3. Center the navbar links

Currently the `<nav>` uses `justify-content: space-between`, which pushes the logo to the left and the links/CTA to the right. Change the layout so the **link list sits visually centered** in the navbar, with the logo on the left and the "Ζητήστε Προσφορά" button on the right.

A clean way to do this:
- Set the nav to `display: flex` with `align-items: center`.
- Give the logo `flex: 1` (or wrap it in a left container with `flex: 1`).
- Put the `<ul>` of links in the middle with no flex-grow so it stays centered.
- Give the right-side container (the divider + CTA button) `flex: 1` and `justify-content: flex-end`.

The result: logo left, links centered in the bar, button right.

## 4. Add real images to the two split sections

The file currently references `/hero-family.jpg` and `/hero-figurines.jpg` which do not exist in `public/`. Use the real photos from `assets/` instead:

- **Family split section** (around line 198): use `dmitry-rodionov-8lOB8y-frRQ-unsplash.jpg`
- **Figurines split section** (around line 227): use `philip-white-i_ybbJJ3b04-unsplash.jpg`

Steps:
1. Copy both files from `dploumakisinsurance/assets/` into `dploumakisinsurance/public/` so Next.js can serve them.
   - `dmitry-rodionov-8lOB8y-frRQ-unsplash.jpg` → `public/family.jpg`
   - `philip-white-i_ybbJJ3b04-unsplash.jpg` → `public/figurines.jpg`
2. In `app/page.tsx`, update the two `<img>` tags in the split sections:
   - Family split: `src="/hero-family.jpg"` → `src="/family.jpg"`
   - Figurines split: `src="/hero-figurines.jpg"` → `src="/figurines.jpg"`

(Leave the hero grid at the top of the page alone for now — it still references `/hero-family.jpg`, `/hero-child.jpg`, `/hero-figurines.jpg`. Only the two split sections need fixing in this task.)

## Constraints

- Do not refactor unrelated code or introduce new components.
- Keep the existing inline-style approach — do not convert to CSS modules or Tailwind.
- Preserve all Greek copy exactly as written.
- After editing, verify with `npm run dev` from the `dploumakisinsurance/` folder that the page loads without image 404s for `/family.jpg` and `/figurines.jpg`.
