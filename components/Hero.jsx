import Link from "next/link";
import Image from "next/image";

export default async function Hero({ articles }) {
  if (!articles || articles.length === 0) return null;

  const [firstPost, ...rest] = articles;
  const smallPosts = rest.slice(0, 4);
  const hasSmallPosts = smallPosts.length > 0;

  return (
    <section aria-label="Featured blog posts" className="py-4 md:py-8">
      {/* ── Section Label ── */}
      <div className="section-divider" style={{ marginBottom: "1.25rem" }}>
        Featured Stories
      </div>

      {/* ════════════════════════════════════════════
          LAYOUT:
          - Mobile: stacked vertically
          - Desktop: left big card (55%) + right grid (45%)
          - NO inline flex that conflicts with Tailwind
      ════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* ══════════════════════════════
            LEFT — Main Featured Post
            Fixed height, content at bottom
        ══════════════════════════════ */}
        {firstPost && (
          <Link
            href={`/${firstPost?.slug}`}
            className="group relative overflow-hidden rounded-2xl flex-shrink-0 w-full md:w-[55%]"
            style={{
              height: "320px",
              display: "block",
              boxShadow: "var(--shadow-card)",
              background: "#0b1f3a",
              textDecoration: "none",
            }}
          >
            {/* Image */}
            <Image
              src={firstPost.image?.url || "/og-image.jpg"}
              alt={firstPost.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.72)" }}
              sizes="(max-width: 768px) 100vw, 55vw"
            />

            {/* Strong gradient — ensures text is always readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
              }}
            />

            {/* ── Category badge — top left ── */}
            {/* ✅ Fixed: was overlapping — now properly spaced */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "var(--color-accent)",
                  padding: "0.28rem 0.75rem",
                  borderRadius: "99px",
                  lineHeight: 1,
                }}
              >
                {firstPost.category}
              </span>

              {/* Pulsing new dot */}
              <span
                className="flex items-center gap-1"
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                <span
                  className="animate-pulse-dot rounded-full inline-block"
                  style={{ width: 6, height: 6, background: "#4ade80" }}
                />
                New
              </span>
            </div>

            {/* ── Bottom content ── */}
            {/* ✅ Fixed: generous padding, bigger font sizes */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10"
              style={{ padding: "1.5rem" }}
            >
              {/* Title — bigger and more readable */}
              <h2
                className="line-clamp-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)", // ✅ Responsive — never too small
                  fontWeight: 900,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  margin: "0 0 0.75rem",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {firstPost.title}
              </h2>

              {/* Meta row */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Author avatar */}
                <div
                  className="flex-shrink-0 flex items-center justify-center text-white"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {(firstPost.postedBy?.username || "N")[0].toUpperCase()}
                </div>

                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                  }}
                >
                  {firstPost.postedBy?.username || "NewSync"}
                </span>

                <span
                  style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}
                >
                  ·
                </span>

                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {new Date(firstPost.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                {/* Read pill — far right */}
                <span
                  className="ml-auto"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#fff",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "99px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-ui)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Read →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ══════════════════════════════
            RIGHT — Small Post Cards
            ✅ Fixed:
            - 1 post  → full height single card
            - 2 posts → stacked vertically
            - 3 posts → top full width + bottom 2 cols
            - 4 posts → 2x2 grid
        ══════════════════════════════ */}
        {hasSmallPosts && (
          <div
            className="flex-1 w-full"
            style={{
              display: "grid",
              // ✅ Always 2 columns for small cards
              gridTemplateColumns: smallPosts.length === 1 ? "1fr" : "1fr 1fr",
              // ✅ Fixed rows — auto fills the space evenly
              gridAutoRows: "1fr",
              gap: "0.75rem",
              height: "320px", // ✅ Matches left card height exactly
            }}
          >
            {smallPosts.map((post, index) => (
              <Link
                key={post._id}
                href={`/${post?.slug}`}
                className="group relative block overflow-hidden rounded-xl"
                style={{
                  boxShadow: "var(--shadow-card)",
                  background: "#0b1f3a",
                  textDecoration: "none",
                  // ✅ If only 1 or 3 posts, first card spans full width
                  gridColumn:
                    smallPosts.length === 3 && index === 0
                      ? "span 2"
                      : "span 1",
                }}
              >
                {/* Image */}
                <Image
                  src={post.image?.url || "/og-image.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: "brightness(0.68)" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(232,93,38,0.08)" }}
                />

                {/* Content */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10"
                  style={{ padding: "0.7rem 0.8rem" }}
                >
                  {/* Category */}
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#e85d26",
                      marginBottom: "0.25rem",
                      lineHeight: 1,
                    }}
                  >
                    {post.category}
                  </span>

                  {/* Title — ✅ Bigger, more readable */}
                  <h3
                    className="line-clamp-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      // ✅ Fixed: responsive font — not too small
                      fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#fff",
                      margin: 0,
                      textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Author + Date */}
                  <p
                    style={{
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.55)",
                      margin: "0.3rem 0 0",
                      fontFamily: "var(--font-ui)",
                      lineHeight: 1,
                    }}
                  >
                    {post.postedBy?.username || "NewSync"} ·{" "}
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
