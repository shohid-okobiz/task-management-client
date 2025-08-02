
"use client"
import React, { useRef, useState } from "react";

interface OtpInputProps {
    length?: number;
    onChange: (otp: string) => void;
    disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange, disabled = false }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otpValues];
        newOtp[index] = value.slice(-1);

        setOtpValues(newOtp);
        onChange(newOtp.join(""));


        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").slice(0, length);
        if (!/^\d+$/.test(paste)) return;

        const newOtp = paste.split("").slice(0, length);
        setOtpValues(newOtp);
        onChange(newOtp.join(""));

        // Focus the last filled input
        const nextIndex = newOtp.length === length ? length - 1 : newOtp.length;
        inputsRef.current[nextIndex]?.focus();
    };

    return (
        <div className="flex justify-center gap-2">
            {otpValues.map((digit, index) => (
                <input
                    key={index}
                    ref={(el: any) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={`w-12 h-12 border text-xl text-center rounded-md outline-none transition 
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                />
            ))}
        </div>
    );
};

export default OtpInput;
