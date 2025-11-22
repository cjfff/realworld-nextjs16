import { Avatar } from "@/components/Avatar";
import { components } from "@/consts/schema";
import Link from "next/link";
import { DeleteArticle } from "../DeleteArticle";
import { deleteArticleAction, likePostAction } from "../../actions";
// import { FavoriteButton } from "../FavoriteButton";
import { FollowButton } from "@/components/FollowButton";
import { FavoriteButton } from "@/components/FavoriteButton";

export default async function ArticleMeta({
  article,
  isAuthor,
  refreshUrl,
}: {
  article?: components["schemas"]["Article"];
  isAuthor?: boolean;
  refreshUrl: string;
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
          refreshUrl={refreshUrl}
        />
      ) : null}
      &nbsp;&nbsp;
      <FavoriteButton
        count={article?.favoritesCount}
        slug={article?.slug!}
        refreshUrl={refreshUrl}
      />
      {/* <FavoriteButton
        count={article?.favoritesCount}
        action={async () => {
          "use server";
          likePostAction({
            favorite: !!article?.favorited,
            slug: article?.slug!,
            revalidatePath: `/article/${article?.slug}`,
          });
        }}
      /> */}
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
