import {FormEvent, useState} from 'react'
import {Button} from '../../../components/ui/button'
import {Input} from '../../../components/ui/input'
import {ArrowRight, Eye, EyeOff, Loader2} from 'lucide-react'
import {useAuth} from "../../../providers/auth-provider.tsx";
import useMessage from '../../../hooks/useMessage';
import {LocalStorageKey} from "../../../types/localstorage.ts";
import {AxiosError} from "axios";
import {IError} from "../../../types/error.ts";
import {Link} from '@tanstack/react-router';
import useLink from "../../../hooks/useLink.ts";

export const Login = () => {
    const {navigate} = useLink()
    const {user, login, logout, loading} = useAuth();
    const {openNotification, contextHolder} = useMessage();
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault()
        const dataLogin = {
            email: user && user.email && !formData.get('email') ? user.email : formData.get('email') as string,
            password: formData.get('password') as string,
        }
        if (!dataLogin.email || !dataLogin.password) {
            openNotification("topRight", "Please enter a valid email address and password");
        } else {
            await login(dataLogin.email, dataLogin.password)
                .then((result) => {
                    openNotification("topRight", result.message);
                    const oldLink = localStorage.getItem(LocalStorageKey.OLD_URL);
                    if(oldLink){
                        navigate({
                            to: oldLink
                        })
                    } else {
                        navigate({
                            to: `/work/${result.user?.id}`
                        })
                    }
                })
                .catch((error: AxiosError) => {
                    if (error instanceof AxiosError && error.response) {
                        const dataError = error.response.data as IError;
                        if (dataError && dataError.message) {
                            openNotification("topRight", dataError.message);
                            console.log(dataError.message);
                        }
                    } else {
                        openNotification("topRight", "An unexpected error occurred.");
                    }
                })
        }
    }
    const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    if (token && user) {
        return (
            <>
                {contextHolder}
                <div className={"lg:min-h-screen min-h-1/2 w-full flex flex-col justify-center items-center"}>
                    <div className="mb-2 text-sm text-gray-700">Full name: {user.name}</div>
                    <div className="mb-2 text-sm text-gray-700">Email: {user.email}</div>
                    <div className="mb-4 text-sm text-gray-700">Created at: {user.created_at}</div>
                    <Button
                        className="mt-2.5 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={logout}
                    >
                        {loading && <Loader2 className="animate-spin inline-block mr-2"/>}
                        Logout
                    </Button>
                </div>
            </>
        )
    }
    return (
        <>
            {contextHolder}
            <div className="lg:min-h-screen min-h-1/2 w-full flex">
                {/* Right Section */}
                <div className="w-full p-8 flex items-center justify-center bg-white text-black">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex justify-between items-center text-white">
                            <div className="text-sm text-black">
                                I haven't an account?{' '}
                                <Link to="/auth/signup" className="text-primary font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">Login your account</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Social Login Buttons */}
                            <div className="grid gap-4 md:grid-cols-2 text-black">
                                <Button variant="outline" className="w-full te bg-white">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <svg viewBox="-0.5 -0.5 16 16" fill="#000000"
                                         xmlns="http://www.w3.org/2000/svg"
                                         id="Github-Fill--Streamline-Remix-Fill"
                                         style={{width: "20px", height: "20px"}}>
                                        <path
                                            d="M7.500624999999999 1.25C4.0474875 1.25 1.2506125000000001 4.046875 1.2506125000000001 7.5c0 2.765625 1.7890625 5.1015625 4.2734375 5.9296875 0.3125 0.0546875 0.4296875 -0.1328125 0.4296875 -0.296875 0 -0.1484375 -0.0078125 -0.640625 -0.0078125 -1.1640625 -1.5703125 0.2890625 -1.9765625 -0.3828125 -2.1015625 -0.734375 -0.0703125 -0.1796875 -0.375 -0.734375 -0.640625 -0.8828125 -0.21875 -0.1171875 -0.53125 -0.40625 -0.0078125 -0.4140625 0.4921875 -0.0078125 0.84375 0.453125 0.9609375 0.640625 0.5625 0.9453125 1.4609375 0.6796875 1.8203125 0.515625 0.0546875 -0.40625 0.21875 -0.6796875 0.39844999999999997 -0.8359375 -1.3906375000000002 -0.15625 -2.8437625 -0.6953125 -2.8437625 -3.0859375 0 -0.6796875 0.2421875 -1.2421875 0.640625 -1.6796875 -0.0625 -0.15625 -0.28125 -0.796875 0.0625 -1.65625 0 0 0.5234375 -0.1640625 1.71875 0.640625 0.5000125 -0.140625 1.0312625 -0.2109375 1.5625125 -0.2109375 0.53125 0 1.0625 0.0703125 1.5625 0.2109375 1.1953125 -0.8125 1.71875 -0.640625 1.71875 -0.640625 0.34375 0.859375 0.125 1.5 0.0625 1.65625 0.3984375 0.4375 0.640625 0.9921875 0.640625 1.6796875 0 2.3984375 -1.4609375 2.9296875 -2.8515625 3.0859375 0.2265625 0.1953125 0.421875 0.5703125 0.421875 1.15625 0 0.8359375 -0.0078125 1.5078125 -0.0078125 1.71875 0 0.1640625 0.1171875 0.359375 0.4296875 0.296875C12.036875 12.570812499999999 13.7499375 10.1851875 13.750625000000001 7.5c0 -3.453125 -2.796875 -6.25 -6.25 -6.25Z"
                                            strokeWidth="1"></path>
                                    </svg>
                                    Sign in with Github
                                </Button>
                            </div>

                            <div className="relative flex items-center justify-center">
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or sign in with email and password</span>
                                </div>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 text-start">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="email">
                                        Email address
                                    </label>
                                    <Input autoComplete={"email"} id="email" type="email" name="email"
                                           placeholder={user && user.email ? user.email : "Enter email"}/>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={"••••••••••••"}
                                            autoComplete={"current-password"}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground py-2 bg-white text-black hover:border-0 border-0"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4 text-black"/> :
                                                <Eye className="text-black h-4 w-4"/>}
                                        </span>
                                    </div>
                                </div>

                                <div onClick={() => navigate({to: "/auth/reset-password"})} className="flex items-center justify-between">
                                    <a href="#" className="text-sm text-primary">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button type={"submit"}
                                        className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-600 hover:to-orange-400 pr-[-1px]">
                                    {loading && <Loader2 className="animate-spin"/>}
                                    Sign In <ArrowRight className="w-4 h-4 ml-2"/>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}