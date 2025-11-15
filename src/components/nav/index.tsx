import Link from 'next/link'
import { Menu } from './Menu'
import { getSession } from '@/lib/session'
import { LoginLink } from './LoginLink'

const defaultAvatarUrl = 'https://raw.githubusercontent.com/gothinkster/node-express-realworld-example-app/refs/heads/master/src/assets/images/smiley-cyrus.jpeg'

const menus = [{ 'path': '/', children: 'Home' }, { path: '/login', children: 'Sign in', login: false }, { path: '/register', children: 'Sign up', login: false },
    { path: '/editor', children: <> <i className="ion-compose"></i>&nbsp;New Article</>, login: true },
    { path: '/settings', children: <> <i className="ion-gear-a"></i>&nbsp;Settings </>, login: true }
]

export const Nav = async () => {
    const isLogin = await getSession();

    const menuData = menus.filter(item => {
        if (isLogin) {
            return item.login || typeof item.login === 'undefined'
        }

        return !item.login
    })

    return <nav className="navbar navbar-light">
        <div className="container">
            <Link className="navbar-brand" href="/">
                conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
                {
                    <Menu menus={menuData}></Menu>
                }
                {isLogin ? <LoginLink /> : null}
            </ul>
        </div>
    </nav>
}