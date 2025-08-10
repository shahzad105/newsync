// lib/pingSearchEngines.js
export async function pingSearchEngines() {
  const sitemapUrl = "https://newsync.site/sitemap.xml";

  try {
    await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    );

    // Ping Bing (covers Yahoo too)
    await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    );

    console.log("✅ Sitemap ping sent to Google & Bing");
  } catch (err) {
    console.error("❌ Failed to ping search engines:", err);
  }
}
