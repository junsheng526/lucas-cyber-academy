import React from "react";
import { LOGO } from "../../assets/assets";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ img = LOGO, className = "w-24" }) => {
  return (
    <a
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {/* Default Logo */}
      <img className={`block max-h-12`} src={img} alt="Logo" />
    </a>
  );
};

export default Logo;
