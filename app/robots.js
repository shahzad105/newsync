// app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/*?search=", "/*&*", "/*$"],
        allow: ["/"],
      },
    ],
    sitemap: "https://newsync.site/sitemap.xml",
  };
}
