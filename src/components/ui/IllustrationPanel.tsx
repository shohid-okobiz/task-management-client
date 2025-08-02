'use client';
import React from 'react';

import signupbgImg from '../../assets/Rectangle-bg.png';
import illustrationImg from "../../assets/Group.svg"

interface IllustrationPanelProps {
  className?: string;
}

const IllustrationPanel: React.FC<IllustrationPanelProps> = ({
  className = '',
}) => {
  return (
    <div className={`hidden lg:flex lg:w-1/2  overflow-hidden ${className}`}>
      <div
        className="w-full h-full flex justify-center"
        style={{
          backgroundImage: `
      radial-gradient(circle at top left, #56cd9bff -20%, transparent 20%),
      radial-gradient(circle at bottom right, #488a6eff -10%, transparent 40%),
      url(${signupbgImg.src})
    `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        <div className=" pointer-events-none flex items-center justify-center">
          <img
            src={illustrationImg.src}
            alt="Illustration"
            className="max-w-[80%] max-h-[60%] object-contain opacity-30"
          />
        </div>
      </div>
    </div>
  );
};

export default IllustrationPanel;
