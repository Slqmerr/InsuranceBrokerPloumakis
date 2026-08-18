"use client";

import Image, { type StaticImageData } from "next/image";

import interamericanLogo from "@/public/partners/interamerican.png";
import allianzLogo from "@/public/partners/allianz.png";
import generaliLogo from "@/public/partners/generali.svg";
import eurolifeLogo from "@/public/partners/eurolife.png";
import aigLogo from "@/public/partners/aig.png";
import ergoLogo from "@/public/partners/ergo.png";
import nnLogo from "@/public/partners/nn.svg";
import ydrogiosLogo from "@/public/partners/ydrogios.png";
import interlifeLogo from "@/public/partners/interlife.png";
import ethnikiLogo from "@/public/partners/ethniki.svg";

const GOTHIC = "var(--font-ubuntu-sans), sans-serif";

/**
 * Partner insurance companies. Logo files live in /public/partners.
 * To add one: drop the file in that folder, import it above, and add a
 * { name, src } entry here. The static import is what gives next/image the
 * intrinsic dimensions, so the tile never reflows once the mark loads.
 */
const PARTNERS: { name: string; src: StaticImageData }[] = [
  { name: "Interamerican", src: interamericanLogo },
  { name: "Allianz", src: allianzLogo },
  { name: "Generali", src: generaliLogo },
  { name: "Eurolife", src: eurolifeLogo },
  { name: "AIG", src: aigLogo },
  { name: "ERGO", src: ergoLogo },
  { name: "NN", src: nnLogo },
  { name: "Υδρόγειος", src: ydrogiosLogo },
  { name: "Interlife", src: interlifeLogo },
  { name: "Εθνική Ασφαλιστική", src: ethnikiLogo },
];

// gap between logos — applied as a right margin so translateX(-50%) stays seamless
const GAP = 28;

export default function PartnersMarquee({showTitle=true}:{showTitle?:boolean}) {
  // duplicate the list once; the animation shifts by exactly one set width (-50%)
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section style={{ background: "#fbf5f5", padding: "56px 0 64px" }}>
     {showTitle &&(<h2
        style={{
          textAlign: "center",
          fontFamily: GOTHIC,
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: "#8a93a6",
          margin: "0 0 36px",
        }}
      >
        Συνεργαζόμενες εταιρείες
      </h2> )}

      <div className="marquee-viewport">
        {/* Plain divs on purpose. These tiles used to be motion.div with a
            whileHover that went grayscale(0%) -> grayscale(0%) — no visual
            change, but the inline filter gave every tile its own render
            surface and knocked the track off the compositor. */}
        <div className="marquee-track">
          {loop.map((partner, i) => {
            const isClone = i >= PARTNERS.length;
            return (
              <div
                key={`${partner.name}-${i}`}
                aria-hidden={isClone}
                title={partner.name}
                style={{
                  flex: "0 0 auto",
                  marginRight: `${GAP}px`,
                  width: "168px",
                  height: "76px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 20px",
                }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  draggable={false}
                  // Tile is 168px wide with 20px padding each side, so the mark
                  // never exceeds 128px. Without `sizes` the srcset would come
                  // from the intrinsic width — up to 3840px for a 128px slot.
                  sizes="128px"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "48px",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
