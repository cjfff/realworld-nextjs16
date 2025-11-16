"use server"

import fetchClient from "@/lib/api"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type FollowForm = {
    following: boolean
    username: string
}

export const followAction = async (_: any, values: FollowForm) => {

    if (!await getSession()) {
        return redirect('/login')
    }

    const params = {
        params: {
            path: {
                username: values.username
            }
        }
    }

    const res = await (!values.following ?
        fetchClient.POST('/profiles/{username}/follow', params)
        : fetchClient.DELETE('/profiles/{username}/follow', params)
    )
    
    if (res.data?.profile) {
        return revalidatePath('/profile/' + values.username)
    }


    switch (res.response.status) {
        case 422:
            return {
                formErrors: res.error?.errors.body || []
            }
        default:
            throw new Error("api error");
    }
}