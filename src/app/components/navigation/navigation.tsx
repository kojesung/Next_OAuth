'use client';
import { useStore } from '@/hooks/useUserInfo';

export default function Navigation() {
    const userName = useStore((state) => state.name);
    return (
        <div>
            <div>여기는 네비게이션바</div>
            <div>유저이름 : {userName}</div>
        </div>
    );
}
