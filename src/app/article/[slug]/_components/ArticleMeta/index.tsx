import { Avatar } from "@/components/Avatar";
import { components } from "@/consts/schema";
import Link from "next/link";
import { DeleteArticle } from "../DeleteArticle";
import {
  deleteArticleAction,
  followActions,
  likePostAction,
} from "../../actions";
import { FavoriteButton } from "../FavoriteButton";
import { FollowButton } from "../FollowButton";

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
          action={async () => {
            "use server";
            followActions({
              slug: article?.slug!,
              follow: author?.following!,
              username: author?.username!,
            });
          }}
          following={author?.following}
          username={author?.username}
        />
      ) : null}
      &nbsp;&nbsp;
      <FavoriteButton
        count={article?.favoritesCount}
        action={async () => {
          "use server";
          likePostAction({
            favorite: !!article?.favorited,
            slug: article?.slug!,
            revalidatePath: `/article/${article?.slug}`
          });
        }}
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
