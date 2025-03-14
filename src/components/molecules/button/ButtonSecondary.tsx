"use client";

import Button, { ButtonProps } from "../../atoms/button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
