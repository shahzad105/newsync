"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReadMoreSkeleton from "@/skeletons/ReadMoreSkeleton";
import useGetArticles from "@/hooks/useGetArticlse";

// ✅ Safe date formatter
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

const ReadMore = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetArticles({
    limit: 5,
    page,
    category: "jobs,careers,apps",
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handlePrev = () => {
    if (!isLoading && page > 1) setPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    if (!isLoading && page < totalPages) setPage((p) => p + 1);
  };

  return (
    <section aria-label="Must read blog posts" style={{ position: "relative" }}>
      {/* ── Section Header ── */}
      <div
        className="flex items-center justify-between"
        style={{
          borderBottom: "2px solid var(--color-border)",
          paddingBottom: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Accent bar */}
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
            Must Read
          </h2>
        </div>

        {/* Prev / Next in header */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1 || isFetching}
              aria-label="Previous page"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid var(--color-border)",
                background: page === 1 ? "#f5f3f0" : "var(--color-accent-2)",
                color: page === 1 ? "#cbd5e1" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: page === 1 ? "not-allowed" : "pointer",
                transition: "var(--transition)",
                flexShrink: 0,
              }}
            >
              <FiChevronLeft size={13} />
            </button>

            <button
              onClick={handleNext}
              disabled={page >= totalPages || isFetching}
              aria-label="Next page"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "none",
                background:
                  page >= totalPages ? "#f5f3f0" : "var(--color-accent)",
                color: page >= totalPages ? "#cbd5e1" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                transition: "var(--transition)",
                boxShadow:
                  page < totalPages ? "0 2px 8px rgba(232,93,38,0.3)" : "none",
                flexShrink: 0,
              }}
            >
              <FiChevronRight size={13} />
            </button>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ position: "relative" }}>
        {/* Fetching blur overlay */}
        {isFetching && !isLoading && (
          <div
            className="absolute inset-0 z-20 rounded-xl"
            style={{
              background: "rgba(250,250,248,0.75)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: "3px solid var(--color-border)",
                borderTopColor: "var(--color-accent)",
                animation: "spin 0.7s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Skeleton */}
        {isLoading ? (
          <ReadMoreSkeleton />
        ) : articles.length > 0 ? (
          // ── Article list ──
          <div style={{ display: "flex", flexDirection: "column" }}>
            {articles.map((post, index) => (
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
                    alignItems: "flex-start",
                    gap: "0.9rem",
                    padding: "0.9rem 0",
                    borderBottom:
                      index < articles.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    animationDelay: `${index * 0.06}s`,
                    transition: "var(--transition)",
                  }}
                >
                  {/* ── Number indicator ── */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background:
                        index === 0
                          ? "var(--color-accent)" // first post = orange
                          : "rgba(232,93,38,0.08)", // rest = soft orange
                      border:
                        index === 0 ? "none" : "1px solid rgba(232,93,38,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: index === 0 ? "#fff" : "var(--color-accent)",
                      fontFamily: "var(--font-ui)",
                      marginTop: "2px",
                    }}
                  >
                    {String(index + 1 + (page - 1) * 5).padStart(2, "0")}
                  </div>

                  {/* ── Text ── */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Category */}
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                        marginBottom: "0.25rem",
                        lineHeight: 1,
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="line-clamp-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: "var(--color-text)",
                        margin: "0 0 0.35rem",
                        transition: "color 0.2s",
                      }}
                    >
                      <span className="group-hover:text-[var(--color-accent)] transition-colors duration-200">
                        {post.title}
                      </span>
                    </h3>

                    {/* Meta */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      {/* Author avatar */}
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.48rem",
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
                          fontSize: "0.68rem",
                          color: "var(--color-muted)",
                          fontFamily: "var(--font-ui)",
                          fontWeight: 500,
                        }}
                      >
                        {post.postedBy?.username || "NewSync"}
                      </span>

                      <span style={{ color: "var(--color-border)" }}>·</span>

                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--color-muted)",
                          fontFamily: "var(--font-ui)",
                        }}
                      >
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-accent)",
                      opacity: 0,
                      transform: "translateX(-4px)",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                    className="group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // ── Empty State ──
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 1rem",
              color: "var(--color-muted)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📚</div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.875rem" }}>
              No articles found.
            </p>
          </div>
        )}
      </div>

      {/* ── Error State ── */}
      {isError && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(239,68,68,0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(239,68,68,0.15)",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.825rem",
              color: "#ef4444",
              fontFamily: "var(--font-ui)",
              margin: 0,
            }}
          >
            ⚠️ Failed to load articles. Please try again.
          </p>
        </div>
      )}
    </section>
  );
};

export default ReadMore;
