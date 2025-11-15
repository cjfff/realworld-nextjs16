"use server";

// import { createSession } from "@/utils/auth/session";
// import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { inputsSchema, Inputs } from "./types";
import fetchClient from "@/lib/api";
import { createSession } from "@/lib/session";

export type ActionState = {
    errors?: string[]
} | undefined;

export const signUpAction = async (prevState: ActionState, formData: FormData) => {

        const data = Object.fromEntries(formData)

        const result = inputsSchema.safeParse(data);

        if (!result.success) {
            return {
                errors: result.error.flatten().formErrors
            }
        }

        const response = await fetchClient.POST('/users', {
            body: {
                user: result.data
            }
        })

        if (!response.error) {

            createSession(response.data.user.token);
            redirect("/");
        }

        switch (response.response.status) {
            case 422:
                return {
                    errors: Object.values(response.error.errors).flat()
                }
            default:
                throw new Error("api error");
        }
    

};