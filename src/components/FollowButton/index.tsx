"use client";

import { components } from "@/consts/schema";
import { followAction } from "./actions";
import { DetailedHTMLProps, FormHTMLAttributes, useActionState, useRef, useTransition } from "react";
import { usePathname } from "next/navigation";

export const FollowButton = ({
  profileUser,
  ...rest
}: {
  profileUser?: components["schemas"]["Profile"] | null;
} & DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>) => {
  const [, dispatch, isPending] = useActionState(followAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [, startTransition] = useTransition();
  const pathname = usePathname()
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
            refreshUrl: pathname,
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
