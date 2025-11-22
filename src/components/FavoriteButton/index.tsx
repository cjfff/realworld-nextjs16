"use client";

import { likePostAction } from "./actions";
import { DetailedHTMLProps, FormHTMLAttributes, useActionState, useRef, useTransition } from "react";

import clsx from "clsx";
import { usePathname } from "next/navigation";

export const FavoriteButton = ({
  count = 0,
  text = "Favorite Post",
  slug,
  favorite,
  ...rest
}: {
  count?: number;
  text?: string;
  slug: string;
  favorite?: boolean
} & DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>) => {
  const [, dispatch, isPending] = useActionState(likePostAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
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
            favorite: favorite || false,
            refreshUrl: pathname,
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
