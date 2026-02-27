import Link from "next/link";
import Image from "next/image";
import React from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const Health = ({ articles = [] }) => {
  if (articles.length === 0) return null;

  const topTwo = articles.slice(0, 2);
  const bottomFour = articles.slice(2, 6);

  return (
    <section aria-label="Lifestyle blog posts">
      <div
        className="flex items-center justify-between"
        style={{
          borderBottom: "2px solid var(--color-border)",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              display: "inline-block",
              width: "4px",
              height: "24px",
              background: "var(--color-accent)",
              borderRadius: "99px",
              flexShrink: 0,
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Lifestyle
          </h2>
        </div>

        <Link
          href="/category/lifestyle"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-accent)",
            fontFamily: "var(--font-ui)",
            textDecoration: "none",
          }}
        >
          View all →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTwo.map((post, index) => (
            <Link
              key={post._id}
              href={`/${post.slug}`}
              className="group"
              style={{ textDecoration: "none" }}
            >
              <article
                className="card animate-fade-up"
                style={{
                  animationDelay: `${index * 0.07}s`,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "200px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={post.image?.url || "/og-image.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
                    }}
                  />

                  {/* Category badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "0.65rem",
                      left: "0.65rem",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "var(--color-accent)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "99px",
                      lineHeight: 1,
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "0.9rem 1rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h3
                    className="line-clamp-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: "var(--color-text)",
                      margin: "0 0 auto",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginTop: "0.75rem",
                      paddingTop: "0.65rem",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                        fontFamily: "var(--font-ui)",
                      }}
                    >
                      {(post.postedBy?.username || "N")[0].toUpperCase()}
                    </div>

                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--color-muted)",
                        fontFamily: "var(--font-ui)",
                      }}
                    >
                      {post.postedBy?.username || "NewSync"}
                    </span>

                    <span style={{ color: "var(--color-border)" }}>·</span>

                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: "var(--color-muted)",
                        fontFamily: "var(--font-ui)",
                        marginLeft: "auto",
                      }}
                    >
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ══════════════════════════════
            BOTTOM 4 — Horizontal List
        ══════════════════════════════ */}
        {bottomFour.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {bottomFour.map((post, index) => (
              <Link
                key={post._id}
                href={`/${post.slug}`}
                className="group"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="animate-fade-up"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.85rem 0.5rem",
                    borderBottom:
                      index < bottomFour.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    animationDelay: `${(index + 2) * 0.07}s`,
                    transition: "var(--transition)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "64px",
                      flexShrink: 0,
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-card)",
                    }}
                  >
                    <Image
                      src={post.image?.url || "/og-image.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="80px"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(232,93,38,0.15)" }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                        marginBottom: "0.2rem",
                        lineHeight: 1,
                      }}
                    >
                      {post.category}
                    </span>

                    <h3
                      className="line-clamp-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "var(--color-text)",
                        margin: "0 0 0.3rem",
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--color-muted)",
                        fontFamily: "var(--font-ui)",
                        margin: 0,
                      }}
                    >
                      {post.postedBy?.username || "NewSync"} ·{" "}
                      {formatDate(post.createdAt)}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-accent)",
                      opacity: 0,
                      transform: "translateX(-4px)",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    className="group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Health;
