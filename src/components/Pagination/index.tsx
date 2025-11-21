import clsx from "clsx";

export const Pagination = (props: {
  pathPrefix: string;
  page: number;
  size: number;
  total: number;
}) => {
  const { page, pathPrefix, size, total } = props;
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
              href={`${pathPrefix}${
                pathPrefix.includes("?") ? "%" : "?"
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
