import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Text from "../atoms/text/Text";
import { SunIcon } from "@heroicons/react/24/outline";
import Logo from "../molecules/Logo";
import { Dialog, Transition } from "@headlessui/react";
import NavMobile from "./navbar/NavMobile";
import ButtonPrimary from "../molecules/button/ButtonPrimary";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const getLinkClass = () => {
    return `block hover:bg-gray-200 hover:text-gray-900 text-gray-500 py-2 px-4 rounded-full items-center flex`;
  };

  const handleCloseMenu = () => setIsVisible(false);
  const navigate = useNavigate();

  const renderContent = () => {
    return (
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={handleCloseMenu}
        >
          {/* Overlay for background dimming */}
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog className="fixed inset-0 bg-black/60" onClose={() => {}} />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex justify-end min-h-full">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all">
                  {/* This is where the NavMobile content is rendered */}
                  <NavMobile onClickClose={handleCloseMenu} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      {" "}
      <nav className="bg-light-800 py-2 px-5 md:p-4 md:px-12 nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg">
        <div className="container mx-auto flex justify-between items-center lg:px-28">
          <div className="flex items-center">
            <Logo className="w-24 self-center mr-4" />
            {/* Desktop Menu */}
            <ul className="hidden md:flex md:items-center md:space-x-6">
              <li>
                <Link to="/">
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
            <div className="hidden md:block hover:bg-gray-200 hover:text-gray-900 text-gray-500 py-2 px-2 rounded-full items-center flex">
              <SunIcon className="w-7 h-7 text-gray-500" aria-hidden="true" />
            </div>
            <div className="hidden md:block hover:bg-gray-200 hover:text-gray-900 text-gray-500 py-2 px-3 rounded-full items-center flex">
              <i className="w-7 h-7 las la-search text-2xl text-gray-500"></i>
            </div>
            <div className="hidden md:block">
              <ButtonPrimary
                className="self-center"
                onClick={() => navigate("/login")}
              >
                Sign up
              </ButtonPrimary>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="block md:hidden" onClick={() => setIsVisible(true)}>
              <i className="fas fa-bars text-black"></i>
            </div>
          </div>
        </div>
      </nav>
      {renderContent()}
    </>
  );
};

export default Navbar;
