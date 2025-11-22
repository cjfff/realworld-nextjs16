import { Article } from "@/components/Article";
import { Pagination } from "@/components/Pagination";
import { fetchClient } from "@/lib/api";
import { getSession } from "@/lib/session";
import clsx from "clsx";
import Link from "next/link";

export default async function Home(props: {
  searchParams: Promise<{
    page?: number;
    size: number;
    tag: string;
    feed: string;
  }>;
}) {
  const [searchParams] = await Promise.all([props.searchParams]);
  const page = searchParams.page || 1;
  const size = searchParams.size || 10;
  const tag = searchParams.tag || "";
  const isLogin = !!(await getSession());

  const [articlesRes, tags] = await Promise.all([
    fetchClient.GET(searchParams.feed ? "/articles/feed" : "/articles", {
      params: {
        query: {
          limit: size,
          offset: size * (page - 1),
          tag,
        },
      },
    }),
    fetchClient.GET("/tags"),
  ]);

  const articles = articlesRes.data?.articles || [];

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", {
                      active: !searchParams.feed,
                    })}
                    href={`/`}
                  >
                    Global Feed
                  </Link>
                </li>
                {isLogin ? (
                  <li className="nav-item">
                    <Link
                      className={clsx("nav-link", {
                        active: searchParams.feed,
                      })}
                      href={`/?feed=1`}
                    >
                      Your Feed
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>

            {articles.length ? (
              articles.map((article) => {
                return (
                  <Article
                    key={article.slug}
                    article={article}
                    revalidatePath={"/"}
                  />
                );
              })
            ) : (
              <div className="my-10">No articles</div>
            )}

            <Pagination
              page={page}
              size={size}
              total={articles.length}
              pathPrefix={!searchParams.feed ? `/` : `/?feed=1`}
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {tags.data?.tags.length ? (
                <div className="tag-list">
                  {tags.data?.tags.map((tag) => {
                    return (
                      <Link
                        href={`/?tag=${tag}`}
                        key={tag}
                        className="tag-pill tag-default"
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
