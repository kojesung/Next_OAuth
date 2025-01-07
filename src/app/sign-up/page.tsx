'use client';

import { useRouter } from 'next/navigation';
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

export default function SignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpForm>({ mode: 'onBlur' });
    const onValid: SubmitHandler<SignUpForm> = (data) => {
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
                                    {...register('id')}
                                    type="text"
                                    placeholder="youthlab"
                                    className="w-full p-3 border rounded-lg"
                                />
                            </div>
                            <button className="bg-[#ff3c60] text-white px-4 py-2 rounded-lg">중복확인</button>
                        </div>
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
