'use client';

import { useStore } from '@/hooks/useUserInfo';
import Link from 'next/link';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

interface HookFormTypes {
    id: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit, getValues } = useForm<HookFormTypes>();
    const login = useStore((state) => state.login);
    const onValid: SubmitHandler<HookFormTypes> = () => {
        const id = getValues('id');
        const pw = getValues('password');
        console.log(id, pw);
        login('고제성');
    };
    const onInValid: SubmitErrorHandler<HookFormTypes> = (errors) => {
        console.error(errors);
    };
    const name = useStore((state) => state.name);

    console.log(name);

    return (
        <div>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onValid, onInValid)}>
                <input
                    {...register('id', {
                        required: true,
                        minLength: 4,
                        maxLength: { value: 16, message: '에러 메세지 설정' },
                    })}
                    placeholder="아이디를 입력하세요"
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                />
                <input
                    {...register('password', { required: true, minLength: 8, maxLength: 12 })}
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                    className="border border-gray-300 rounded-md p-2"
                />
                <div className="my-4">
                    <div>체크박스</div>
                    <div>일치여부</div>
                </div>
                <input
                    type="submit"
                    placeholder="로그인"
                    className=" text-white px-4 py-2 rounded-md bg-[rgba(255,72,105,1)]"
                />{' '}
            </form>

            <div className="mt-4 space-x-2">
                <button className="text-gray-600">아이디 찾기</button>
                <button className="text-gray-600">비밀번호 찾기</button>
                <Link className="text-gray-600" href="/sign-up">
                    회원가입
                </Link>
            </div>
            <div className="mt-4 space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">네이버</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">카카오</button>
            </div>
        </div>
    );
}
