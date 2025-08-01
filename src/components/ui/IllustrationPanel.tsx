'use client';
import React from 'react';
import Lottie from 'lottie-react';
import joinAnimation from '@/animation/signuplottie.json';
import signupbgImg from '../../assets/Rectangle-bg.png';  

interface IllustrationPanelProps {
  className?: string;
}

const IllustrationPanel: React.FC<IllustrationPanelProps> = ({
  className = '',
}) => {
  return (
    <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${className}`}>
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${signupbgImg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Lottie animationData={joinAnimation} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default IllustrationPanel;
