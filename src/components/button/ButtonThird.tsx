import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonThirdProps extends ButtonProps {}

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = "text-neutral-700 border border-neutral-200",
  ...args
}) => {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />;
};

export default ButtonThird;
