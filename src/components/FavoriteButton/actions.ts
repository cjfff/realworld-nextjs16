"use server"

import fetchClient from "@/lib/api"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const likePostAction = async (
  _: any,
  {
    slug,
    favorite,
    refreshUrl,
  }: {
    slug: string;
    favorite: boolean;
    refreshUrl: string;
  }
) => {
  "use server";
  if (!(await getSession())) {
    return redirect("/login");
  }
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

  revalidatePath(refreshUrl);
};
