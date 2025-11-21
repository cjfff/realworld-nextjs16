"use server";

import fetchClient from "@/lib/api";
import { inputsSchema } from "@/lib/schemas/comment";
import { revalidatePath } from "next/cache";

export type acitonParamas = {
  slug: string;
  body: string;
}

export const commentAction = async ({ slug, body }: acitonParamas) => {
  const result = inputsSchema.safeParse({ body });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const res = await fetchClient.POST("/articles/{slug}/comments", {
    body: {
      comment: {
        body: result.data.body,
      },
    },
    params: {
      path: {
        slug: slug,
      },
    },
  });

  if (!res.error) {
    return revalidatePath(`/article/${slug}`);
  }

  return {
    formErrors: res.error?.errors.body,
  };
};
