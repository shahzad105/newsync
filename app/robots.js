// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/?search=", "/*?search=", "/*&"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/"], // explicitly allow Twitterbot
      },
    ],
    sitemap: "https://www.newsync.site/sitemap.xml",
  };
}
