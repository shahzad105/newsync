"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: "3rem 0",
        padding: "1.75rem",
        background:
          "linear-gradient(135deg, rgba(232,93,38,0.05), rgba(29,53,87,0.04))",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "0.4rem",
        }}
      >
        Found this helpful?
      </p>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          marginBottom: "1.25rem",
          fontFamily: "var(--font-ui)",
        }}
      >
        Share it with someone who needs to read this.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title,
          )}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.55rem 1.1rem",
            borderRadius: "99px",
            fontSize: "0.8rem",
            fontWeight: 600,
            fontFamily: "var(--font-ui)",
            background: "#000",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Share on X
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.55rem 1.1rem",
            borderRadius: "99px",
            fontSize: "0.8rem",
            fontWeight: 600,
            fontFamily: "var(--font-ui)",
            background: "#25D366",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          WhatsApp
        </a>

        {/* Copy */}
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.55rem 1.1rem",
            borderRadius: "99px",
            fontSize: "0.8rem",
            fontWeight: 600,
            fontFamily: "var(--font-ui)",
            background: copied ? "#059669" : "var(--color-accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          {copied ? "Copied! ✓" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
