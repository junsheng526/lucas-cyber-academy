import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGO } from "../assets/assets";
import Button from "./Button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-light-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={LOGO} alt="Logo" className="h-10 w-20 mr-4" />
          <ul className="hidden md:flex md:items-center md:space-x-6">
            <li>
              <Link to="/about" className="text-black block py-2 md:py-0">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-black block py-2 md:py-0">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-black block py-2 md:py-0">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <i className="fas fa-search text-black"></i>
          </div>
          <div className="hidden md:block">
            <i className="fas fa-user text-black"></i>
          </div>
          <div className="hidden md:block">
            <i className="fas fa-shopping-cart text-black"></i>
          </div>
          <div className="hidden md:block">
            <Button fontSize="sm" variant="primary" onClick={() => {}}>
              Primary Button
            </Button>
          </div>

          <div className="block md:hidden" onClick={toggleMenu}>
            <i
              className={
                isOpen ? "fas fa-times text-black" : "fas fa-bars text-black"
              }
            ></i>
          </div>
        </div>
        <ul className={`md:hidden ${isOpen ? "block" : "hidden"} w-full mt-4`}>
          <li>
            <Link to="/about" className="text-black block py-2">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-black block py-2">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-black block py-2">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
