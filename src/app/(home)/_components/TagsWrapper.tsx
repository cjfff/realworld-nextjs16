import Tags from "./Tags";
import fetchClient from "@/lib/api";

export default async () => {
  const [tags] = await Promise.all([fetchClient.GET("/tags")]);

  return (
      <Tags tags={tags.data?.tags} />
  );
};
