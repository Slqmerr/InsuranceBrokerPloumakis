export default function Hero() {
  return (
    <section style={{
      position: "relative",
      height: "640px",
      overflow: "hidden",
    }}>
      {/* Background photo */}
      <img
        src="/dimitrios.jpg"
        alt="Δημήτριος Πλουμάκης"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
      />

      {/* Blue gradient overlay — solid near the text, fading out toward the photo */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(100deg, rgba(30,67,154,0.93) 0%, rgba(30,67,154,0.75) 35%, rgba(30,67,154,0.35) 70%, rgba(30,67,154,0.15) 100%)",
      }} />

      {/* Text content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 64px",
        maxWidth: "560px",
      }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "12px" }}>
          Αξία έχει ό,τι είναι σημαντικό για σένα
        </p>
        <h1 style={{
          color: "#fff",
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
          fontSize: "42px",
          fontWeight: 700,
          lineHeight: 1.15,
          margin: "0 0 20px",
        }}>
          Προστατεύουμε ό,τι αγαπάτε περισσότερο
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
          Εξατομικευμένες ασφαλιστικές λύσεις για εσάς, την οικογένεια και την επιχείρησή σας.
        </p>
        <button style={{
          background: "#fff",
          color: "#1E439A",
          fontWeight: 700,
          fontFamily: "var(--font-ubuntu-sans), sans-serif",
          padding: "14px 32px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          width: "fit-content",
          fontSize: "14px",
        }}>
          Ζητήστε Προσφορά
        </button>
      </div>

      {/* Stats row — unchanged content, repositioned bottom-left */}
      <div style={{
        position: "absolute",
        bottom: "32px",
        left: "64px",
        zIndex: 2,
        display: "flex",
        gap: "40px",
      }}>
        <div>
          <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>20+</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Χρόνια εμπειρίας</div>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
        <div>
          <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>500+</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Ικανοποιημένοι πελάτες</div>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.2)" }} />
        <div>
          <div style={{ color: "#fff", fontSize: "26px", fontWeight: 600, fontFamily: "var(--font-ubuntu-sans), sans-serif" }}>15+</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>Ασφαλιστικές εταιρείες</div>
        </div>
      </div>
    </section>
  );
}
