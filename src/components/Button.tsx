import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary"; // Button style
  children: React.ReactNode; // Content inside the button
  onClick: () => void; // Click handler
  fontSize?: "sm" | "md" | "lg" | "xl"; // Font size options
  fontWeight?: "normal" | "bold" | "semibold" | "light"; // Font weight options
  fontColor?: string; // Custom text color (hex, rgb, or color names)
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  fontSize = "md", // Default font size is medium
  fontWeight = "normal", // Default font weight is normal
  fontColor = "inherit", // Default font color is inherited
}) => {
  // Define base button styles
  const baseStyles = "py-2 px-4 rounded-full focus:outline-none focus:ring-2";

  // Define font size and weight styles
  const fontSizeStyles = {
    sm: "text-sm", // Small font size
    md: "text-base", // Medium font size
    lg: "text-lg", // Large font size
    xl: "text-xl", // Extra-large font size
  };

  const fontWeightStyles = {
    normal: "font-normal", // Normal font weight
    bold: "font-bold", // Bold font weight
    semibold: "font-semibold", // Semi-bold font weight
    light: "font-light", // Light font weight
  };

  // Define primary button styles
  const primaryStyles = "bg-primary text-white hover:bg-primary-dark";

  // Define secondary button styles
  const secondaryStyles =
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white";

  // Combine base styles with the variant-specific styles
  const buttonStyles =
    variant === "primary"
      ? `${baseStyles} ${primaryStyles}`
      : `${baseStyles} ${secondaryStyles}`;

  // Combine font size, weight, and color styles
  const textStyles = `${fontSizeStyles[fontSize]} ${fontWeightStyles[fontWeight]} text-${fontColor}`;

  return (
    <button className={`${buttonStyles} ${textStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
