import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="md:flex justify-center items-center hidden">
      <Link
        href="/"
        className="relative h-26 max-w-1/2 w-full cursor-pointer py-1"
      >
        <Image
          src="/logo.png"
          alt="Newsync Logo"
          fill
          className="object-contain hover:scale-105 transition duration-500"
        />
      </Link>
    </div>
  );
};

export default Logo;
