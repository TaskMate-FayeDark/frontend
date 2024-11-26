import * as React from "react"
import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx"
import {resetPassword, sendMail} from "../../../api/auth-api.ts";
import useMessage from "../../../hooks/useMessage.tsx";
import {Loader2} from "lucide-react";

interface VerificationCodeProps {
    onComplete?: (code: string) => void
    length?: number
}

export default function VerificationPage({onComplete, length = 5}: VerificationCodeProps) {
    const {openNotification, contextHolder} = useMessage()
    const [code, setCode] = React.useState<string[]>(Array(length).fill(""))
    const [newPassword, setNewPassword] = React.useState<string>("")
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loading2, setLoading2] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value

        setCode(newCode)

        if (value !== "" && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

        if (newCode.every(digit => digit !== "") && onComplete) {
            onComplete(newCode.join(""))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleResetPassword = async () => {
        setLoading(true);
        const result: number = Number(code.join(""));
        onComplete?.(code.join(""));
        const email = localStorage.getItem("email") as string;
        const credentials = {email, code: result, newPassword};
        if (!credentials.newPassword || !credentials.newPassword) {
            openNotification("topRight", "Missing information!");
            setLoading(false);
        } else if (!credentials.email) {
            openNotification("topRight", "Missing information!");
            setLoading(false);
        } else {
            await resetPassword(credentials)
                .then((result) => {
                    openNotification("topRight", result.message);
                    localStorage.removeItem("email");
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").slice(0, length)

        if (!/^\d*$/.test(pastedData)) return

        const newCode = [...code]
        pastedData.split("").forEach((char, index) => {
            if (index < length) {
                newCode[index] = char
            }
        })
        setCode(newCode)
        if (pastedData.length >= length) {
            inputRefs.current[length - 1]?.focus()
        } else {
            inputRefs.current[pastedData.length]?.focus()
        }
    }

    const handleResend = async () => {
        setCode(Array(length).fill(""))
        const email = localStorage.getItem("email") as string;
        setLoading2(true);
        try {
            const res = await sendMail(email);
            openNotification("topRight", res.message);
            localStorage.setItem("email", email);
        } catch (error) {
            console.log(error);
            openNotification("topRight", "There was an error sending the email.");
        }
        finally {
            setLoading2(false);
        }
    }

    return (
        <>
            {contextHolder}
            {success ? <div>Change password successfully</div> : <div className="flex flex-col items-center gap-4">
                <h2 className={"font-medium text-2xl"}>Create new password</h2>
                <div className={"font-medium"}>Check your email for confirmation code!</div>
                <div className="flex gap-2">
                    {code.map((digit, index) => (
                        <Input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(index, e.target.value)}
                            onKeyDown={e => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Digit ${index + 1}`}
                        />
                    ))}
                </div>
                <div className={"w-full flex items-start flex-col mt-2.5"}>
                    <label className={"font-medium mb-2"} htmlFor={"newPassword"}>New password</label>
                    <Input value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           type={"text"}
                           name={"newPassword"}
                           placeholder="Enter new password"
                           required
                    />
                </div>
                <Button
                    className="w-full max-w-[200px]"
                    onClick={handleResetPassword}
                    disabled={!code.every(digit => digit !== "")}
                >
                    {loading && <Loader2 className="animate-spin"/>}
                    SUBMIT
                </Button>
                <Button
                    variant={"outline"}
                    onClick={handleResend}
                    className="text-blue-500 text-sm hover:underline"
                >
                    {loading2 && <Loader2 className="animate-spin"/>}
                    Resend code
                </Button>
            </div>}
        </>
    )
}

