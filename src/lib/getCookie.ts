
import JSCookie from 'js-cookie';
// import { cookieKey } from './session';

export function getCookie(name: string) {
    if (typeof window === 'undefined') {
        // Read a cookie server-side
        return require('next/headers').cookies().get(name)?.value;
    }

    // Read a cookie client-side
    return JSCookie.get(name);
}

export const getSession = () => {
    return getCookie('realworld_session')
}