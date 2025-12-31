import { getPostSlugs } from "@/lib/actions/getSlugs";

export const revalidate = 3600; // optional, regenerate every hour

export default async function sitemap() {
  const baseUrl = "https://www.newsync.site";
  const now = new Date().toISOString();

  const pages = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  const posts = await getPostSlugs();
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : now,
    changeFrequency: "never",
    priority: 0.7,
  }));

  return [...pages, ...postPages];
}
