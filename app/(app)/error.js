"use client";

export default function GlobalError({ reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        We’re aware of the issue and are working on a solution. Please try again
        in a moment.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
