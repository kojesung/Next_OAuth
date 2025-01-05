'use client';

export default function LoginForm() {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <input type="text" className="border border-gray-300 rounded-md p-2" />
                <input type="text" className="border border-gray-300 rounded-md p-2" />
            </div>
            <div className="my-4">
                <div>체크박스</div>
                <div>일치여부</div>
            </div>
            <button className=" text-white px-4 py-2 rounded-md bg-[rgba(255,72,105,1)]">로그인</button>
            <div className="mt-4 space-x-2">
                <button className="text-gray-600">아이디 찾기</button>
                <button className="text-gray-600">비밀번호 찾기</button>
                <button className="text-gray-600">회원가입</button>
            </div>
            <div className="mt-4 space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">네이버</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">카카오</button>
            </div>
        </div>
    );
}
