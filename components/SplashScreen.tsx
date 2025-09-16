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
        src="https://assets.codepen.io/3/tominaga-tategu-logo-black.svg"
        alt="富永建具 ロゴ"
        className="w-48 md:w-64"
      />
    </div>
  );
};

export default SplashScreen;