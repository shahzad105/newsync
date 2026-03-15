"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg font-ui text-[0.82rem] font-medium transition-all border-none cursor-pointer
        ${
          loading
            ? "text-muted bg-transparent cursor-not-allowed opacity-60"
            : "text-red-500 bg-transparent hover:bg-red-50 hover:text-red-600"
        }`}
    >
      <FaSignOutAlt size={13} className="flex-shrink-0" />
      <span>{loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
