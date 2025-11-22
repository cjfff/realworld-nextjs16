import { Article } from "@/components/Article";
import { Pagination } from "@/components/Pagination";
import { components } from "@/consts/schema";

type Article = Omit<components["schemas"]["Article"], "body">

export default ({
  articles,
  revalidatePath,
  page,
  size,
  total,
}: {
  articles?: Article[];
  page: number;
  size: number;
  total: number;
  revalidatePath: string;
}) => {
  return (
    <>
      {articles?.length ? (
        articles.map((article) => {
          return (
            <Article
              key={article.slug}
              article={article}
              revalidatePath={revalidatePath}
            />
          );
        })
      ) : (
        <div className="my-10">No articles</div>
      )}

      <Pagination page={page} size={size} total={total} />
    </>
  );
};