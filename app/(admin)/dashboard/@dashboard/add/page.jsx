import AddArticleForm from "@/components/AddArticle";
import { createArticle } from "@/lib/actions/createArticle";
import { redirect } from "next/dist/server/api-utils";

export function generateMetadata() {
  return {
    title: "Add New Article | NewSync",
    description: "Create and publish a new article",
  };
}
const createPost = async (prevState, formData) => {
  "use server";
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image");

  const result = await createArticle({ title, description, category, image });

  return result;
};
export default function AddArticlePage() {
  return (
    <div className="min-h-screen p-6">
      <AddArticleForm action={createPost} />
    </div>
  );
}
