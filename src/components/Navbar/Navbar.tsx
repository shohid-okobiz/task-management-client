"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthServices } from "@/services/auth/auth.service";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { FaTasks, FaSpinner } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import imageSrc from "../../assets/Rectangle-bg.png";






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

  
    const handleLogout = async () => {
        try {
            await AuthServices.processLogout();
        } catch { }
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
        <div className="relative h-40 md:h-60 w-full overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `
        radial-gradient(ellipse at left, rgba(134, 239, 172, 0.8) 0%, transparent 50%),
        radial-gradient(ellipse at right, rgba(134, 239, 172, 0.8) 0%, transparent 50%),
        radial-gradient(ellipse at center, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.6) 40%, transparent 70%),
        url(${imageSrc.src})
      `,
                    backgroundSize: 'cover, cover, cover, cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center left, center right, center, center',
                }}
            />
            <nav className="relative text-white py-3 px-6">
                <div className="flex justify-between items-center pb-12">

                    <div className="flex items-center space-x-3 z-10">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                            <span className="text-lg">⏱️</span>
                        </div>
                        <span className="font-semibold text-lg">Tasko</span>
                    </div>


                    <div className="hidden md:flex items-center gap-6 z-10">
                        <Link
                            href="/user-dashboard"
                            className="flex items-center gap-1 text-green-400 hover:text-green-300"
                        >
                            <FaTasks className="text-base" />
                            <span className="font-medium">Task List</span>
                        </Link>

                        <Link href="/spin" className="flex items-center gap-1 hover:text-green-300">
                            <FaSpinner className="text-base animate-spin-slow" />
                            <span className="font-medium">Spin</span>
                        </Link>
                    </div>


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
                </div>


                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg text-green-400 mb-2">{userName}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                            Welcome to Dashboard
                        </h1>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;
