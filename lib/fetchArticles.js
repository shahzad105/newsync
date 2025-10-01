"use server";

export async function fetchArticles(
  category = "All",
  limit = 10,
  latest = true
) {
  try {
    const res = await fetch(
      `${process.env.SITE_URL}/api/articles?category=${category}&limit=${limit}&latest=${latest}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error(error.message || "Failed to fetch articles");
  }
}
