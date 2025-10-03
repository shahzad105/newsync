import { getPostSlugs } from "@/lib/actions/getSlugs";

export async function GET() {
  const baseUrl = "https://www.newsync.site";
  const now = new Date();

  const categories = [
    "Tech",
    "Startups",
    "Youth",
    "Innovation",
    "Business",
    "Finance",
    "Sports",
    "Entertainment",
    "Education",
    "Politics",
    "Policy",
    "Economy",
    "Health",
    "Lifestyle",
    "Science",
    "AI & Machine Learning",
    "Cybersecurity",
    "Freelancing",
    "Jobs & Careers",
    "Women in Tech",
    "Opinion",
    "Interviews",
    "Events",
    "Web3 & Blockchain",
    "Apps & Gadgets",
    "Fashion",
    "National",
    "International",
    "Environment",
    "Social Impact",
    "Productivity",
    "Culture",
    "Travel",
    "Food",
    "Gaming",
    "Auto",
    "Real Estate",
    "Art & Design",
    "HealthTech",
    "EdTech",
    "FinTech",
    "E-commerce",
    "Digital Marketing",
    "Content Creation",
    "Startups & Entrepreneurship",
    "Nonprofits",
  ];

  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  // 📝 Start XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Homepage
  xml += `
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${now.toISOString()}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>1.0</priority>
    </url>\n`;

  // Categories
  categories.forEach((cat) => {
    xml += `
      <url>
        <loc>${baseUrl}/category/${toSlug(cat)}</loc>
        <lastmod>${now.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>\n`;
  });

  // Posts
  const posts = await getPostSlugs();
  posts.forEach((post) => {
    xml += `
      <url>
        <loc>${baseUrl}/post/${post.slug}</loc>
        <lastmod>${
          post.updatedAt
            ? new Date(post.updatedAt).toISOString()
            : now.toISOString()
        }</lastmod>
        <changefreq>never</changefreq>
        <priority>0.7</priority>
        ${
          post.image
            ? `<image:image>
                 <image:loc>${baseUrl}${post.image.url}</image:loc>
                 <image:title><![CDATA[${
                   post.title || "Post Image"
                 }]]></image:title>
               </image:image>`
            : ""
        }
      </url>\n`;
  });

  // End XML
  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml", // ✅ correct content type
    },
  });
}
