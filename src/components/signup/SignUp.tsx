"use client";

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthServices } from '@/services/auth/auth.service';
import IllustrationPanel from '@/components/ui/IllustrationPanel';
import SignUpForm from '@/components/auth/SignUpForm';
import { FormData } from '@/types/signupTypes';


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
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            return await AuthServices.processSignup({
                name: data.name ?? '',
                email: data.email ?? '',
                password: data.password ?? ''
            });
        }
    });

    const handleSignUp = async (data: FormData) => {
        try {
            await mutation.mutateAsync(data);
            if (onSubmit) {
                await onSubmit(data);
            }
        } catch (error) {
            console.error("Sign up failed:", error);
            
        }
    };

    return (
        <div className={`min-h-screen bg-gray-50 flex ${className}`}>
            <IllustrationPanel />
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <SignUpForm
                    onSubmit={handleSignUp}
                    loading={loading || mutation.isPending}
                />
            </div>
        </div>
    );
};

export default SignUpPage;