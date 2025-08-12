import EditArticleForm from "@/components/EditArticleForm";
import { getArticle } from "@/lib/actions/getArticle";
import { updateArticleAction } from "@/lib/actions/updateArticle";
import { redirect } from "next/navigation";

export default async function EditArticlePage({ params }) {
  const { slug } = params;

  const res = await getArticle(slug);
  const article = res?.article || null;

  const editArticle = async (prevState, formData) => {
    "use server";

    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: formData.get("image"),
    };

    return await updateArticleAction({ slug, updatedData });
  };

  return <EditArticleForm article={article} action={editArticle} />;
}
