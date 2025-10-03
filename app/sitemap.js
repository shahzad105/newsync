import { getPostSlugs } from "@/lib/actions/getSlugs";

export default async function sitemap() {
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

  // Safe slug generator
  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const pages = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  // Add category pages
  categories.forEach((cat) => {
    pages.push({
      url: `${baseUrl}/category/${toSlug(cat)}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  });

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
