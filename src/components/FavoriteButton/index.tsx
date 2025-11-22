"use client";

import { likePostAction } from "./actions";
import { DetailedHTMLProps, FormHTMLAttributes, useActionState, useRef, useTransition } from "react";

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export const FavoriteButton1 = ({
  count,
  action,
  text = "Favorite Post",
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
      <i className={clsx("ion-heart")}></i> {text}{" "}
      <span className="counter">{count || 0}</span>
    </button>
  );
};

export const FavoriteButton = ({
  count = 0,
  refreshUrl,
  text = "Favorite Post",
  slug,
  ...rest
}: {
  count?: number;
  refreshUrl: string;
  text?: string;
  slug: string;
} & DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>) => {
  const [, dispatch, isPending] = useActionState(likePostAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();
  return (
    <form
      className="inline"
      {...rest}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          dispatch({
            slug,
            favorite: false,
            refreshUrl,
          });
        });
      }}
    >
      <button
        disabled={isPending}
        type="submit"
        className="btn btn-sm btn-outline-primary action-btn"
      >
        <i className={clsx("ion-heart")}></i> {text}{" "}
        <span className="counter">{count || 0}</span>
      </button>
    </form>
  );
};
