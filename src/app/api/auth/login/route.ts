import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try{
        (await cookies()).set(
            'isAuth', 'true', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60*60*24,
                path: '/'
            }
        );
        return NextResponse.json({ message: 'Authenticated' });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}