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
        {/* Ads Script */}
        <Script
          type="text/javascript"
          src="//pl27379521.profitableratecpm.com/e9/ef/24/e9ef24bf836fc742f68cedbc9349f44d.js"
          strategy="afterInteractive"
        />

        {/* SEO Structured Data Script */}
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
            potentialAction: {
              "@type": "SearchAction",
              target: "https://newsync.site/posts?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
      </head>
      <body className="font-sans bg-white text-black">
        <ReactQueryProvider>
          <SessionWrapper session={session}>{children}</SessionWrapper>
          <Toaster position="top-right" />
        </ReactQueryProvider>

        {/* Footer Ads Script */}
        <Script
          type="text/javascript"
          src="//pl27379678.profitableratecpm.com/e3/c3/e0/e3c3e0b7ef0a36f8a5424c73baf5964b.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
