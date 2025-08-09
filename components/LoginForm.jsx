"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { authenticate } from "@/lib/action";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authenticate(formData);
      if (res?.message?.toLowerCase().includes("login")) {
        router.push("/");
      } else if (res?.error) {
        setError(res.error.message);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md   p-6 space-y-5 backdrop-blur-sm"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Welcome Back
      </h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="text-right">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:underline flex justify-end items-center gap-1"
        >
          <MdLockOutline size={16} /> Forgot Password?
        </Link>
      </div>

      {error && <p className="text-left text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-70"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:underline font-normal"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
