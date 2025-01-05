import React from "react";
import Button, { ButtonProps } from "../../atoms/button/Button";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`bg-primary hover:bg-blue-700 text-white disabled:bg-blue-400 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
