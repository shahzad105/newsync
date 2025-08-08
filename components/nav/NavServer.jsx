// app/components/Navbar.server.jsx
import Link from "next/link";
import NavClient from "./NavClient";
import { auth } from "@/auth"; // make sure this path is correct

const categories = [
  "Tech",
  "Startups",
  "Youth",
  "Innovation",
  "Business",
  "Finance",
  "Sports",
  "Entertainment",
];

const Navbar = async () => {
  const session = await auth(); // ✅ Fix: add await
  const user = session?.user;

  return (
    <div className="bg-[#0b2643] text-white px-4 md:px-10  md:flex items-center justify-between sticky top-0 z-50 py-2 md:mt-1">
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4 lg:gap-6">
          {categories.map((category) => (
            <li key={category} className="group relative">
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium  text-gray-100 hover:text-pink-500 relative"
              >
                {category}
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <NavClient user={user} />
    </div>
  );
};

export default Navbar;
