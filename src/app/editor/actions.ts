"use server";
import fetchClient from "@/lib/api";
import { inputsSchema } from "@/lib/schemas/newArticle";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitAction(_: any, formData: FormData) {
  const value = Object.fromEntries(formData);
  const result = inputsSchema.safeParse(value);

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
    redirect("/");;
  }

  return {
    formErrors: res.error?.errors.body,
  };
}
