
import JSCookie from 'js-cookie';
import { jwtVerify, SignJWT } from 'jose'
import { SessionPayload } from '@/lib/definitions'

export const cookieKey = 'realworld_session'
export const secretKey = process.env.SESSION_SECRET
export const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}


export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}


export async function getCookie(name: string) {
    if (typeof window === 'undefined') {
        // Read a cookie server-side
        const cookies = require('next/headers').cookies
        const cookie = await cookies()
        return cookie.get(name)?.value;
    }

    // Read a cookie client-side
    return JSCookie.get(name);
}

export const getSession = async () => {
    const cookie = await getCookie(cookieKey)
    // because the secret didn't explosure to frontend, so that in the client side, didn't dycrypt the content.
    const user = await decrypt(cookie)

    return (user as SessionPayload)?.token
}