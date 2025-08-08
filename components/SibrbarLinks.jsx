"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartBar,
  FaRegNewspaper,
  FaThList,
  FaUserAlt,
  FaHome,
} from "react-icons/fa";
import LogoutButton from "./HandleLogout";

const navItems = [
  { href: "/", label: "Home", icon: FaHome },
  { href: "/dashboard", label: "Overview", icon: FaChartBar },
  { href: "/dashboard/articles", label: "Articles", icon: FaRegNewspaper },
  { href: "/dashboard/add", label: "Add Article", icon: FaThList },
  { href: "/dashboard/users", label: "Users", icon: FaUserAlt },
];

export default function SidebarLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex md:flex-col h-full items-center md:items-stretch"
    >
      {/* Navigation Links */}
      <div className="space-y-2 mt-3 flex md:flex-col flex-row md:space-y-1 md:space-x-0 space-x-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              href={href}
              key={href}
              className={`group flex items-center gap-4 py-3 px-5 rounded-xl transition ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
              />
              <span className="text-base leading-none hidden md:block">
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="md:mt-auto mt-2 w-full md:w-auto">
        <LogoutButton />
      </div>
    </nav>
  );
}
