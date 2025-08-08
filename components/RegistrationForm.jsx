"use client";

import React, { useState } from "react";
import Link from "next/link";
import loginImage from "@/public/login.svg";
import { useRegisterUser } from "@/hooks/useRegisterUser";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { registerUser, isPending } = useRegisterUser(setFormData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 px-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            Welcome to NewsSync
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerUser(formData);
            }}
            className="space-y-5"
          >
            {["username", "email", "password"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize"
                >
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-70"
            >
              {isPending ? "Registering..." : "Get Started"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already onboarded?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-gradient-to-tr from-blue-600 to-indigo-700 items-center justify-center">
        <img src={loginImage.src} alt="NewsSync signup" className="max-w-sm" />
      </div>
    </div>
  );
}
