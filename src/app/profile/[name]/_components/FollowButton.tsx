"use client"

import { components } from "@/consts/schema"
import { $api } from "@/lib/api"
import { useRouter } from "next/navigation"

export const FollowButton = ({ currentUser, profileUser }: { currentUser?: components['schemas']['User'] | null, profileUser?: components['schemas']['Profile'] | null }) => {
    const route = useRouter()

    const followMutation = $api.useMutation('post', '/profiles/{username}/follow')
    const unFollowMutation = $api.useMutation('delete', '/profiles/{username}/follow')
    
    return <button className="btn btn-sm btn-outline-secondary action-btn" onClick={async () => {
        if (!currentUser) {
            return route.replace('/login')
        }

        const params = {
            params: {
                path: {
                    username: profileUser?.username!
                }
            }
        }

        await !profileUser?.following ? followMutation.mutateAsync(params) : unFollowMutation.mutateAsync(params)


        route.refresh()

    }}>
        <i className="ion-plus-round"></i>
        &nbsp; {profileUser?.following ? 'UnFollow' : 'Follow'} {profileUser?.username}
    </button>
}