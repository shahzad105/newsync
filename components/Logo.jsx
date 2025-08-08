import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden md:flex items-center justify-center pt-4">
      <Link href="/">
        <Image
          src="/newsync.png"
          alt="Newsync Logo"
          height={52}
          width={200}
          className="object-cover !h-14 !w-auto hover:scale-105 transition duration-500 cursor-pointer"
          priority // optional: preloads logo for performance
        />
      </Link>
    </div>
  );
};

export default Logo;
