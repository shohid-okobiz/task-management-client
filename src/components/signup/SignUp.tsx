"use client";

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthServices } from '@/services/auth/auth.service';
import IllustrationPanel from '@/components/ui/IllustrationPanel';
import SignUpForm from '@/components/auth/SignUpForm';
import { FormData } from '@/types/signupTypes';
import { useRouter } from 'next/navigation';


interface SignUpPageProps {
    onSubmit?: (data: FormData) => void | Promise<void>;
    loading?: boolean;
    className?: string;
}




const SignUpPage: React.FC<SignUpPageProps> = ({
    onSubmit,
    loading = false,
    className = ""
}) => {
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            return await AuthServices.processSignup({
                name: data.name ?? '',
                email: data.email ?? '',
                password: data.password ?? ''
            });
        }
    });

    return (
        <div className={`min-h-screen bg-gray-50 flex overflow-hidden ${className}`}>

            <IllustrationPanel />
            <div className="w-full lg:w-1/2 flex items-center justify-center p-3">
                <SignUpForm
                    onSubmit={async (data) => {
                        try {
                            const res = await mutation.mutateAsync(data);
                            console.log("res ==== ", res)
                            if (res?.status === "success") {
                                const email = res?.data?.email;
                                if (email) {
                                    console.log("email === ", email)
                                    router.push(`/email-verification?email=${encodeURIComponent(email)}`);

                                }
                            }
                            if (onSubmit) await onSubmit(data);
                        } catch (error) {
                            console.error("Sign up failed:", error);
                        }
                    }}
                    loading={loading || mutation.isPending}
                />
            </div>
        </div>
    );
};

export default SignUpPage;