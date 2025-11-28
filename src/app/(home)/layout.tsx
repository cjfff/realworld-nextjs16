import { NavLinks } from "@/components/NavLinks";
import { getUser } from "@/lib/session";

import React, { Suspense } from "react";
import TagsWrapper from "./_components/TagsWrapper";
import TagLoading from "./_components/TagLoading";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = !!(await getUser());

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
            <Suspense fallback={<TagLoading />}>
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagsWrapper />
              </div>
            </Suspense>
            
          </div>
        </div>
      </div>
    </div>
  );
}
