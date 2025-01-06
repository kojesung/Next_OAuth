import LoginForm from '../components/login-form';

export default function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4 text-[rgba(255,60,96,1)]">ㅂㄹㅁㄹ</h1>
                <LoginForm />
            </div>
        </div>
    );
}
