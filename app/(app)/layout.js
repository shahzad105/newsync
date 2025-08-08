import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import TimeBanner from "@/components/TimeSection";
import NavServer from "@/components/nav/NavServer";

export default function ArticlesLayout({ children }) {
  return (
    <>
      <TimeBanner />
      <Logo />
      <NavServer />
      <div className="container mx-auto space-y-10 w-full p-2 md:p-0">
        {" "}
        {children}
      </div>
      <Footer />
    </>
  );
}
