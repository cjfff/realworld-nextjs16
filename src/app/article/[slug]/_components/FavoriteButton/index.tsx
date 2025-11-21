"use client"

import clsx from "clsx";

export const FavoriteButton = ({
  count,
  favorited,
  action,
}: {
  count?: number;
  favorited?: boolean;
  action: Function
}) => {
  return (
    <button
      className={clsx(
        "btn btn-sm",
        favorited ? "btn-outline-primary" : "btn-outline-secondary"
      )}
      onClick={() => action()}
    >
      <i className={clsx("ion-heart")}></i>
      &nbsp; Favorite Post
      <span className="counter">({count || 0})</span>
    </button>
  );
};