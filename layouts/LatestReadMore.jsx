import ReadMore from "@/components/ReadMore";
import Latest from "../components/Latest";

const LatestReadmore = ({ latestArticles }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <main className="md:w-3/4 w-full space-y-6">
          <Latest articles={latestArticles} />
        </main>
        <aside className="w-full md:w-1/4 md:sticky top-10 md:self-start md:h-fit ">
          <ReadMore></ReadMore>
        </aside>
      </div>
    </div>
  );
};

export default LatestReadmore;
