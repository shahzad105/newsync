"use client";

import { IoClose } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../HandleLogout";

const categories = [
  "Technology",
  "Startups",
  "Youth",
  "Lifestyle",
  "Productivity",
  "Freelancing",
  "Blockchain",
];

export default function Sidebar({ user, menuOpen, setMenuOpen }) {
  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="absolute inset-0 bg-accent-2/60 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
      />

      <aside className="relative z-50 flex h-full w-[300px] flex-col justify-between bg-surface px-6 py-7 shadow-hover overflow-y-auto animate-slide-in-left">
        <div>
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-[1.4rem] font-black tracking-tight text-accent-2 no-underline"
            >
              New<span className="text-accent">Sync</span>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full border border-border bg-bg text-muted flex items-center justify-center transition-all hover:bg-accent hover:text-white hover:border-accent cursor-pointer"
            >
              <IoClose size={16} />
            </button>
          </div>

          {/* User Info (logged in only) */}
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10 mb-6">
              <Image
                src={user.avatar?.url || "/user.png"}
                alt={user.username || "User"}
                width={42}
                height={42}
                className="rounded-full border-2 border-accent object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="font-ui text-[0.85rem] font-bold text-text m-0 truncate">
                  {user.username || "My Account"}
                </p>
                <p className="font-ui text-[0.72rem] text-muted m-0 mt-0.5 truncate">
                  {user.email || ""}
                </p>
              </div>
            </div>
          )}

          {/* Section Label */}
          <p className="font-ui text-[0.62rem] font-bold tracking-[0.12em] uppercase text-muted mb-3">
            Browse
          </p>

          {/* Category Links */}
          <nav className="flex flex-col gap-0.5">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between px-3 py-2.5 rounded-md font-ui text-[0.9rem] font-medium text-text no-underline transition-all hover:bg-accent/7 hover:text-accent hover:pl-4"
              >
                {cat}
                <FiChevronRight
                  size={14}
                  className="text-border transition-all group-hover:text-accent group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>

          {/* Admin Link */}
          {user?.isAdmin && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-md font-ui text-[0.85rem] font-semibold text-accent-2 bg-accent-2/5 border border-accent-2/10 no-underline transition-all hover:bg-accent-2 hover:text-white hover:border-accent-2"
            >
              <FaUserShield size={14} />
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="pt-5 mt-4 border-t border-border">
          {!user ? (
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center text-[0.875rem]"
            >
              Login to NewSync
            </Link>
          ) : (
            <LogoutButton />
          )}
        </div>
      </aside>
    </div>
  );
}
