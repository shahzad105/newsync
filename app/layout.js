import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://www.newsync.site"),
  title: "NewSync - Your News, Your Way",
  description: "Stay updated with the latest news tailored for you.",
  openGraph: {
    title: "NewSync - Your News, Your Way",
    description: "Stay updated with the latest news tailored for you.",
    url: "https://www.newsync.site",
    siteName: "NewSync",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* ✅ JSON-LD structured data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "NewSync",
            url: "https://www.newsync.site/",
            image: "https://www.newsync.site/favicon.ico",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.newsync.site/search/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E5FR591D3R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E5FR591D3R');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7195029136262194"
          crossorigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body className="bg-white text-black" suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <SessionWrapper session={session}>{children}</SessionWrapper>
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
