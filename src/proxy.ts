import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/session'

export async function proxy(request: NextRequest) {   
    await updateSession()
}
