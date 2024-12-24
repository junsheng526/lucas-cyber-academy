import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick: () => void;
  fontSize?: "sm" | "md" | "lg" | "xl";
  fontWeight?: "normal" | "bold" | "semibold" | "light";
  fontColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  fontSize = "md",
  fontWeight = "normal",
  fontColor = "inherit",
  className = "",
}) => {
  const baseStyles = "py-2 px-4 rounded-full focus:outline-none focus:ring-2";

  const fontSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const fontWeightStyles = {
    normal: "font-normal",
    bold: "font-bold",
    semibold: "font-semibold",
    light: "font-light",
  };

  const primaryStyles = "bg-primary text-white hover:bg-primary-dark";

  const secondaryStyles =
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white";

  const buttonStyles =
    variant === "primary"
      ? `${baseStyles} ${primaryStyles} ${className}`
      : `${baseStyles} ${secondaryStyles} ${className}`;

  const textStyles = `${fontSizeStyles[fontSize]} ${fontWeightStyles[fontWeight]} text-${fontColor}`;

  return (
    <button className={`${buttonStyles} ${textStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
