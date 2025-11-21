import dayjs from "dayjs";
import { remark } from "remark";
import html from "remark-html";

import fetchClient from "@/lib/api";
import ArticleMeta from "./_components/ArticleMeta";
import { Comment } from "./_components/CommentForm";
import { Avatar } from "@/components/Avatar";
import { deleteCommentAction } from "./actions";
import { DeleteComment } from "./_components/DeleteComment";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [res, currentUserRes, commentsRes] = await Promise.all([
    fetchClient.GET("/articles/{slug}", {
      params: {
        path: {
          slug,
        },
      },
    }),
    fetchClient.GET("/user"),
    fetchClient.GET("/articles/{slug}/comments", {
      params: {
        path: {
          slug,
        },
      },
    }),
  ]);

  const currentUser = currentUserRes.data?.user;

  const article = res.data?.article;
  const comments = commentsRes.data?.comments;
  const author = article?.author;

  const isAuthor = currentUser?.username === author?.username;

  // parse html
  const processedContent = await remark().use(html).process(article?.body);
  const contentHtml = processedContent.toString();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>

          <ArticleMeta article={article} isAuthor={isAuthor} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: contentHtml || "" }}></div>
            {article?.tagList?.length ? (
              <ul className="tag-list">
                {article?.tagList.map((tag) => {
                  return (
                    <li className="tag-default tag-pill tag-utline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} isAuthor={isAuthor} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <Comment image={currentUser?.image} />

            {comments?.map((comment) => {
              return (
                <div className="card" key={comment.id}>
                  <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                  </div>
                  <div className="card-footer">
                    <a
                      href={`/profile/${comment.author.username}`}
                      className="comment-author"
                    >
                      <Avatar
                        src={comment.author.image}
                        className="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a
                      href={`/profile/${comment.author.username}`}
                      className="comment-author"
                    >
                      {comment.author.username}
                    </a>
                    <span className="date-posted">
                      {dayjs(comment.createdAt).format("MMM D")}th
                    </span>
                    {currentUser?.username === comment.author.username ? (
                      <DeleteComment
                        action={async () => {
                          "use server";
                          await deleteCommentAction({
                            id: comment.id,
                            slug,
                          });
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
