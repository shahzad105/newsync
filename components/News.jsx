import Link from "next/link";
import Image from "next/image";

const News = ({ post }) => {
  if (!post || post.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {post.map((item, index) => (
        <Link
          href={`/${item.slug}`}
          key={item._id}
          style={{ textDecoration: "none" }}
        >
          <article
            className="card animate-fade-up"
            style={{
              animationDelay: `${index * 0.06}s`,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ── Image ── */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src={item?.image?.url || "/fallback.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
                style={{
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  left: "0.75rem",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "var(--color-accent)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "99px",
                }}
              >
                {item.category}
              </span>
            </div>

            {/* ── Content ── */}
            <div
              style={{
                padding: "1rem 1.1rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: "var(--color-text)",
                  margin: "0 0 0.6rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  transition: "color 0.2s",
                }}
                className="group-hover:text-accent"
              >
                {item.title}
              </h3>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* ── Meta row ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginTop: "0.75rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                {/* Author avatar */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {(item.postedBy?.username || "N")[0].toUpperCase()}
                </div>

                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {item.postedBy?.username || "NewSync"}
                </span>

                <span
                  style={{ color: "var(--color-border)", fontSize: "0.8rem" }}
                >
                  ·
                </span>

                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-ui)",
                    marginLeft: "auto",
                  }}
                >
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default News;
