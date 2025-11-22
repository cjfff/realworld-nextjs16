import React from "react";

import Articles from "@/components/Articles";
import { fetchClient } from "@/lib/api";

export default async function Home({
  children,
  ...props
}: {
  searchParams: Promise<{
    page?: number;
    size: number;
    tag: string;
    feed: string;
  }>;
  children: React.ReactNode;
}) {
  const [searchParams] = await Promise.all([
    props.searchParams,
  ]);
  const page = searchParams.page || 1;
  const size = searchParams.size || 10;
  const tag = searchParams.tag || "";

  const [articlesRes] = await Promise.all([
    fetchClient.GET(searchParams.feed ? "/articles/feed" : "/articles", {
      params: {
        query: {
          limit: size,
          offset: size * (page - 1),
          tag,
        },
      },
    }),
  ]);

  const articles = articlesRes.data?.articles || [];
  const total = articlesRes.data?.articlesCount || 0;

  return (
    <Articles
      articles={articles}
      page={page}
      size={size}
      total={total}
    />
  );
}
