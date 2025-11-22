"use server";
import fetchClient from "@/lib/api";
import { getSession } from "@/lib/getCookie";
import { Inputs, inputsSchema } from "@/lib/schemas/newArticle";
import { redirect } from "next/navigation";

export async function submitAction(_: any, value: Inputs) {

  const result = inputsSchema.safeParse(value);

  if (!(await getSession())) {
    return redirect("/login");
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const res = await fetchClient.POST("/articles", {
    body: {
      article: result.data,
    },
  });

  if (res.data?.article) {
    redirect("/");
  }

  return {
    formErrors: res.error?.errors.body,
  };
}
