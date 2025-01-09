'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                {session.user?.name} <br />
                <button onClick={() => signOut()}>로그아웃</button>
            </>
        );
    }

    return (
        <button onClick={() => signIn('kakao')} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            카카오 로그인
        </button>
    );
}
