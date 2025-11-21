"use client";

import { Avatar } from "@/components/Avatar";
import { useResettableActionState } from "@/hooks/useResetActionState";
import { acitonParamas, commentAction } from "./actions";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useRef, useTransition } from "react";
import { useParams } from "next/navigation";
import { LoadingButton } from "@/components/LoadingButton";

export const Comment = ({ image }: { image?: string }) => {
  const [state, dispatch, isPending] = useResettableActionState(
    (_: any, data: acitonParamas) => commentAction(data),
    undefined
  );
  const [_, startTransition] = useTransition();
  const { slug } = useParams();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <ErrorMessage errors={state?.formErrors || state?.errors.body} />

      <form
        className="card comment-form"
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();
          startTransition(async () => {
            const formData = new FormData(formRef.current!);
            await dispatch({
              body: formData.get("body")?.toString() || "",
              slug: slug as string,
            });
            formRef.current?.reset();
          });
        }}
      >
        <div className="card-block">
          <textarea
            name="body"
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            required
          ></textarea>
        </div>
        <div className="card-footer">
          <Avatar src={image} className="comment-author-img" />
          <LoadingButton loading={isPending}>Post Comment</LoadingButton>
        </div>
      </form>
    </>
  );
};
