"use server";
import fetchClient from "@/lib/api";
import { inputsSchema, Inputs} from "@/lib/schemas/newArticle";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function editAction(value: Inputs) {
  const result = inputsSchema.safeParse(value);

  if (!(await getSession())) {
    return redirect("/login");
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {slug, ...article } = result.data

  const res = await fetchClient.PUT("/articles/{slug}", {
    body: {
      article: article,
    },
    params: {
      path: {
        slug: slug!,
      },
    },
  });

  if (res.data?.article) {
    redirect("/");
  }

  return {
    formErrors: res.error?.errors.body,
  };
}
