"use client"

import clsx from "clsx";
import { usePathname } from "next/navigation";


export const Pagination = (props: {
  page: number;
  size: number;
  total: number;
}) => {
  const pathname = usePathname()
  const { page, size, total } = props;
  const totalPages = Math.ceil(total / size);
  if (total === 0 || totalPages <= 1) {
    return;
  }

  return (
    <ul className="pagination">
      {Array.from({ length: totalPages }).map((_, i) => {
        const currentPage = i + 1;
        return (
          <li
            className={clsx("page-item", {
              active: currentPage === Number(page),
            })}
            key={currentPage + ""}
          >
            <a
              className="page-link"
              href={`${pathname}${
                pathname.includes("?") ? "%" : "?"
              }page=${currentPage}`}
            >
              {currentPage}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
