"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
          <Link
            href="/profile/update"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            ✏️ Update Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
