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

  const pages = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  categories.forEach((cat) => {
    const slug = cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
    pages.push({
      url: `${baseUrl}/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  const posts = await getPostSlugs();
  posts.forEach((post) => {
    pages.push({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: new Date(post.updatedAt || now),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return pages;
}
