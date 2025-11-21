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

export const likePostAction = async ({
  slug,
  favorite,
}: {
  slug: string;
  favorite: boolean;
}) => {
  "use server";
  const params = {
    params: {
      path: {
        slug,
      },
    },
  };
  (await favorite)
    ? fetchClient.DELETE("/articles/{slug}/favorite", params)
    : fetchClient.POST("/articles/{slug}/favorite", params);

  revalidatePath(`/article/${slug}`);
};



export const followActions = async ({
  username,
  follow,
  slug,
}: {
  username: string;
  follow: boolean;
  slug: string;
}) => {
  "use server";
  const params = {
    params: {
      path: {
        username,
      },
    },
  };
  (await follow)
    ? fetchClient.DELETE("/profiles/{username}/follow", params)
    : fetchClient.POST("/profiles/{username}/follow", params);

  revalidatePath(`/article/${slug}`);
};
