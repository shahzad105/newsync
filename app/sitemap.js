import { getPostSlugs } from "@/lib/actions/getSlugs";

export default async function GET() {
  const baseUrl = "https://www.newsync.site";
  const now = new Date();

  // Homepage
  const pages = [
    {
      loc: `${baseUrl}/`,
      lastmod: now.toISOString(),
      changefreq: "hourly",
      priority: 1.0,
    },
  ];

  // Add posts from DB
  const posts = await getPostSlugs();
  const postPages = posts.map((post) => ({
    loc: `${baseUrl}/post/${post.slug}`,
    lastmod: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : now.toISOString(),
    changefreq: "never",
    priority: 0.7,
  }));

  const allPages = [...pages, ...postPages];

  // Convert to XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `<url>
  <loc>${page.loc}</loc>
  <lastmod>${page.lastmod}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
