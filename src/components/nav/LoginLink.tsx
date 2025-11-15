// "use client"
import Link from 'next/link'

import { fetchClient } from "@/lib/api"

export const LoginLink = async () => {
    const data = await fetchClient.GET('/user') 
    
    const user = data.data?.user

    return <li className="nav-item">
        <Link className={"nav-link"} href={`/profile/${user?.username}`}>
            <img src={user?.image} className="user-pic" />{user?.username}
        </Link>
    </li>
}