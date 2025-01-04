import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const usePathname = () => window.location.pathname;

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({
  className = "p-2.5 rounded-lg text-neutral-700",
  iconClassName = "h-8 w-8",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Use pathname manually
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  const handleToggleMenu = () => setIsVisible(!isVisible);

  return (
    <>
      <button
        onClick={handleToggleMenu}
        className={`focus:outline-none flex items-center justify-center ${className}`}
      >
        <Bars3Icon className={iconClassName} />
      </button>

      {isVisible && (
        <div className="absolute top-0 right-0 bg-white p-5 w-64 shadow-lg z-50">
          {/* This can be your navigation content */}
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-sm text-neutral-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-neutral-900">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-neutral-900">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-neutral-900">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default MenuBar;
