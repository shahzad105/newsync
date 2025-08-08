import { auth } from "@/auth";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

// This function runs on the server at build time or per request
export default async function TimeBanner() {
  const now = new Date().toDateString(); // Safe to use on server
  const session = await auth();

  return (
    <div className="hidden md:block bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 py-2 px-4 shadow-sm border-b border-gray-300 rounded-bl-md rounded-br-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Left: Time & Login */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm md:text-base">
          <p className="font-medium">{now}</p>
          {!session?.user && (
            <span className="md:ml-6 text-blue-600 font-medium cursor-pointer">
              <Link
                href="/auth/login"
                className="hover:underline hover:text-blue-700"
              >
                Login
              </Link>{" "}
              /{" "}
              <Link
                href="/auth/register"
                className="hover:underline hover:text-blue-700"
              >
                Register
              </Link>
            </span>
          )}
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3 text-gray-700">
          <a href="#" className="hover:text-blue-600 transition">
            <FaFacebookF size={16} />
          </a>
          <a href="#" className="hover:text-blue-700 transition">
            <FaLinkedinIn size={16} />
          </a>
          <a href="#" className="hover:text-sky-500 transition">
            <FaTwitter size={16} />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <FaYoutube size={16} />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
