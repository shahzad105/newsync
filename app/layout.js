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
});

export const metadata = {
  metadataBase: new URL("https://www.newsync.site/"),

  title: {
    default: "NewSync — Tech, AI, Freelancing & Career Blogs",
    template: "%s | NewSync",
  },

  description:
    "Explore trending blog posts on technology, lifestyle, startups, and global stories from Pakistan, the USA, and around the world. Read, discover, and stay informed with NewSync.",
  keywords: [
    "newsync",
    "pakistan blogs",
    "tech blogs pakistan",
    "ai blogs",
    "freelancing blogs",
    "career blogs pakistan",
    "technology news pakistan",
    "startup blogs",
    "lifestyle blogs pakistan",
  ],

  authors: [{ name: "NewSync Media", url: "https://www.newsync.site" }],
  creator: "NewSync Media",
  publisher: "NewSync",
  category: "blog",

  openGraph: {
    title: "NewSync — Tech, AI, Freelancing & Career Blogs",
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
    title: "NewSync — Tech, AI, Freelancing & Career Blogs",
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
      <head></head>
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
