import { getPostSlugs } from "@/lib/actions/getSlugs";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.newsync.site";
  const now = new Date().toISOString();

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let postPages = [];
  try {
    const posts = await getPostSlugs();
    postPages = posts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch post slugs:", error);
  }

  return [...staticPages, ...postPages];
}
