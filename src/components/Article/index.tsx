import { components } from "@/consts/schema";
import { Avatar } from "../Avatar";
import dayjs from "dayjs";
import { FavoriteButton } from "@/app/article/[slug]/_components/FavoriteButton";
import { likePostAction } from "@/app/article/[slug]/actions";

export const Article = ({
  article,
  revalidatePath,
}: {
  article: Omit<components["schemas"]["Article"], "body">;
  revalidatePath: string;
}) => {
  const profileHref = `/profile/${article.author.username}`;
  const articleHref = `/article/${article.slug}`;
  
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={profileHref}>
          <Avatar src={article.author.image} />
        </a>
        <div className="info">
          <a href={profileHref} className="author">
            {article.author.username}
          </a>
          <span className="date">
            {dayjs(article.createdAt).format("MMMM D")}th
          </span>
        </div>
        <FavoriteButton
          className="pull-xs-right"
          text=""
          count={article?.favoritesCount}
          action={async () => {
            "use server";
            likePostAction({
              favorite: !!article?.favorited,
              slug: article?.slug!,
              revalidatePath: revalidatePath,
            });
          }}
        />
      </div>
      <a href={articleHref} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {article.tagList.length ? (
          <ul className="tag-list">
            {article.tagList.map((tag) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        ) : null}
      </a>
    </div>
  );
};
