"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBookReader, FaSearch, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Link from "next/link";
import LogoutButton from "../HandleLogout";

const NavClient = ({ user }) => {
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
      if (!profileRef.current?.contains(e.target)) setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <nav
      className="flex items-center justify-between relative z-50 md:block"
      role="navigation"
      aria-label="Main navigation"  // ✅ Accessibility + SEO
    >

      {/* ── Mobile Hamburger ── */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden text-white p-1"
        aria-label="Open navigation menu"  // ✅ Screen reader friendly
      >
        <FiMenu size={22} />
      </button>

      {/* ── Mobile Logo ── */}
      <div
        onClick={() => router.push("/")}
        className="md:hidden cursor-pointer"
        role="link"
        aria-label="Go to homepage"
      >
        {/* ✅ Fixed: fill removed — explicit width and height */}
        <Image
          src="/logo.png"
          alt="NewSync - Trending Blogs"  // ✅ SEO descriptive alt
          width={120}
          height={36}
          priority                         // ✅ Above fold — load immediately
          className="object-contain hover:opacity-90 transition duration-300"
        />
      </div>

      {/* ── Right Side Actions ── */}
      <div className="flex items-center gap-2 relative text-white">

        {/* ── User Avatar + Dropdown ── */}
        {user && (
          <div ref={profileRef} className="relative">
            <button
              onClick={toggleProfile}
              aria-label="Open profile menu"           // ✅ Accessibility
              aria-expanded={showProfileDropdown}      // ✅ ARIA state
              className="relative w-8 h-8 rounded-full bg-blue-500 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {/* ✅ Fixed: fill removed — explicit size */}
              <Image
                src={user.avatar?.url || "/user.png"}
                alt={`${user.name || "User"} avatar`}
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div
                role="menu"                            // ✅ Accessibility
                aria-label="Profile options"
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 text-sm border border-gray-100 overflow-hidden animate-fade-up"
                style={{ boxShadow: "var(--shadow-hover)" }}
              >
                {/* User info header */}
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #f1f5f9",
                    background: "linear-gradient(135deg, rgba(232,93,38,0.05), rgba(29,53,87,0.03))",
                  }}
                >
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
                    {user.name || user.username || "My Account"}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>
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
        )}

        {/* ── Login Button (when no user) ── */}
        {!user && (
          <Link
            href="/auth/login"
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#fff",
              background: "var(--color-accent, #e85d26)",
              padding: "0.35rem 0.9rem",
              borderRadius: "99px",
              textDecoration: "none",
              fontFamily: "var(--font-ui, sans-serif)",
              transition: "opacity 0.2s",
            }}
          >
            Login
          </Link>
        )}

        {/* ── Search Button ── */}
        <button
          onClick={toggleSearch}
          aria-label="Search articles"           // ✅ Accessibility
          aria-expanded={showSearch}             // ✅ ARIA state
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <FaSearch size={17} className="text-white" />
        </button>

        {/* ── Search Dropdown ── */}
        {showSearch && (
          <div
            ref={searchRef}
            role="search"                        // ✅ Semantic search role
            className="absolute right-0 top-12 z-50 w-80 bg-white rounded-2xl shadow-2xl p-3 animate-slide-in-right"
            style={{ boxShadow: "var(--shadow-hover)" }}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="search"                    // ✅ type="search" not "text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs, topics..."
                aria-label="Search articles"     // ✅ Accessibility
                autoFocus                        // ✅ Focus immediately on open
                className="flex-1 px-4 py-2.5 text-sm text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": "#e85d26" }}
              />
              <button
                type="submit"
                aria-label="Submit search"
                style={{
                  padding: "0.5rem 0.9rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: "var(--color-accent, #e85d26)",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                Go
              </button>
            </form>

            {/* ✅ Quick search suggestions */}
            <div style={{ marginTop: "0.6rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["AI", "Freelancing", "Startups", "Productivity"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    router.push(`/search/${encodeURIComponent(tag.toLowerCase())}`);
                    setShowSearch(false);
                    setQuery("");
                  }}
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "99px",
                    border: "1px solid #e8e4df",
                    background: "#fafaf8",
                    color: "#64748b",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "var(--font-ui, sans-serif)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile Sidebar ── */}
      <Sidebar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </nav>
  );
};

export default NavClient;