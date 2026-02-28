"use client";

import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBookReader, FaSearch, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Link from "next/link";
import LogoutButton from "../HandleLogout";

const NavClient = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef();
  const profileRef = useRef();

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleProfile = () => setShowProfileDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) setShowSearch(false);
      if (!profileRef.current?.contains(e.target))
        setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Close search on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search/${encodeURIComponent(trimmed)}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between relative z-50 md:block"
      >
        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white p-1"
          aria-label="Open navigation menu"
        >
          <FiMenu size={22} />
        </button>

        {/* ── Mobile Logo ── */}
        <div
          onClick={() => router.push("/")}
          className="md:hidden cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="NewSync - Trending Blogs"
            width={120}
            height={36}
            priority
            className="object-contain"
          />
        </div>

        {/* ── Right Side Actions ── */}
        <div className="flex items-center gap-2 relative text-white">
          {/* Session loading skeleton */}
          {isLoading ? (
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ) : user ? (
            // ── Logged In ──
            <div ref={profileRef} className="relative">
              <button
                onClick={toggleProfile}
                aria-label="Open profile menu"
                aria-expanded={showProfileDropdown}
                className="relative w-8 h-8 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Image
                  src={user.avatar?.url || "/user.png"}
                  alt={`${user.name || "User"} avatar`}
                  width={32}
                  height={32}
                  className="object-cover rounded-full"
                />
              </button>

              {showProfileDropdown && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 text-sm border border-gray-100 overflow-hidden"
                >
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        margin: 0,
                      }}
                    >
                      {user.name || user.username || "My Account"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "#94a3b8",
                        margin: 0,
                      }}
                    >
                      {user.email || ""}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    role="menuitem"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition"
                  >
                    <FaUser size={13} style={{ color: "#e85d26" }} />
                    <span>Profile</span>
                  </Link>

                  {user?.isAdmin && (
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition"
                    >
                      <FaBookReader size={13} style={{ color: "#e85d26" }} />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <div style={{ borderTop: "1px solid #f1f5f9" }}>
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── Logged Out ──
            <Link
              href="/auth/login"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#fff",
                background: "#e85d26",
                padding: "0.35rem 0.9rem",
                borderRadius: "99px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          )}

          {/* ── Search Button ── */}
          <button
            onClick={toggleSearch}
            aria-label="Search articles"
            aria-expanded={showSearch}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <FaSearch size={17} className="text-white" />
          </button>
        </div>

        <Sidebar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </nav>

      {/* ════════════════════════════════════════════
          SEARCH OVERLAY — fixed to viewport
          ✅ Drops DOWN from top, centered, no overflow
          ✅ Backdrop closes it on outside click
      ════════════════════════════════════════════ */}
      {showSearch && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(2px)",
            }}
            onClick={() => setShowSearch(false)}
          />

          {/* Search panel — centered, drops down */}
          <div
            ref={searchRef}
            role="search"
            style={{
              position: "fixed",
              top: "72px", // ✅ just below navbar
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(580px, 92vw)", // ✅ responsive — never overflows on mobile
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow:
                "0 12px 48px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.08)",
              padding: "1rem 1.1rem",
              zIndex: 50,
              animation: "searchSlideDown 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <style>{`
              @keyframes searchSlideDown {
                from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                to   { opacity: 1; transform: translateX(-50%) translateY(0); }
              }
            `}</style>

            {/* ── Input Row ── */}
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
            >
              <FaSearch size={15} style={{ color: "#94a3b8", flexShrink: 0 }} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs, topics, categories..."
                aria-label="Search articles"
                autoFocus
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "0.95rem",
                  color: "#1a1a1a",
                  background: "transparent",
                  padding: "0.3rem 0",
                  fontFamily: "var(--font-ui)",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.45rem 1.1rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#fff",
                  background: "#e85d26",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  fontFamily: "var(--font-ui)",
                  whiteSpace: "nowrap",
                }}
              >
                Search
              </button>
            </form>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "#f1f5f9",
                margin: "0.8rem 0",
              }}
            />

            {/* ── Popular Topics ── */}
            <div>
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 0.5rem",
                  fontFamily: "var(--font-ui)",
                }}
              >
                Popular Topics
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {[
                  "AI",
                  "Freelancing",
                  "Startups",
                  "Productivity",
                  "Careers",
                  "Youth",
                  "Technology",
                  "Blockchain",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      router.push(
                        `/search/${encodeURIComponent(tag.toLowerCase())}`,
                      );
                      setShowSearch(false);
                      setQuery("");
                    }}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "0.3rem 0.8rem",
                      borderRadius: "99px",
                      border: "1px solid #e8e4df",
                      background: "#fafaf8",
                      color: "#475569",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      fontFamily: "var(--font-ui)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e85d26";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "#e85d26";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fafaf8";
                      e.currentTarget.style.color = "#475569";
                      e.currentTarget.style.borderColor = "#e8e4df";
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Hint */}
            <p
              style={{
                fontSize: "0.65rem",
                color: "#cbd5e1",
                margin: "0.75rem 0 0",
                fontFamily: "var(--font-ui)",
                textAlign: "center",
              }}
            >
              Press{" "}
              <kbd
                style={{
                  background: "#f1f5f9",
                  padding: "0.1rem 0.35rem",
                  borderRadius: "4px",
                  fontSize: "0.6rem",
                  color: "#64748b",
                }}
              >
                Esc
              </kbd>{" "}
              to close
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default NavClient;
