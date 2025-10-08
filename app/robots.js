// app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/", "/static/"], // explicitly allow Next.js assets
        disallow: ["/dashboard/", "/profile/"], // block private sections
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/_next/image"], // allow all images including optimized ones
      },
    ],
    sitemap: "https://www.newsync.site/sitemap.xml",
  };
}
