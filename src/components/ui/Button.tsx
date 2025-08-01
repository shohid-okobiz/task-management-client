"use client";

import { ButtonProps } from '@/types/signupTypes';
import React from 'react';


const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = "",
    icon: Icon,
    iconPosition = 'right'
}) => {
    const baseStyles = "font-medium rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group";

    const variantStyles = {
        primary: "bg-green-400 text-white hover:bg-green-500 focus:ring-green-400 disabled:bg-gray-300 disabled:text-gray-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg"
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
        >
            {loading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
                    Processing...
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon className="mr-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    )}
                    {children}
                    {Icon && iconPosition === 'right' && (
                        <Icon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    )}
                </>
            )}
        </button>
    );
};

export default Button;