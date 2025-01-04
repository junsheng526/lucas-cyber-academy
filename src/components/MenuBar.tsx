import React, { useState, useEffect, Fragment } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import NavMobile from "./navbar/NavMobile";

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

  // const handleToggleMenu = () => setIsVisible(!isVisible);
  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

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
      <button
        onClick={handleOpenMenu}
        className={`focus:outline-none flex items-center justify-center ${className}`}
      >
        <Bars3Icon className={iconClassName} />
      </button>

      {renderContent()}
    </>
  );
};

export default MenuBar;
