"use client";

import React from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from '@/components/ui/InputField';
import CheckboxField from '@/components/ui/CheckboxField';
import Button from '@/components/ui/Button';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { FormData } from '@/types/signupTypes';


interface SignUpFormProps {
    onSubmit?: (data: FormData) => void | Promise<void>;
    loading?: boolean;
    className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
    onSubmit,
    loading = false,
    className = ""
}) => {
    const {
        formData,
        showPassword,
        showConfirmPassword,
        agreeTerms,
        errors,
        isSubmitting,
        handleInputChange,
        handleCheckboxChange,
        handleSubmit,
        togglePasswordVisibility
    } = useSignUpForm({ onSubmit });

    const isButtonDisabled = loading || isSubmitting || !agreeTerms;

    return (
        <div className={`w-full max-w-md ${className}`}>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
                <p className="text-gray-600">Create your account to get started</p>
            </div>

            <div className="space-y-6">
                <InputField
                    id="fullName"
                    name="fullName"
                    type="text"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    icon={User}
                    required
                />

                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    icon={Mail}
                    required
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    showPasswordToggle
                    onTogglePassword={() => togglePasswordVisibility('password')}
                    showPassword={showPassword}
                    required
                />

                <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    showPasswordToggle
                    onTogglePassword={() => togglePasswordVisibility('confirmPassword')}
                    showPassword={showConfirmPassword}
                    required
                />

                <CheckboxField
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={handleCheckboxChange}
                    error={errors.terms}
                >
                    I agree to the{' '}
                    <a
                        href="/terms"
                        className="text-green-500 hover:text-green-600 font-medium focus:outline-none focus:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        className="text-green-500 hover:text-green-600 font-medium focus:outline-none focus:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                </CheckboxField>

                <Button
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    loading={isSubmitting || loading}
                    icon={ArrowRight}
                    className="w-full"
                >
                    Create Account
                </Button>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-green-500 hover:text-green-600 font-medium focus:outline-none focus:underline"
                        >
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;