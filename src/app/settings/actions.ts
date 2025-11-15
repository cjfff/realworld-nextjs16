import {deleteSession} from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logout() {
    "use server"
    await deleteSession()
    revalidatePath('/', 'layout')
    redirect('/')
}