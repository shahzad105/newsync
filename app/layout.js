import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import SessionWrapper from "@/components/SessionWrapper";
import { Analytics } from "@vercel/analytics/next";

// ✅ Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ SEO Metadata
export const metadata = {
  metadataBase: new URL("https://www.newsync.site"),
  title: {
    default: "NewSync - Your News, Your Way",
    template: "%s | NewSync",
  },
  description:
    "Stay updated with the latest trending stories from Pakistan, the USA, and around the world. ",

  creator: "NewSync Media",
  publisher: "NewSync",
  openGraph: {
    title: "NewSync - Your News, Your Way",
    description:
      "Get the latest viral news, startup updates, and trending stories from Pakistan, the USA, and beyond — tailored to your interests.",
    url: "https://www.newsync.site",
    siteName: "NewSync",
    images: [
      {
        url: "https://www.newsync.site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewSync - Latest News and Viral Updates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewSync - Your News, Your Way",
    description: "Get amazing blog posts delivered straight to your inbox.",
    creator: "@newsync",
    images: ["https://www.newsync.site/newsync.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.newsync.site",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
};

// ✅ Root Layout Component
export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-white text-black font-sans">
        <ReactQueryProvider>
          <SessionWrapper session={session}>{children}</SessionWrapper>
          <Toaster position="top-right" />
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
