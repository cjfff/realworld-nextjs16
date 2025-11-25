import Link from "next/link";

import { fetchClient } from "@/lib/api";
import { getUser } from "@/lib/session";
import { Avatar } from "@/components/Avatar";
import { FollowButton } from "@/components/FollowButton";
import { NavLinks } from "@/components/NavLinks";

export default async function ProfileLayout({
  children,
  ...props
}: {
  params: Promise<{ name: string }>;
  children: React.ReactNode;
}) {
  const [params] = await Promise.all([
    props.params,
  ]);

  const username = params.name;

  const [profileRes, currentUser] = await Promise.all([
    fetchClient.GET("/profiles/{username}", {
      params: {
        path: {
          username,
        },
      },
    }),
   await getUser()
  ]);

  const profile = profileRes.data?.profile;

  const navs = [
    {
      name: "My Articles",
      href: `/profile/${username}`,
    },
    {
      name: "Favorited Articles",
      href: `/profile/${username}/favorites`,
    },
  ];

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Avatar className="user-img object-fill" src={profile?.image} />
              <h4>{profile?.username}</h4>
              <p>
                {profile?.bio ||
                  `There is nothing left from ${profile?.username}`}
              </p>
              {/* when the profile is the same user with the current login, not need to display the followButton */}
              {currentUser?.username === username ? null : (
                <FollowButton
                  profileUser={profile}
                />
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
              <NavLinks navs={navs} />
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
