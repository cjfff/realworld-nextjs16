import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getSession()

    if (!token) {
        return NextResponse.json({ message: 'unautorized' }, {
            status: 401
        })
    }
    return NextResponse.json({ message: "success", data: token })
}