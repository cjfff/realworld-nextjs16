import fetchClient from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteCommentAction = async (data: {
  slug: string;
  id: number;
}) => {
  "use server";
  await fetchClient.DELETE("/articles/{slug}/comments/{id}", {
    params: {
      path: {
        ...data,
      },
    },
  });

  revalidatePath(`/article/${data.slug}`);
};

export const deleteArticleAction = async (data: { slug: string }) => {
  "use server";
  await fetchClient.DELETE("/articles/{slug}", {
    params: {
      path: {
        ...data,
      },
    },
  });
  redirect("/");
};
