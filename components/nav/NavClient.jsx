"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBookReader, FaSearch, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
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
      if (!profileRef.current?.contains(e.target))
        setShowProfileDropdown(false);
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
    <nav className="flex items-center justify-between  relative z-50 md:block">
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden text-white"
      >
        <FiMenu size={22} />
      </button>

      <div
        onClick={() => router.push("/")}
        className="md:hidden relative w-full h-10 cursor-pointer"
      >
        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
      </div>
      <div className=" flex items-center gap-2 relative text-white">
        {user && (
          <div ref={profileRef} className="relative">
            <div
              onClick={toggleProfile}
              className="relative w-7 h-7 rounded-full bg-blue-500 cursor-pointer overflow-hidden"
            >
              <Image
                src={user.avatar?.url || "/user.png"}
                alt="user"
                fill
                className="object-cover rounded-full"
              />
            </div>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 text-sm border">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <FaUser size={14} className="text-blue-500" />
                  <span>Profile</span>
                </Link>
                {user?.isAdmin && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <FaBookReader size={14} className="text-blue-500" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <LogoutButton />
              </div>
            )}
          </div>
        )}
        <button
          onClick={toggleSearch}
          className="p-2 rounded-full hover:bg-pink-600/20 transition"
        >
          <FaSearch size={18} className="text-white" />
        </button>

        {showSearch && (
          <div
            ref={searchRef}
            className="absolute right-0 top-10 z-50 w-72 bg-white rounded-xl shadow-xl p-1 animate-slide-down"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags..."
                className="flex-1 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
              >
                Go
              </button>
            </form>
          </div>
        )}
      </div>

      <Sidebar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </nav>
  );
};

export default NavClient;
