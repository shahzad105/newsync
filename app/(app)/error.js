"use client";

import { useEffect } from "react";
import { RxExclamationTriangle } from "react-icons/rx";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6">
      <div className="text-center space-y-6">
        <RxExclamationTriangle className="mx-auto w-24 h-24 animate-pulse" />
        <h1 className="text-4xl font-semibold">Something Went Wrong</h1>
        <p className="text-lg">
          {error?.message ||
            "We're experiencing technical difficulties. Please try again later."}
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
