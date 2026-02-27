"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import useGetArticles from "@/hooks/useGetArticlse";
import TechNewsSkeleton from "@/skeletons/TechNewsSkeleton";

const TechNewsSection = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, isFetching } = useGetArticles({
    category: "technology",
    page,
    limit: 3,
    latest: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const handleNext = () => {
    if (!isLoading && page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (!isLoading && page > 1) setPage((p) => Math.max(p - 1, 1));
  };

  return (
    <section aria-label="Technology blog posts" className="my-8">
      {/* ── Section Header ── */}
      <div
        className="flex items-center justify-between mb-5"
        style={{
          borderBottom: "2px solid var(--color-border)",
          paddingBottom: "0.75rem",
        }}
      >
        {/* Left — Title with accent bar */}
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
            Technology
          </h2>

          {/* Post count badge */}
          {!isLoading && articles.length > 0 && (
            <span className="badge">
              Page {page} of {totalPages}
            </span>
          )}
        </div>

        {/* Right — Prev / Next + View All */}
        <div className="flex items-center gap-2">
          <Link
            href="/category/technology"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              fontFamily: "var(--font-ui)",
              textDecoration: "none",
              marginRight: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
            View all →
          </Link>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            disabled={page === 1 || isLoading}
            aria-label="Previous page"
            style={{
              width: "32px",
              height: "32px",
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
            <FaChevronLeft size={12} />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={isLoading || page >= totalPages}
            aria-label="Next page"
            style={{
              width: "32px",
              height: "32px",
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
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="relative">
        {/* Loading skeleton */}
        {isLoading ? (
          <TechNewsSkeleton />
        ) : (
          <>
            {/* Fetching overlay — subtle blur instead of hard loader */}
            {isFetching && (
              <div
                className="absolute inset-0 z-20 rounded-xl"
                style={{
                  background: "rgba(250,250,248,0.7)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Spinner */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "3px solid var(--color-border)",
                    borderTopColor: "var(--color-accent)",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {/* ── Articles Grid ── */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {articles.map((post, index) => (
                  <Link
                    href={`/${post.slug}`}
                    key={post._id}
                    className="group"
                    style={{ textDecoration: "none" }}
                  >
                    <article
                      className="card animate-fade-up"
                      style={{
                        animationDelay: `${index * 0.07}s`,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          height: "190px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          fill
                          loading="lazy"
                          src={post.image?.url || "/og-image.jpg"}
                          alt={post.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        {/* Gradient */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
                          }}
                        />

                        {/* Category badge on image */}
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
                            padding: "0.2rem 0.55rem",
                            borderRadius: "99px",
                            lineHeight: 1,
                          }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Text content */}
                      <div
                        style={{
                          padding: "0.9rem 1rem 1rem",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        {/* Title */}
                        <h3
                          className="line-clamp-3"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "var(--color-text)",
                            margin: "0 0 auto",
                            transition: "color 0.2s",
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
                          {/* Author avatar */}
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

                          <span
                            style={{
                              color: "var(--color-border)",
                              fontSize: "0.9rem",
                            }}
                          >
                            ·
                          </span>

                          <span
                            style={{
                              fontSize: "0.68rem",
                              color: "var(--color-muted)",
                              fontFamily: "var(--font-ui)",
                              marginLeft: "auto",
                            }}
                          >
                            {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )
                              : ""}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              /* ── Empty State ── */
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "var(--color-muted)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                  📡
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--color-muted)",
                  }}
                >
                  No technology posts found on this page.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Error State ── */}
      {isError && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            background: "rgba(239,68,68,0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(239,68,68,0.15)",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#ef4444",
              fontFamily: "var(--font-ui)",
              margin: 0,
            }}
          >
            ⚠️ Failed to load technology posts. Please try again.
          </p>
        </div>
      )}
    </section>
  );
};

export default TechNewsSection;
