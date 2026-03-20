export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: "#0A1019" }}
    >
      {/* Forensic Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C49A3C 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="text-center relative z-10">
        <h1
          style={{
            fontFamily: "Newsreader, serif",
            fontStyle: "italic",
            fontSize: "8rem",
            color: "#C49A3C",
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "Space Grotesk, monospace",
            fontSize: "0.75rem",
            color: "#807665",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          DOCUMENT NOT FOUND
        </h2>
        <p
          style={{
            fontFamily: "Work Sans, sans-serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#D2C5B1",
            maxWidth: "400px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          The requested archive entry does not exist or has been classified.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 transition-colors"
          style={{
            fontFamily: "Space Grotesk, monospace",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#C49A3C",
            border: "1px solid #C49A3C",
            borderRadius: "0.125rem",
            backgroundColor: "transparent",
          }}
        >
          Return to Archive
        </a>
      </div>
    </div>
  );
}
