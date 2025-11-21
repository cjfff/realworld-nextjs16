import { fetchClient } from "@/lib/api";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { FollowButton } from "./_components/FollowButton/index";
import { defaultAvatarUrl } from "@/components/nav/LoginLink";
import clsx from "clsx";
import { Article } from "@/components/Article";
import { Pagination } from "@/components/Pagination";

export default async function Profile(props: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: number; size: number; favorited: string }>;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const username = params.name;
  const page = searchParams.page || 1;
  const size = searchParams.size || 10;
  const searchKey = searchParams.favorited ? 'favorited' : 'author'

  const profilePath = `/profile/${username}`

  const [profileRes, currentUser, articlesRes] = await Promise.all([
    fetchClient.GET("/profiles/{username}", {
      params: {
        path: {
          username,
        },
      },
    }),
    (await getSession()) ? (await fetchClient.GET("/user")).data?.user : null,
    fetchClient.GET("/articles", {
      params: {
        query: {
          limit: size,
          offset: size * (page - 1),
          [searchKey]: username,
        },
      },
    }),
  ]);

  const profile = profileRes.data?.profile;
  const articles = articlesRes.data?.articles || [];
  const articlesCount = articlesRes.data?.articlesCount;

  const totalPages = Math.ceil((articlesCount || 1) / size);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile?.image || defaultAvatarUrl}
                className="user-img object-fill"
                alt={profile?.username}
              />
              <h4>{profile?.username}</h4>
              <p>
                {profile?.bio ||
                  `There is nothing left from ${profile?.username}`}
              </p>
              {/* when the profile is the same user with the current login, not need to display the followButton */}
              {currentUser?.username === username ? null : (
                <FollowButton profileUser={profile} />
              )}

              {currentUser ? (
                <Link
                  href={`/settings`}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", {
                      active: searchKey === "author",
                    })}
                    href={`/profile/${username}`}
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", {
                      active: searchKey === "favorited",
                    })}
                    href={`/profile/${username}?favorited=1`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            {articles.map((article) => {
              return (
                <Article
                  key={article.slug}
                  article={article}
                  revalidatePath={profilePath}
                />
              );
            })}

            <Pagination
              page={page}
              size={size}
              total={articles.length}
              pathPrefix={
                searchKey === "author"
                  ? `/profole/${username}`
                  : `/profole/${username}?favorited=1`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
