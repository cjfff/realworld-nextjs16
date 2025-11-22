"use client";

import { components } from "@/consts/schema";
import { followAction } from "./actions";
import { DetailedHTMLProps, FormHTMLAttributes, useActionState, useRef, useTransition } from "react";

export const FollowButton = ({
  profileUser,
  refreshUrl,
  ...rest
}: {
  profileUser?: components["schemas"]["Profile"] | null;
  refreshUrl: string;
} & DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>) => {
  const [, dispatch, isPending] = useActionState(followAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();
  return (
    <form
      {...rest}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          dispatch({
            following: profileUser?.following!,
            username: profileUser?.username!,
            refreshUrl,
          });
        });
      }}
    >
      <button
        disabled={isPending}
        type="submit"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-plus-round"></i>
        &nbsp; {profileUser?.following ? "UnFollow" : "Follow"}{" "}
        {profileUser?.username}
      </button>
    </form>
  );
};
