import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Text from "./Text";
import { SunIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import ButtonPrimary from "./button/ButtonPrimary";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = () => {
    return `block hover:bg-gray-200 hover:text-gray-900 text-gray-500 py-2 px-4 rounded-full items-center flex`;
  };

  return (
    <nav className="bg-light-800 p-4 px-12 nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg">
      <div className="container mx-auto flex justify-between items-center px-28">
        <div className="flex items-center">
          <Logo className="w-24 self-center mr-4" />
          <ul className="hidden md:flex md:items-center md:space-x-6">
            <li>
              <Link to="/home">
                <Text as="span" className={getLinkClass()}>
                  Home
                </Text>
              </Link>
            </li>
            <li>
              <Link to="/courses" className={getLinkClass()}>
                <Text as="span">Courses</Text>
              </Link>
            </li>
            <li>
              <Link to="/blog" className={getLinkClass()}>
                <Text as="span">Blog</Text>
              </Link>
            </li>
            <li>
              <Link to="/about" className={getLinkClass()}>
                <Text as="span">About Us</Text>
              </Link>
            </li>
            <li>
              <Link to="/career" className={getLinkClass()}>
                <Text as="span">Career</Text>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SunIcon className="w-7 h-7 text-gray-500" aria-hidden="true" />
          </div>
          <div className="hidden md:block">
            <i className="las la-search text-2xl text-gray-500"></i>
          </div>
          <div className="hidden md:block">
            <ButtonPrimary className="self-center">Sign up</ButtonPrimary>
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
