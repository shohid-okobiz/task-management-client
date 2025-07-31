"use client";

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputFieldProps } from '@/types/signupTypes';


const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    showPasswordToggle = false,
    onTogglePassword,
    showPassword = false,
    required = false,
    disabled = false,
    className = ""
}) => {
    const inputType = type === 'password' && showPasswordToggle
        ? (showPassword ? 'text' : 'password')
        : type;

    return (
        <div className={`w-full ${className}`}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 border rounded-lg 
                        focus:ring-2 focus:border-transparent 
                        transition-all duration-200
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        ${error
                            ? 'border-red-300 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-green-400'
                        }
                        ${Icon || showPasswordToggle ? 'pr-12' : ''}
                    `}
                    placeholder={placeholder}
                    aria-describedby={error ? `${id}-error` : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                />

                <div className="absolute right-3 top-3.5">
                    {showPasswordToggle && onTogglePassword ? (
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    ) : (
                        Icon && <Icon className="h-5 w-5 text-gray-400" />
                    )}
                </div>
            </div>

            {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;