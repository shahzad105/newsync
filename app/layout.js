import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";

import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.newsync.site";
const defaultOgImage = "/newsync.png";

export const metadata = {
  metadataBase: new URL(siteUrl),

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

  authors: [{ name: "NewSync Media", url: siteUrl }],
  creator: "NewSync Media",
  publisher: "NewSync",
  category: "blog",

  openGraph: {
    title: "NewSync — Tech, AI, Freelancing & Career Blogs",
    description:
      "Explore trending blog posts on technology, lifestyle, startups, and global stories — tailored to your interests on NewSync.",
    url: siteUrl,
    siteName: "NewSync",
    images: [
      {
        url: defaultOgImage,
        width: 824,
        height: 239,
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
    images: [defaultOgImage],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: siteUrl,
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
      <body className="bg-white text-black font-sans" suppressHydrationWarning>
        <ReactQueryProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
          <Toaster position="top-right" />
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
