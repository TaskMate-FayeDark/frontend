import { Link } from "@tanstack/react-router";
import { Button } from "../../../components/ui/button.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { signupApi } from "../../../api/auth-api.ts";
import { FormEvent, useState } from "react";
import { Credentials } from "../../../api/auth-api.ts";
import { AxiosError } from "axios";
import { IError } from "../../../types/error.ts";
import useMessage from "../../../hooks/useMessage";
import useLink from "../../../hooks/useLink.ts";

export const Signup = () => {
    const { navigate } = useLink();
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = useMessage();
    const [showPassword, setShowPassword] = useState(false);
    const validateName = (name: string): string | null => {
        if (/\s/.test(name)) {
            return "The name cannot contain spaces.";
        }
        if (/[^a-zA-Z0-9]/.test(name)) {
            return "Name cannot contain special characters.";
        }
        const vietnameseChars =
            /[àáạảãâầấậẩẫăằắặẳẵđèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũôộổỗợủĩồộỗợç]/;
        if (vietnameseChars.test(name)) {
            return "Name cannot contain accents.";
        }
        return null;
    };
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        const dataSignup: Credentials = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        setLoading(true);
        const nameError = validateName(dataSignup.name ? dataSignup.name : "");
        if (nameError) {
            openNotification("topRight", nameError);
            setLoading(false);
            return;
        }
        if (!dataSignup.name || !dataSignup.email || !dataSignup.password) {
            openNotification("topRight", "Please enter full valid");
            setLoading(false);
        } else {
            await signupApi(dataSignup)
                .then((response) => {
                    setLoading(false);
                    openNotification("topRight", response.message);
                    navigate({
                        to: "/auth/login",
                    });
                })
                .catch((error: AxiosError) => {
                    if (error instanceof AxiosError && error.response) {
                        const dataError = error.response.data as IError;
                        if (dataError && dataError.message) {
                            openNotification("topRight", dataError.message);
                        }
                    } else {
                        openNotification(
                            "topRight",
                            "An unexpected error occurred."
                        );
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    return (
        <>
            {contextHolder}
            <div className="lg:min-h-screen min-h-1/2 w-full flex">
                {/* Right Section */}
                <div className="w-full p-8 flex items-center justify-center bg-white text-black">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex justify-between items-center text-white">
                            <div className="text-sm text-black">
                                I have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="text-primary font-medium"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Create your account
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Login Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 text-start"
                            >
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="name"
                                    >
                                        Username
                                    </label>
                                    <Input
                                        autoComplete={"name"}
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>
                                    <Input
                                        autoComplete={"email"}
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="••••••••••••"
                                            autoComplete={"current-password"}
                                        />
                                        <span
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground py-2 bg-white text-black hover:border-0 border-0"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-black" />
                                            ) : (
                                                <Eye className="text-black h-4 w-4" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type={"submit"}
                                    className="w-full bg-gradient-to-r from-purple-500 to-orange-300 hover:from-purple-600 hover:to-orange-400 pr-[-1px]"
                                >
                                    {loading && (
                                        <Loader2 className="animate-spin" />
                                    )}
                                    Sign Up{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
