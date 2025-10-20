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
    "Stay updated with the latest trending stories from Pakistan, the USA, and around the world. Explore viral news, tech, startups, sports, and more — all tailored for you.",
  keywords: [
    // 🌍 General & Viral
    "breaking viral update",
    "daily viral roundup",
    "viral media trend",
    "digital youth culture",
    "social media moment",
    "viral hashtag",
    "gen z lifestyle trend",
    "innovation roundup",

    // 🇵🇰 Pakistan Focus
    "Pakistan trending now",
    "Pakistan viral news",
    "youthtech Pakistan",
    "startup spotlight PK",
    "tech disruption Pakistan",
    "sports viral highlight PK",
    "business buzz Pakistan",
    "tech startup funding PK",
    "Pakistan news",
    "latest news Pakistan",

    // 🇺🇸 US Focus
    "US trending now",
    "breaking viral update USA",
    "youthtech USA",
    "startup spotlight US",
    "tech disruption USA",
    "sports viral highlight US",
    "business buzz USA",
    "daily viral roundup US",
    "next-gen business USA",
    "AI news breakthrough USA",
    "crypto startup USA",
    "TikTok trend USA",
    "viral hashtag USA",
  ],
  authors: [{ name: "NewSync Team", url: "https://www.newsync.site/about" }],
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
    description:
      "Stay updated with the latest viral news, youth trends, and global highlights — Pakistan 🇵🇰 & USA 🇺🇸 editions.",
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
      <head>
        {/* ✅ Responsive Design Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Extra Fallback for keywords (in case Next.js strips array) */}
        <meta
          name="keywords"
          content="breaking viral update, daily viral roundup, Pakistan trending now, US trending now, startup news, tech news, sports viral highlight, business buzz, youth trends, viral media trend, TikTok trend USA, innovation roundup"
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
