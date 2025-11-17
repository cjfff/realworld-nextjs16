import 'server-only'
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { cookieKey, encrypt, decrypt } from './getCookie'

export async function createSession(token: string) {
    "use server"
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set(cookieKey, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = (await cookies()).get(cookieKey)?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set(cookieKey, session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}


export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(cookieKey)
}

export async function getSession() {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(cookieKey)
    const user = await decrypt(cookie?.value)

    return (user as SessionPayload)?.token
}

