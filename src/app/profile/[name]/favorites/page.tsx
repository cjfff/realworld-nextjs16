import Articles from "@/components/Articles";
import { fetchClient } from "@/lib/api";
import { headers } from "next/headers";

export default async function Profile(props: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: number; size: number }>;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const username = params?.name;
  const page = searchParams?.page || 1;
  const size = searchParams?.size || 10;
  const searchKey = pathname?.includes("favorites") ? "favorited" : "author";

  const [articlesRes] = await Promise.all([
    fetchClient.GET("/articles", {
      params: {
        query: {
          limit: size,
          offset: size * (page - 1),
          [searchKey]: username,
        },
      },
    }),
  ]);

  const articles = articlesRes.data?.articles || [];
  const total = articlesRes.data?.articlesCount || 0;

  return (
    <Articles
      articles={articles}
      total={total}
      page={page}
      size={size}
    />
  );
}
