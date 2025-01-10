'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useStore } from '@/hooks/useUserInfo';
import { useEffect } from 'react';

export default function LoginButton() {
    const login = useStore((state) => state.login);
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user?.name) {
            login(session.user.name);
        }
    }, [session, login]);
    const loginKakao = async () => {
        await signIn('kakao'); // 이 과정에서 await은 로그인 프로세스 완료만 기다리기 때문에 session업데이트는 아직 되지 않았을 수 있음
        // 따라서 위에 useEffect에서 관리해줘야함
    };
    const logoutKakao = () => {
        signOut();
    };

    if (session) {
        return (
            <>
                {session.user?.name} <br />
                <button onClick={() => logoutKakao()}>로그아웃</button>
            </>
        );
    }

    return (
        <button onClick={() => loginKakao()} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            카카오 로그인
        </button>
    );
}
