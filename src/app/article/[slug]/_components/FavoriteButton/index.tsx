"use client"

import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const FavoriteButton = ({
  count,
  action,
  text = "&nbsp; Favorite Post",
  ...rest
}: {
  count?: number;
  action: Function;
  text?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...rest}
      className={clsx("btn btn-sm", "btn-outline-primary", rest.className)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        action();
      }}
    >
      <i className={clsx("ion-heart")}></i> {text} <span className="counter">{count || 0}</span>
    </button>
  );
};