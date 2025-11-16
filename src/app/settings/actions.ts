"use server"

import {createSession, deleteSession} from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import fetchClient from "@/lib/api";
import { inputsSchema } from "@/lib/schemas/settings";
import { omitBy } from "lodash-es";
import { components } from '@/consts/schema';

export async function logout() {
    "use server"
    await deleteSession()
    revalidatePath('/', 'layout')
    redirect('/')
}

export type ActionState = {
    errors?: Record<string, string[]>
    formErrors?: string[]
} | undefined;

export const updateAction = async (prevState: any, formData: FormData) => {
    "use server"

    const data = omitBy(Object.fromEntries(formData), (value, key) => {
        if (key === 'password' && !value) {
            return true
        }
        return false
    })

    const result = inputsSchema.safeParse(data);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const response = await fetchClient.PUT('/user', {
        body: {
            user: result.data as components['schemas']['UpdateUser']
        }
    })

    if (response.data?.user) {

        await createSession(response.data.user.token)
        revalidatePath('/', 'layout')
        return
    }

    switch (response.response.status) {
        case 422:
            return {
                formErrors: response.error?.errors.body || []
            }
        default:
            throw new Error("api error");
    }
};