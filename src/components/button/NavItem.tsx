"use client";

import React, { FC, ReactNode } from "react";

export interface NavItemProps {
  className?: string;
  radius?: string;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  children?: ReactNode;
}

const NavItem: FC<NavItemProps> = ({
  className = "px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize",
  radius = "rounded-full",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
}) => {
  function twFocusClass() {
    throw new Error("Function not implemented.");
  }

  return (
    <li className="nc-NavItem relative list-none" data-nc-id="NavItem">
      {renderX && renderX}
      <button
        className={`block !leading-none font-medium whitespace-nowrap ${className} ${radius} ${
          isActive
            ? "bg-neutral-900 text-white"
            : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
        }`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {children}
      </button>
    </li>
  );
};

export default NavItem;
