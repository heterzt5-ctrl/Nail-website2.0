import { Link } from "react-router";
import { siteConfig, infoPageConfig } from "@/config";

export default function Info() {
  const cfg = infoPageConfig;
  if (
    !cfg.title &&
    cfg.paragraphs.length === 0 &&
    cfg.contactEntries.length === 0
  ) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        background: "#F0EEE9",
        color: "#2C2825",
        overflowX: "hidden",
      }}
    >
      {/* Top-left Logo — back home */}
      {siteConfig.brandName && (
        <Link
          to="/"
          style={{
            position: "fixed",
            top: "24px",
            left: "32px",
            fontFamily: "'Playfair Display', 'Times New Roman', serif",
            fontSize: "18px",
            fontWeight: 500,
            color: "#2C2825",
            letterSpacing: "0.12em",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {siteConfig.brandName}
        </Link>
      )}

      {/* Top-right Back */}
      {cfg.backLinkLabel && (
        <Link
          to="/"
          style={{
            position: "fixed",
            top: "24px",
            right: "32px",
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#C9A96E",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
            zIndex: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {cfg.backLinkLabel}
        </Link>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: "64px",
          maxWidth: "1720px",
          margin: "0 auto",
          padding: "200px 48px 80px",
          boxSizing: "border-box",
          alignItems: "start",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* LEFT — Bio */}
        <div>
          {cfg.eyebrow && (
            <p
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#C9A96E",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: "0 0 28px 0",
              }}
            >
              {cfg.eyebrow}
            </p>
          )}

          {cfg.title && (
            <h1
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontSize: "clamp(32px, 3.6vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                margin: "0 0 40px 0",
                color: "#2C2825",
              }}
            >
              {cfg.title}
            </h1>
          )}

          {cfg.paragraphs.length > 0 && (
            <div
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "#4A4540",
              }}
            >
              {cfg.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 18px 0" }}>
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Contact */}
        {(cfg.contactLabel ||
          cfg.contactEntries.length > 0 ||
          siteConfig.copyright) && (
          <div
            style={{
              alignSelf: "center",
            }}
          >
            {cfg.contactLabel && (
              <p
                style={{
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#C9A96E",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 24px 0",
                }}
              >
                {cfg.contactLabel}
              </p>
            )}

            {cfg.contactEntries.length > 0 && (
              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "130px 1fr",
                  rowGap: "14px",
                  columnGap: "20px",
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "15px",
                  margin: 0,
                  color: "#2C2825",
                }}
              >
                {cfg.contactEntries.map((entry, i) => (
                  <ContactRow key={i} entry={entry} />
                ))}
              </dl>
            )}

            {siteConfig.copyright && (
              <div
                style={{
                  marginTop: "48px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(201,169,110,0.3)",
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "12px",
                  color: "#8A8580",
                  opacity: 0.7,
                  letterSpacing: "0.02em",
                }}
              >
                {siteConfig.copyright}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  entry,
}: {
  entry: { label: string; value: string; href?: string };
}) {
  const valueLines = entry.value.split("\n");
  const content =
    valueLines.length > 1
      ? valueLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < valueLines.length - 1 && <br />}
          </span>
        ))
      : entry.value;

  return (
    <>
      <dt style={{ opacity: 0.5, color: "#8A8580" }}>{entry.label}</dt>
      <dd
        style={{
          margin: 0,
          lineHeight: valueLines.length > 1 ? 1.6 : 1.4,
          color: "#2C2825",
        }}
      >
        {entry.href ? (
          <a
            href={entry.href}
            target={entry.href.startsWith("http") ? "_blank" : undefined}
            rel={entry.href.startsWith("http") ? "noreferrer" : undefined}
            style={{
              color: "#2C2825",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationColor: "#C9A96E",
            }}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </dd>
    </>
  );
}
