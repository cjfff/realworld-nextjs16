"use client"

import { components } from "@/consts/schema"
import { followAction } from './actions'
import { useActionState, useRef, useTransition } from "react"

export const FollowButton = ({ profileUser }: { profileUser?: components['schemas']['Profile'] | null }) => {
    const [state, dispatch, isPending] = useActionState(followAction, undefined)
    const formRef = useRef<HTMLFormElement>(null)
    const [_, startTransition] = useTransition()
    return <form
    ref={formRef}
         onSubmit={(e) => {
            e.preventDefault()
             startTransition(() => {
                 dispatch({
                     following: profileUser?.following!,
                     username: profileUser?.username!
                 })
             })
        }}>
        <button disabled={isPending} type="submit" className="btn btn-sm btn-outline-secondary action-btn">
            <i className="ion-plus-round"></i>
            &nbsp; {profileUser?.following ? 'UnFollow' : 'Follow'} {profileUser?.username}
        </button>
    </form>

}