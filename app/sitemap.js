import { getPostSlugs } from "@/lib/actions/getSlugs";

export default async function sitemap() {
  const baseUrl = "https://www.newsync.site";
  const now = new Date();

  // Safe slug generator

  const pages = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  // Add posts from DB
  const posts = await getPostSlugs();
  posts.forEach((post) => {
    pages.push({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: "never",
      priority: 0.7,
    });
  });

  return pages;
}
