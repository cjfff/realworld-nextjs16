"use client";

import { submitAction } from "./actions";
import ArticleForm from "./_components/ArticleForm";

export default function Article() {
  return <ArticleForm action={submitAction} />;
}
