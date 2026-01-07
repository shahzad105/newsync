"use client";

import { IoClose, IoCubeOutline } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-100 transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar */}
          <aside className="relative z-50 flex h-full w-72 flex-col justify-between bg-white px-6 py-8 shadow-2xl animate-slide-in">
            {/* Header */}
            <div>
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <div className="text-2xl font-bold  flex items-center gap-2">
                    <IoCubeOutline size={24} className="text-blue-800" />
                    <span className="text-blue-800">NewSync</span>
                  </div>
                </Link>
                <IoClose
                  size={24}
                  className="cursor-pointer text-gray-600 hover:text-black transition-colors"
                  onClick={() => setMenuOpen(false)}
                />
              </div>

              {/* Categories */}
              <nav className="flex flex-col gap-y-4 text-gray-800">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="group relative py-1 text-lg font-medium hover:text-blue-600 focus:bg-gray-100 focus:outline-none rounded"
                  >
                    {cat}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}

                {/* Admin Link */}
                {user?.isAdmin && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none"
                  >
                    <FaUserShield /> Admin Dashboard
                  </Link>
                )}
              </nav>
            </div>

            {/* Footer */}
            <div className="pt-8 text-center">
              {!user ? (
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              ) : (
                <LogoutButton></LogoutButton>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
