"use client";

import React from 'react';
import { User, Mail, Lock } from 'lucide-react';

interface IllustrationPanelProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

const IllustrationPanel: React.FC<IllustrationPanelProps> = ({
    title = "Join Our Community",
    subtitle = "Create your account and get started",
    className = ""
}) => {
    return (
        <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${className}`}>
            <div
                className="w-full h-full relative"
                style={{
                    background: 'linear-gradient(135deg, #23272f 0%, #1a1f27 100%)'
                }}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Person 1 */}
                    <div className="absolute top-20 left-16 animate-bounce">
                        <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Person 2 */}
                    <div className="absolute top-40 right-20 animate-pulse">
                        <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Person 3 */}
                    <div className="absolute bottom-32 left-24 animate-bounce" style={{ animationDelay: '1s' }}>
                        <div className="w-18 h-18 bg-purple-400 rounded-full flex items-center justify-center p-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                            <div className="flex space-x-1">
                                <div className="w-2 h-6 bg-green-400 rounded animate-pulse"></div>
                                <div className="w-2 h-8 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-4 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                <div className="w-2 h-7 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Additional floating elements */}
                    <div className="absolute bottom-20 right-16">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
                            <div className="w-8 h-8 bg-blue-400 rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>

                {/* Central Illustration Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">{title}</h2>
                        <p className="text-xl opacity-80">{subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IllustrationPanel;