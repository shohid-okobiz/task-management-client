"use client"
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { message } from "antd";
import { AuthServices } from "@/services/auth/auth.service";
import IllustrationPanel from "../ui/IllustrationPanel";
import OtpInput from "../Otpinput";

const EmailVerification: React.FC = () => {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const email = searchParams?.get("email") || "";

    const { mutate, isPending } = useMutation({
        mutationFn: AuthServices.processVerifyEmailOtp,
        onSuccess: async (data) => {
            messageApi.success("Verification successful!");
            // Set accessToken in cookies
            if (typeof window !== 'undefined' && data?.accessToken) {
                document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;
            }
            await router.push("/user-dashboard")
        },
        onError: () => {
            messageApi.error("Verification failed or OTP incorrect");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ email, otp });
    };

    return (
        <div className={`min-h-screen bg-gray-50 flex overflow-hidden`}>
            {contextHolder}
            <IllustrationPanel />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
                    <p className="mb-6 text-center text-gray-600">
                        We sent an OTP to <span className="font-semibold">{email}</span>
                    </p>
                    <OtpInput length={6} onChange={setOtp} />
                    <Button type="submit" className="w-full" disabled={otp.length !== 6 || isPending}>
                        {isPending ? "Verifying..." : "Verify"}
                    </Button>
                </form>

            </div>
        </div>

    );
};

export default EmailVerification;
