import React from 'react';

interface SplashScreenProps {
  show: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ show }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-base transition-opacity duration-500 ease-in-out ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!show}
    >
      <img
        src="https://drive.google.com/uc?export=view&id=1BW3ozZ-qQdl7yGncQG9z8-sBx08olhaO"
        alt="富永建具 ロゴ"
        className="w-48 md:w-64"
      />
    </div>
  );
};

export default SplashScreen;