"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdLockReset, MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function ResetForm({ token }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios
        .put(`/api/auth/reset-password/${token}`, { password })
        .then((r) => r.data),
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully!");
      setTimeout(() => router.push("/login"), 1500);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Reset failed."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      return toast.error("Please enter a valid password");
    }
    mutate();
  };

  return (
    <div className="relative w-full max-w-md bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="pt-14 px-8 pb-8 space-y-6 backdrop-blur-sm bg-white/70 dark:bg-neutral-800/70 rounded-2xl"
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-600 p-4 rounded-full shadow-md">
          <MdLockReset size={32} color="white" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-700 dark:text-white">
          Set New Password
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Create a strong password to secure your account.
        </p>

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPwd ? (
              <MdVisibilityOff size={20} />
            ) : (
              <MdVisibility size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 font-semibold text-white rounded-md transition ${
            isPending
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
