// app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // allow everything
        disallow: ["/api/", "/dashboard/", "/profile/"], // block private sections
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/"], // allow images for SEO
      },
    ],
    sitemap: "https://www.newsync.site/sitemap.xml",
    host: "https://www.newsync.site",
  };
}
