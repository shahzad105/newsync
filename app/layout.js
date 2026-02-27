import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import SessionWrapper from "@/components/SessionWrapper";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://www.newsync.site/"),

  title: {
    default: "NewSync - Trending Blogs from Pakistan, USA & World",
    template: "%s | NewSync",
  },

  description:
    "Explore trending blog posts on technology, lifestyle, startups, and global stories from Pakistan, the USA, and around the world. Read, discover, and stay informed with NewSync.",

  keywords: [
    "blog",
    "trending blogs",
    "Pakistan blogs",
    "USA blogs",
    "technology blog",
    "lifestyle blog",
    "startup stories",
    "world stories",
    "NewSync blog",
  ],

  authors: [{ name: "NewSync Media", url: "https://www.newsync.site" }],
  creator: "NewSync Media",
  publisher: "NewSync",
  category: "blog",

  openGraph: {
    title: "NewSync - Trending Blogs from Pakistan, USA & World",
    description:
      "Explore trending blog posts on technology, lifestyle, startups, and global stories — tailored to your interests on NewSync.",
    url: "https://www.newsync.site/",
    siteName: "NewSync",
    images: [
      {
        url: "https://www.newsync.site/logo.png",
        width: 1200,
        height: 630,
        alt: "NewSync - Trending Blogs from Pakistan, USA and the World",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NewSync - Trending Blogs from Pakistan, USA & World",
    description:
      "Explore trending blog posts on tech, lifestyle, startups, and global stories — all in one place on NewSync.",
    creator: "@newsync",
    images: ["https://www.newsync.site/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://www.newsync.site/",
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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      </head>
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
