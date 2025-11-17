import { editAction } from "./actions";
import ArticleForm from "../_components/ArticleForm";
import { Inputs } from "@/lib/schemas/newArticle";
import fetchClient from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const [article, currentUser] = await Promise.all([
    fetchClient
      .GET("/articles/{slug}", {
        params: {
          path: {
            slug: slug,
          },
        },
      })
      .then((res) => res.data?.article),
    fetchClient.GET("/user").then((res) => res.data?.user),
  ] as const);

  const submit = async (_: any, values: Inputs) => {
    "use server";
    return editAction({
      ...values,
      slug,
    } as Inputs);
  };

  
  if (currentUser?.username !== article?.author.username) {
    redirect("/");
  }

  return <ArticleForm type="edit" action={submit} defaultValues={article} />;
}
