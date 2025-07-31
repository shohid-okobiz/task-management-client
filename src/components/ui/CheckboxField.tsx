"use client";

import { CheckboxFieldProps } from '@/types/signupTypes';
import React from 'react';


const CheckboxField: React.FC<CheckboxFieldProps> = ({
    id,
    checked,
    onChange,
    error,
    children,
    disabled = false,
    className = ""
}) => {
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-start">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        mt-1 h-4 w-4 text-green-400 
                        focus:ring-green-400 border-gray-300 rounded
                        disabled:cursor-not-allowed disabled:opacity-50
                        ${error ? 'border-red-300' : ''}
                    `}
                    aria-describedby={error ? `${id}-error` : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                />
                <label
                    htmlFor={id}
                    className={`
                        ml-3 text-sm text-gray-600 cursor-pointer
                        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                >
                    {children}
                </label>
            </div>

            {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CheckboxField;