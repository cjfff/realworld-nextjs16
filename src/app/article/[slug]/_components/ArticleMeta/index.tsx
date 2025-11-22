import { Avatar } from "@/components/Avatar";
import { components } from "@/consts/schema";
import Link from "next/link";
import { DeleteArticle } from "../DeleteArticle";
import { deleteArticleAction } from "../../actions";
import { FollowButton } from "@/components/FollowButton";
import { FavoriteButton } from "@/components/FavoriteButton";

export default async function ArticleMeta({
  article,
  isAuthor,
}: {
  article?: components["schemas"]["Article"];
  isAuthor?: boolean;
}) {
  const author = article?.author;

  return (
    <div className="article-meta">
      <a href={`/profile/${author?.username}`}>
        <Avatar src={author?.image} />
      </a>
      <div className="info">
        <a href={`/profile/${author?.username}`} className="author">
          {author?.username}
        </a>
        <span className="date">January 20th</span>
      </div>
      {!isAuthor ? (
        <FollowButton
          className="inline"
          profileUser={author}
        />
      ) : null}
      &nbsp;&nbsp;
      <FavoriteButton
        count={article?.favoritesCount}
        slug={article?.slug!}
        favorite={article?.favorited}
      />
      {isAuthor ? (
        <>
          <button className="btn btn-sm btn-outline-secondary">
            <Link href={`/editor/${article?.slug}`}>
              <i className="ion-edit"></i> Edit Article
            </Link>
          </button>
          <DeleteArticle action={deleteArticleAction} />
        </>
      ) : null}
    </div>
  );
}
