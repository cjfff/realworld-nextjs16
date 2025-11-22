"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default ({ tags }: { tags?: string[] }) => {
  const pathname = usePathname();
  if (!tags?.length) {
    return null;
  }
  return (
    <>
      {tags.length ? (
        <div className="tag-list">
          {tags.map((tag) => {
            return (
              <Link
                href={`${pathname}?tag=${tag}`}
                key={tag}
                className="tag-pill tag-default"
              >
                {tag}
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
