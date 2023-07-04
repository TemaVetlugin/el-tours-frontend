import { NextResponse } from 'next/server'
import { Cache } from "shared/utilities/server";

export async function GET(request: Request, context: any) {
    try {
        Cache.redis?.flushdb();
        const url = new URL(request.url);
        return NextResponse.redirect(url.searchParams.get('redirect') ?? '/');
    } catch (err) {
        return NextResponse.json({ status: 'error' });
    }
}
