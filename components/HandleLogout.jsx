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
      className={`flex items-center gap-2 px-4 md:py-2 w-full text-left hover:bg-gray-100 transition ${
        loading ? "text-gray-400 cursor-not-allowed" : "text-red-600"
      }`}
    >
      <FaSignOutAlt size={18} />
  <span className="md:block hidden">    {loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
