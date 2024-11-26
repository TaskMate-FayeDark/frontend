import {FormEvent, useState} from 'react';
import {Input} from "../../../components/ui/input.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {sendMail} from "../../../api/auth-api.ts";
import useMessage from "../../../hooks/useMessage";
import {Loader2} from "lucide-react";
import useLink from "../../../hooks/useLink.ts";

export const ResetPassword = () => {
    const {navigate} = useLink();
    const {openNotification, contextHolder} = useMessage();
    const [loading, setLoading] = useState(false);
    const handleSendMail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailPattern.test(email)) {
            openNotification("topRight", "Please enter a valid email");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            await sendMail(email);
            localStorage.setItem("email", email);
            await navigate({
                to: `/auth/verification-code`
            });
        } catch (error) {
            console.log(error);
            openNotification("topRight", "There was an error sending the email.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {contextHolder}
            <div className="lg:min-h-screen min-h-1/2 w-full flex">
                <div className="w-full p-8 flex items-center justify-center bg-white text-black">
                    <div className="w-full max-w-md space-y-8">
                        <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
                            <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                            <form onSubmit={handleSendMail}>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                    name="email"
                                />
                                <Button
                                    type="submit"
                                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    {loading && <Loader2 className="animate-spin"/>}
                                    {"Change Password"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}