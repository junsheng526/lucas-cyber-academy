import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGO } from "../assets/assets";
import Button from "./Button";
import Text from "./Text";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = (path: string) => {
    return `block ${
      isActive(path)
        ? "bg-gray-200 py-2 px-4 rounded-full items-center flex"
        : ""
    }`;
  };

  const isActiveText = (path: string): string => {
    return isActive(path)
      ? "font-medium text-gray-900"
      : "font-normal text-gray-500";
  };

  return (
    <nav className="bg-light-800 p-4 px-12">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={LOGO} alt="Logo" className="h-10 w-20 mr-4" />
          <ul className="hidden md:flex md:items-center md:space-x-6">
            <li>
              <Link to="/home" className={getLinkClass("/home")}>
                <Text as="span" className={isActiveText("/home")}>
                  Home
                </Text>
              </Link>
            </li>
            <li>
              <Link to="/courses" className={getLinkClass("/courses")}>
                <Text as="span" className={isActiveText("/courses")}>
                  Courses
                </Text>
              </Link>
            </li>
            <li>
              <Link to="/blog" className={getLinkClass("/blog")}>
                <Text as="span" className={isActiveText("/blog")}>
                  Blog
                </Text>
              </Link>
            </li>
            <li>
              <Link to="/about" className={getLinkClass("/about")}>
                <Text as="span" className={isActiveText("/about")}>
                  About Us
                </Text>
              </Link>
            </li>
            <li>
              <Link to="/career" className={getLinkClass("/career")}>
                <Text as="span" className={isActiveText("/career")}>
                  Career
                </Text>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <i className="fas fa-sun text-black"></i>
          </div>
          <div className="hidden md:block">
            <i className="fas fa-search text-black"></i>
          </div>
          <div className="hidden md:block">
            <Button fontSize="sm" variant="primary" onClick={() => {}}>
              <Text as="span" className="font-medium text-sm">
                Sign In
              </Text>
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
            <Link
              to="/about"
              className={`block py-2 ${
                isActive("/about") ? "bg-gray-200" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`block py-2 ${
                isActive("/services") ? "bg-gray-200" : ""
              }`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`block py-2 ${
                isActive("/contact") ? "bg-gray-200" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
