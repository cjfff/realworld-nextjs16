import { NavLinks } from "@/components/NavLinks";
import { fetchClient } from "@/lib/api";
import { getSession } from "@/lib/session";

import React from "react";
import Tags from "./_components/Tags";

export default async function Home({
  children,
}: {
  searchParams: Promise<{
    page?: number;
    size: number;
    tag: string;
    feed: string;
  }>;
  children: React.ReactNode;
}) {

  const isLogin = !!(await getSession());
  const [tags] = await Promise.all([
    fetchClient.GET("/tags"),
  ]);


  const navs = [
    {
      name: "Global Feed",
      href: "/",
      show: true,
    },
    {
      name: "Your Feed",
      href: "/feed",
      show: isLogin,
    },
  ].filter((item) => item.show);

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
              <NavLinks navs={navs} />
            </div>

            {children}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={tags.data?.tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
