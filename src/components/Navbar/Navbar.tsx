"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTasks, FaSpinner } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";


interface NavbarProps {
    userName: string | null;
    // avatarUrl?: string;
    // onLogout: () => void;
}

const Navbar = ({
    userName,
    //   avatarUrl,
    //    onLogout
}: NavbarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                        {!userName ? (
                            <button
                                // onClick={onLogout}
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
