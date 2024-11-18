import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Section */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-500 via-purple-400 to-orange-300 p-12 relative">
                <div className="w-full max-w-md mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8">Welcome back!</h1>
                    <div className="w-64 h-64 mx-auto">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl" />
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full" />
                            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/20 rounded-full" />
                            <div className="absolute top-1/2 right-0 w-4 h-4 bg-white/20 rounded-full transform translate-x-1/2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex justify-between items-center">
                        <button className="text-sm text-muted-foreground flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" /> Back
                        </button>
                        <div className="text-sm">
                            I have an account?{' '}
                            <a href="#" className="text-primary font-medium">
                                Sign Up
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold">Create your Account</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Social Login Buttons */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Button variant="outline" className="w-full">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Sign in with Facebook
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or sign in with login and password</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="email">
                                    Email address
                                </label>
                                <Input id="email" type="email" placeholder="Type here" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm text-primary">
                                    Forgot password?
                                </a>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-600 hover:to-orange-400">
                                Sign In <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Copyright © 2024
                    </div>
                </div>
            </div>
        </div>
    )
}