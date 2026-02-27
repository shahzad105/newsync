import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="md:flex justify-center items-center hidden">
      <Link href="/" className="cursor-pointer py-1">
        <Image
          src="/logo.png"
          alt="NewSync - Trending Blogs" // ✅ Descriptive alt text for SEO
          width={160} // ✅ Explicit width — no more 3840px
          height={48} // ✅ Explicit height
          priority // ✅ Above the fold — load first
          className="object-contain hover:scale-105 transition duration-500"
        />
      </Link>
    </div>
  );
};

export default Logo;
