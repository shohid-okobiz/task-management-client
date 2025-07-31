"use client";

import React from 'react';
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
    return (
        <div className={`min-h-screen bg-gray-50 flex ${className}`}>
            <IllustrationPanel
                title="Stay Organized, Stay Ahead"
                subtitle="Manage your tasks efficiently and boost productivity with our smart tools."
            />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <SignUpForm
                    onSubmit={onSubmit}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default SignUpPage;