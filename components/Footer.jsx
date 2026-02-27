"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";

// ✅ All 13 correct categories — lowercase slugs that match your routes
const CATEGORIES = [
  { slug: "ai", label: "Artificial Intelligence" },
  { slug: "machine-learning", label: "Machine Learning" },
  { slug: "blockchain", label: "Blockchain" },
  { slug: "startups", label: "Startups" },
  { slug: "entrepreneurship", label: "Entrepreneurship" },
  { slug: "freelancing", label: "Freelancing" },
  { slug: "jobs", label: "Jobs" },
  { slug: "careers", label: "Careers" },
  { slug: "technology", label: "Technology" },
  { slug: "apps", label: "Apps" },
  { slug: "youth", label: "Youth" },
  { slug: "productivity", label: "Productivity" },
  { slug: "lifestyle", label: "Lifestyle" },
];

// Split categories into two columns
const COL_ONE = CATEGORIES.slice(0, 7);
const COL_TWO = CATEGORIES.slice(7);

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/newsync",
    icon: <FaFacebookF />,
    label: "Facebook",
    hoverColor: "#1877f2",
  },
  {
    href: "https://twitter.com/newsync",
    icon: <FaTwitter />,
    label: "Twitter / X",
    hoverColor: "#000000",
  },
  {
    href: "https://instagram.com/newsync",
    icon: <FaInstagram />,
    label: "Instagram",
    hoverColor: "#e1306c",
  },
  {
    href: "https://youtube.com/@newsync",
    icon: <FaYoutube />,
    label: "YouTube",
    hoverColor: "#ff0000",
  },
  {
    href: "https://linkedin.com/company/newsync",
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    hoverColor: "#0077b5",
  },
];

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(160deg, #0b1f3a 0%, #0b2643 60%, #0f2d4e 100%)",
        color: "#94a3b8",
        marginTop: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✅ Decorative top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #e85d26, #1d3557, #e85d26)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* ✅ Subtle background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(232,93,38,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
          position: "relative",
        }}
      >
        {/* ══════════════════════════════
            MAIN GRID
        ══════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* ── Col 1: Brand ── */}
          <div style={{ gridColumn: "span 1" }}>
            {/* Logo / Brand */}
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display, Georgia, serif)",
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                New
                <span style={{ color: "#e85d26" }}>Sync</span>
              </span>
            </Link>

            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.75,
                color: "#94a3b8",
                marginBottom: "1.5rem",
                maxWidth: "240px",
              }}
            >
              Trending blogs on tech, startups, careers, and lifestyle — from
              Pakistan and around the world.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.hoverColor;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = social.hoverColor;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Categories (first 7) ── */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-ui, sans-serif)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e85d26",
                marginBottom: "1.25rem",
              }}
            >
              Topics
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {COL_ONE.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`} // ✅ lowercase — no more 404s
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s, gap 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.gap = "0.65rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.gap = "0.4rem";
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#e85d26",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Categories (last 6) ── */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-ui, sans-serif)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e85d26",
                marginBottom: "1.25rem",
              }}
            >
              More Topics
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {COL_TWO.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`} // ✅ lowercase — no more 404s
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s, gap 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.gap = "0.65rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.gap = "0.4rem";
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#e85d26",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: About & Legal ── */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-ui, sans-serif)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e85d26",
                marginBottom: "1.25rem",
              }}
            >
              Company
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s, gap 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.gap = "0.65rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.gap = "0.4rem";
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#e85d26",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ✅ Google Search Console verification reminder box */}
            <div
              style={{
                marginTop: "1.75rem",
                padding: "0.85rem 1rem",
                background: "rgba(232,93,38,0.08)",
                border: "1px solid rgba(232,93,38,0.2)",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#e85d26",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  fontFamily: "var(--font-ui, sans-serif)",
                }}
              >
                📬 Stay Updated
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                New blogs every week on tech, careers & lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            BOTTOM BAR
        ══════════════════════════════ */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: "#94a3b8", fontWeight: 600 }}>NewSync</span>.
            All rights reserved.
          </p>

          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
            Made with <span style={{ color: "#e85d26" }}>♥</span> for readers in
            Pakistan & beyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
