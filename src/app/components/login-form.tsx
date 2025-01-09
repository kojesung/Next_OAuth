'use client';

import { useStore } from '@/hooks/useUserInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import KakaoLoginBtn from './login/KakaoLoginBtn';

interface HookFormTypes {
    id: string;
    password: string;
}

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<HookFormTypes>();
    const router = useRouter();
    const login = useStore((state) => state.login);
    const onValid: SubmitHandler<HookFormTypes> = () => {
        const id = getValues('id');
        const pw = getValues('password');
        console.log(id, pw);
        if (checkIdPw(id, pw)) {
            clearErrors('id');
            router.push('/');
        } else {
            setError('id', { message: '어어어어' });
        }
    };
    const onInValid: SubmitErrorHandler<HookFormTypes> = (errors) => {
        console.error(errors);
    };
    const name = useStore((state) => state.name);

    console.log(name);

    const checkIdPw = (id: string, pw: string) => {
        const userInfoStr = localStorage.getItem('userInfo');
        if (!userInfoStr) {
            return false; // 저장된 유저 정보가 없음
        }

        const userInfo = JSON.parse(userInfoStr);

        // ID와 비밀번호가 모두 일치하는지 확인
        if (userInfo.id === id && userInfo.password === pw) {
            login(userInfo.name);
            return true;
        }

        return false;
    };

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
                    {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
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
                <KakaoLoginBtn></KakaoLoginBtn>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">네이버</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">카카오</button>
            </div>
        </div>
    );
}
