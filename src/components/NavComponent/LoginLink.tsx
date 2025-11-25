import Link from 'next/link'

import { getUser } from '@/lib/session'
import { defaultAvatarUrl } from './const'

export const LoginLink = async () => {
    const user = await getUser()
    
    return <li className="nav-item">
        
        <Link className={"nav-link"} href={`/profile/${user?.username}`}>
            <img alt={user?.username || "avatar"} src={user?.image || defaultAvatarUrl} className="user-pic" />{user?.username}
        </Link>
    </li>
}