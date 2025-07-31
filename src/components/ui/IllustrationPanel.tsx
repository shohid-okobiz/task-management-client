'use client';

import React from 'react';
import Lottie from 'lottie-react';
import joinAnimation from '@/animation/signuplottie.json'


interface IllustrationPanelProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

const IllustrationPanel: React.FC<IllustrationPanelProps> = ({
    title = 'Join Our Community',
    subtitle = 'Create your account and get started',
    className = '',
}) => {
    return (
        <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${className}`}>
            <div
                className="w-full h-full relative"
                style={{
                    background: 'linear-gradient(135deg, #23272f 0%, #1a1f27 100%)',
                }}
            >
                {/* Lottie Animation */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <Lottie animationData={joinAnimation} loop autoplay />
                </div>
                {/* Central Illustration Text */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
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
