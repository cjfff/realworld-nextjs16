"use client";

import { useResettableActionState } from "@/hooks/useResetActionState";
import { submitAction } from "./actions";
import { Controller, useForm } from "react-hook-form";
import { resolver } from "@/lib/schemas/newArticle";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useTransition, useRef } from "react";

export default function Article() {
  const [state, dispatch, isPending] = useResettableActionState(
    submitAction,
    undefined
  );

  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    resolver,
  });
  const [_, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessage errors={state?.formErrors} />

            <form
              ref={formRef}
              action={dispatch}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((values) => {
                  startTransition(() => {
                    dispatch(new FormData(formRef.current!));
                  });
                })(e);
              }}
            >
              <fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("title")}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <ErrorMessage error={errors.title} />

                <fieldset className="form-group">
                  <input
                    {...register("description")}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <ErrorMessage error={errors.description} />

                <fieldset className="form-group">
                  <textarea
                    {...register("body")}
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <ErrorMessage error={errors.body} />

                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyDown={(e) => {
                      e.stopPropagation();

                      if (e.key === "Enter") {
                        const tagList = getValues("tagList") || [];
                        const value = e.currentTarget.value.trim();

                        if (!tagList.includes(value) && value) {
                          tagList.push(value);
                          e.currentTarget.value = "";
                          setValue("tagList", tagList);
                        }
                        e.preventDefault();
                      }
                    }}
                  />
                </fieldset>

                <Controller
                  name="tagList"
                  control={control}
                  render={({ field }) => {
                    const list = field.value;
                    return (
                      <div className="tag-list">
                        {(list || []).map((tag) => {
                          return (
                            <span key={tag} className="tag-default tag-pill">
                              <i
                                className="ion-close-round"
                                onClick={() => {
                                  const tagList = list || [];
                                  setValue(
                                    "tagList",
                                    tagList.filter((item) => item !== tag)
                                  );
                                }}
                              ></i>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    );
                  }}
                />

                <ErrorMessage error={errors.tagList} />

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Loading" : "Publish Article"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
