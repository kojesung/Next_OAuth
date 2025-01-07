'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

interface SignUpForm {
    id: string;
    password: string;
    passwordCheck: string;
    name: string;
    gender: string;
    birthDate: string;
    email: string;
    phone1: string;
    phone2: string;
    phone3: string;
    confirmCode: string;
}

const checkDuplicateId = async (id: string) => {
    const response = await fetch('/data/user.json');
    const data = await response.json();
    return data.users.some((user: { id: string }) => user.id === id);
};

export default function SignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<SignUpForm>({ mode: 'onBlur' });

    const [isIdChecked, setIsIdChecked] = useState(false); // 중복 확인 감지하는 상태

    const handleCheckId = async (e: React.MouseEvent) => {
        // 중복 확인하고 form 에러 설정해주는 함수
        e.preventDefault(); // 폼 제출 방지
        const currentId = watch('id');

        if (!currentId) {
            setError('id', { message: '아이디를 입력해주세요' });
            return;
        }

        const isDuplicate = await checkDuplicateId(currentId);

        if (isDuplicate) {
            setError('id', { message: '이미 사용중인 아이디입니다' });
            setIsIdChecked(false);
        } else {
            clearErrors('id');
            setIsIdChecked(true);
            alert('사용 가능한 아이디입니다');
        }
    };

    const onValid: SubmitHandler<SignUpForm> = (data) => {
        if (!isIdChecked) {
            // 폼 제출 전 중복 확인 절차
            setError('id', { message: '아이디 중복 확인이 필요합니다' });
            return;
        }
        console.log(data);
        router.push('/login');
    };

    const onInValid: SubmitErrorHandler<SignUpForm> = (errors) => {
        console.log(errors);
    };

    const password = watch('password');
    return (
        <div className="max-w-xl mx-auto p-6 space-y-8">
            <h1 className="text-[#ff3c60] text-3xl font-extrabold text-center">ㅂㄹㅁㄹ</h1>
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg mb-6 text-center">정보를 입력해 회원가입을 완료해 주세요.</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onValid, onInValid)}>
                    <div className="relative">
                        아이디
                        <div className="flex gap-2">
                            <div className="flex-grow">
                                <input
                                    {...register('id', {
                                        onChange: () => {
                                            // ID 변경 시 중복 확인 상태 초기화
                                            setIsIdChecked(false);
                                        },
                                    })}
                                    type="text"
                                    placeholder="youthlab"
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>
                            <button onClick={handleCheckId} className="bg-[#ff3c60] text-white px-4 py-2 rounded-lg">
                                중복확인
                            </button>
                        </div>
                        {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
                    </div>
                    <div>
                        비밀번호
                        <input
                            {...register('password', {
                                required: '비밀번호를 입력해주세요',
                                minLength: {
                                    value: 8,
                                    message: '비밀번호는 최소 8자 이상이어야 합니다',
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
                                },
                            })}
                            type="password"
                            placeholder="비밀번호"
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register('passwordCheck', {
                                required: '비밀번호를 다시 입력해주세요',
                                validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
                            })}
                            type="password"
                            placeholder="비밀번호 확인"
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.passwordCheck && (
                            <p className="text-red-500 text-sm mt-1">{errors.passwordCheck.message}</p>
                        )}
                    </div>
                    <div>
                        이름
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="이름"
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    <div className=" gap-4 w-full">
                        성별
                        <select
                            {...register('gender')}
                            className="w-full p-3 border rounded-lg bg-white"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                성별을 선택하세요
                            </option>
                            <option value="female">여성</option>
                            <option value="male">남성</option>
                        </select>
                    </div>
                    <div className=" gap-2">
                        휴대폰 번호
                        <div className="flex gap-2">
                            <input
                                {...register('phone1')}
                                type="text"
                                maxLength={3}
                                className="w-20 p-3 border rounded-lg"
                            />
                            <span className="flex items-center">-</span>
                            <input
                                {...register('phone2')}
                                type="text"
                                maxLength={4}
                                className="w-20 p-3 border rounded-lg"
                            />
                            <span className="flex items-center">-</span>
                            <input
                                {...register('phone3')}
                                type="text"
                                maxLength={4}
                                className="w-20 p-3 border rounded-lg"
                            />
                            <button className="bg-[#ff3c60] text-white px-4 py-2 rounded-lg">인증하기</button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#ff3c60] text-white p-3 rounded-lg mt-6">
                        회원가입 완료
                    </button>
                </form>
            </div>
        </div>
    );
}
