"use server";

import { redirect } from "next/navigation";
import fetchClient from "@/lib/api";
import { createSession } from "@/lib/session";
import { inputsSchema } from "@/lib/schemas/login";

export const loginAction = async (prevState: any, formData: FormData) => {

    const data = Object.fromEntries(formData)

    const result = inputsSchema.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const response = await fetchClient.POST('/users/login', {
        body: {
            user: result.data
        }
    })

    if (response.data?.user) {

        await createSession(response.data.user.token);
        redirect("/");
    }

    switch (response.response.status) {
        case 401:
        case 422:
            return {
                formErrors: response.error?.errors.body || []
            }
        default:
            throw new Error("api error");
    }


};