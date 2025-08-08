"use client";

import { useState } from "react";
import axios from "axios";
import { MdOutlineMailOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/auth/forgot-password", { email });
      return res.data;
    },
    onSuccess: (data) => {
      setSent(true);
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Error occurred"
      );
    },
  });

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-transparent">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <MdOutlineMailOutline size={36} />
        </div>
      </div>

      <h2 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">
        Forgot Password
      </h2>

      {sent ? (
        <p className="text-center text-green-600">
          If that email exists, we’ve sent you a reset link.
        </p>
      ) : (
        <>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Please enter the email associated with your account.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
