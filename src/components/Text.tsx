import React from "react";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, as = "p", className = "" }) => {
  const Component = as;

  return (
    <Component className={`font-poppins ${className}`}>{children}</Component>
  );
};

export default Text;
