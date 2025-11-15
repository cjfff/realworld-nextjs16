import Link from 'next/link'
import { headers } from 'next/headers';
import { Menu } from './Menu'
const menus = [{ 'path': '/', children: 'Home' }, { path: '/login', children: 'Sign in' }, { path: '/register', children: 'Sign up' }]

export const Nav = async () => {
    const isLogin = false;

    // return <nav className="navbar navbar-light">
    //     <div className="container">
    //         <a className="navbar-brand" href="/">conduit</a>
    //         <ul className="nav navbar-nav pull-xs-right">
    //             <li className="nav-item">
    //                 {/* <!-- Add "active" className when you're on that page" --> */}
    //                 <a className="nav-link active" href="/">Home</a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
    //             </li>
    //             <li className="nav-item">
    //                 <a className="nav-link" href="/profile/eric-simons">
    //                     <img src="" className="user-pic" />
    //                     Eric Simons
    //                 </a>
    //             </li>
    //         </ul>
    //     </div>
    // </nav>


    return <nav className="navbar navbar-light">
        <div className="container">
            <Link className="navbar-brand" href="/">
                conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
                {
                    isLogin ? <>
                        <li className="nav-item">
                            {/* <!-- Add "active" className when you're on that page" --> */}
                            <Link className="nav-link active" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile/eric-simons">
                                <img src="" className="user-pic" />
                                Eric Simons
                            </a>
                        </li>
                    </>
                        : <Menu menus={menus}></Menu>
                }

            </ul>
        </div>
    </nav>
}