// app/not-found.js
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="max-w-xl text-center space-y-6">
        <Image
          src="/404.svg"
          alt="Not Found Illustration"
          width={256}
          height={256}
          className="mx-auto"
        />
        <h1 className="text-5xl font-extrabold text-blue-800">404</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md shadow transition"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
