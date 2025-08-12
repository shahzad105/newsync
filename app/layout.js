import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth"; // your auth export from auth.ts
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://newsync.site"),
  title: "NewSync - Your News, Your Way",
  description: "Stay updated with the latest news tailored for you.",
  openGraph: {
    title: "NewSync - Your News, Your Way",
    description: "Stay updated with the latest news tailored for you.",
    url: "https://newsync.site",
    siteName: "NewSync",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "NewSync",
            url: "https://newsync.site/",
            image: "https://newsync.site/favicon.ico",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://newsync.site/posts?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        {/* Google Analytics */}
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
      </head>

      <body className="font-sans bg-white text-black">
        <ReactQueryProvider>
          <SessionWrapper session={session}>{children}</SessionWrapper>
          <Toaster position="top-right" />
        </ReactQueryProvider>

        {/* Social Bar Script (loads after page is ready) */}
        <Script
          type="text/javascript"
          src="//pl27379678.profitableratecpm.com/e3/c3/e0/e3c3e0b7ef0a36f8a5424c73baf5964b.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
