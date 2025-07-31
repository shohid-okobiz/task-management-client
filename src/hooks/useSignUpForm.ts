"use client";

import { FormErrors } from '@/types/signupTypes';
import { useState, useCallback } from 'react';


interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UseSignUpFormProps {
    onSubmit?: (data: SignUpFormData) => void | Promise<void>;
}

export const useSignUpForm = ({ onSubmit }: UseSignUpFormProps = {}) => {
    const [formData, setFormData] = useState<SignUpFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        // Full name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!agreeTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, agreeTerms]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }, [errors]);

    const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTerms(e.target.checked);
        if (errors.terms) {
            setErrors(prev => ({
                ...prev,
                terms: undefined
            }));
        }
    }, [errors.terms]);

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (onSubmit) {
                await onSubmit(formData);
            }


            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setAgreeTerms(false);
            setErrors({});

        } catch (error) {
            console.error('Sign up error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, onSubmit]);

    const togglePasswordVisibility = useCallback((field: 'password' | 'confirmPassword') => {
        if (field === 'password') {
            setShowPassword(prev => !prev);
        } else {
            setShowConfirmPassword(prev => !prev);
        }
    }, []);

    return {
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
    };
};
