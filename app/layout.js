import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ Full SEO Metadata Configuration
export const metadata = {
  metadataBase: new URL("https://www.newsync.site"),
  title: {
    default: "NewSync - Your News, Your Way",
    template: "%s | NewSync",
  },
  description:
    "Stay updated with the latest news from Pakistan and around the world, tailored just for you. Explore trending stories, tech, startups, sports, and more.",
  keywords: [
    "Pakistan news",
    "latest news",
    "startup news",
    "tech news",
    "sports highlights",
    "NewSync",
    "youth trends",
    "business news",
    "media news",
    "daily updates",
  ],
  authors: [{ name: "NewSync Team", url: "https://www.newsync.site/about" }],
  creator: "NewSync Media",
  publisher: "NewSync",
  openGraph: {
    title: "NewSync - Your News, Your Way",
    description:
      "Get the latest news, startup updates, and trending stories tailored to your interests.",
    url: "https://www.newsync.site",
    siteName: "NewSync",
    images: [
      {
        url: "https://www.newsync.site/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewSync - Latest News and Updates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewSync - Your News, Your Way",
    description:
      "Stay updated with the latest news, trends, and highlights tailored for you.",
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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* ✅ Responsive Design Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Fallback for keywords (Next.js ignores them in metadata sometimes) */}
        <meta
          name="keywords"
          content="World news, latest news, startup news, tech news, sports highlights, NewSync, youth trends, business news, daily updates"
        />
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
