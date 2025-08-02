"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthServices } from "@/services/auth/auth.service";
import {jwtDecode }from "jwt-decode";
import Link from "next/link";
import { FaTasks, FaSpinner } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";



interface DecodedToken {
    name?: string;
    email?: string;
    [key: string]: any;
}

interface NavbarProps {
    userName?: string | null;
}

const Navbar = ({ userName: userNameProp }: NavbarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(userNameProp || null);
    const router = useRouter();

    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken") || (typeof document !== 'undefined' ? (document.cookie.match(/accessToken=([^;]+)/)?.[1] || null) : null);
            if (token) {
                try {
                    const decoded: DecodedToken = jwtDecode(token);
                    setUserName(decoded.name || decoded.email || "User");
                } catch {
                    setUserName("User");
                }
            } else {
                setUserName(null);
            }
        }
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await AuthServices.processLogout();
        } catch {}
        if (typeof window !== "undefined") {
            document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "isVerified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            localStorage.removeItem("accessToken");
        }
        setUserName(null);
        router.push("/login");
    };

    return (
        <nav className="relative bg-gradient-to-r from-[#1b5742] to-[#0c0f17] text-white py-3 px-6 flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center space-x-6 z-10">
                {/* Logo */}
                <div className="flex items-center space-x-2 font-semibold text-lg">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">⏱️</span>
                    </div>
                    <span>Tasko</span>
                </div>

                <Link href="/task-list" className="flex items-center gap-1 text-green-400 hover:text-green-300">
                    <FaTasks className="text-base" />
                    <span className="font-medium">Task List</span>
                </Link>

                <Link href="/spin" className="flex items-center gap-1 hover:text-green-300">
                    <FaSpinner className="text-base animate-spin-slow" />
                    <span className="font-medium">Spin</span>
                </Link>
            </div>

            {/* Right Side */}
            <div className="relative z-10">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2">
                    <img
                        src={""}
                        alt="User"
                        className="w-8 h-8 rounded-full border border-white"
                    />
                    <span className="text-sm font-medium">{userName || 'Guest'}</span>
                    <HiOutlineChevronDown className="text-sm" />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                        {userName ? (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                                    Login
                                </Link>
                                <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>


        </nav>
    );
};

export default Navbar;
