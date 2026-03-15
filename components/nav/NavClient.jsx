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

const NavClient = ({ initialSession }) => {
  const { data: session, status } = useSession();
  const user = session?.user ?? initialSession?.user;
  const isLoading = status === "loading" && !initialSession;

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) setShowSearch(false);
      if (!profileRef.current?.contains(e.target))
        setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const SearchBtn = () => (
    <button
      onClick={() => setShowSearch((p) => !p)}
      aria-label="Search articles"
      className={`w-9 h-9 rounded-full border-none cursor-pointer flex items-center justify-center transition-all
        ${
          showSearch
            ? "bg-white/20 text-white"
            : "bg-white/8 text-white hover:bg-white/16"
        }`}
    >
      <FaSearch size={14} />
    </button>
  );

  const AuthArea = () =>
    isLoading ? (
      <div className="skeleton w-9 h-9 rounded-full" />
    ) : user ? (
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setShowProfileDropdown((p) => !p)}
          aria-label="Open profile menu"
          className={`w-9 h-9 rounded-full overflow-hidden border-2 cursor-pointer p-0 bg-transparent transition-all
            ${
              showProfileDropdown
                ? "border-accent"
                : "border-white/30 hover:border-accent"
            }`}
        >
          <Image
            src={user.avatar?.url || "/user.png"}
            alt={user.username || "User"}
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        </button>

        {showProfileDropdown && (
          <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] bg-surface rounded-xl shadow-hover border border-border overflow-hidden z-[100] animate-fade-up">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-accent/[0.03]">
              <p className="font-ui text-[0.82rem] font-bold text-text m-0 truncate">
                {user.username || "My Account"}
              </p>
              <p className="font-ui text-[0.72rem] text-muted m-0 mt-0.5 truncate">
                {user.email || ""}
              </p>
            </div>

            {/* Profile */}
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setShowProfileDropdown(false)}
              className="flex items-center gap-2 px-4 py-2.5 font-ui text-[0.82rem] font-medium text-text border-b border-border transition-all hover:bg-accent/5 hover:text-accent"
            >
              <FaUser size={12} className="text-accent flex-shrink-0" />
              Profile
            </Link>

            {/* Dashboard (admin only) */}
            {user?.isAdmin && (
              <Link
                href="/dashboard"
                role="menuitem"
                onClick={() => setShowProfileDropdown(false)}
                className="flex items-center gap-2 px-4 py-2.5 font-ui text-[0.82rem] font-medium text-text border-b border-border transition-all hover:bg-accent/5 hover:text-accent"
              >
                <FaBookReader size={12} className="text-accent flex-shrink-0" />
                Dashboard
              </Link>
            )}

            <div className="p-1.5">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    ) : (
      <Link
        href="/auth/login"
        className="btn-primary text-[0.78rem] py-[0.4rem] px-[1rem]"
      >
        Login
      </Link>
    );

  return (
    <>
      <div className="flex items-center justify-between w-full md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          className="w-9 h-9 rounded-full bg-white/8 border-none text-white cursor-pointer flex items-center justify-center transition-all hover:bg-white/16"
        >
          <FiMenu size={18} />
        </button>

        {/* Mobile Logo */}
        <Link
          href="/"
          className="font-display text-[1.25rem] font-black tracking-tight text-white no-underline"
        >
          New<span className="text-accent">Sync</span>
        </Link>

        <div className="flex items-center gap-2">
          <SearchBtn />
          <AuthArea />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 flex-shrink-0 relative">
        <SearchBtn />
        <AuthArea />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {showSearch && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-accent-2/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowSearch(false)}
          />

          {/* Panel */}
          <div
            ref={searchRef}
            role="search"
            className="fixed top-20 left-1/2 z-50 w-[min(600px,92vw)] bg-surface rounded-2xl shadow-hover border border-border p-5 search-slide-down"
            style={{ transform: "translateX(-50%)" }}
          >
            {/* Input Row */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-bg rounded-xl px-4 py-2.5 border border-border"
            >
              <FaSearch size={14} className="text-muted flex-shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs, topics, categories..."
                aria-label="Search articles"
                autoFocus
                className="flex-1 border-none outline-none font-ui text-[0.95rem] text-text bg-transparent"
              />
              <button
                type="submit"
                className="btn-primary text-[0.78rem] py-[0.35rem] px-[1rem] flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Divider */}
            <div className="h-px bg-border my-4" />

            <div>
              <p
                className="font-ui text-[0.6rem] font-bold tracking-[0.12em] uppercase text-muted mb-3 flex items-center gap-3
                before:content-[''] before:flex-1 before:h-px before:bg-border
                after:content-[''] after:flex-1 after:h-px after:bg-border"
              >
                Popular Topics
              </p>
              <div className="flex flex-wrap gap-1.5">
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
                    className="badge"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Esc hint */}
            <p className="font-ui text-[0.65rem] text-muted mt-4 mb-0 text-center">
              Press{" "}
              <kbd className="bg-bg border border-border px-1.5 py-0.5 rounded text-[0.6rem] text-muted font-ui">
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
