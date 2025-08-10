import AddArticleForm from "@/components/AddArticle";

export function generateMetadata() {
  return {
    title: "Add New Article | NewSync",
    description: "Create and publish a new article",
  };
}

export default function AddArticlePage() {
  return (
    <div className="min-h-screen p-6">
      <AddArticleForm />
    </div>
  );
}
