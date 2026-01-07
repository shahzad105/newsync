import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const categories = [
    "Technology",
    "Apps",
    "Youth",
    "Productivity",
    "Lifestyle",
  ];
  return (
    <footer className="bg-[#0b2643] text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold tracking-wider text-white mb-4">
            Newsync
          </h2>
          <p className="text-sm leading-relaxed">
            Delivering breaking tech, startup, youth, and innovation news from
            across Pakistan and the globe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category}`}
                  className="hover:text-white"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <Link href="#" className="hover:text-blue-400">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-sky-400">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-pink-400">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-red-500">
              <FaYoutube />
            </Link>
            <Link href="#" className="hover:text-blue-300">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Newsync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
