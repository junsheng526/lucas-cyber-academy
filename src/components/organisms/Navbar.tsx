import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Text from "../atoms/text/Text";
import Logo from "../molecules/Logo";
import { Dialog, Transition } from "@headlessui/react";
import NavMobile from "./navbar/NavMobile";
import { Docs, firestoreService } from "../../services/firestoreService";
import { useUser } from "../../hooks/useUser";
import { signOut } from "@firebase/auth";
import { auth } from "../../config/firebase";
import { IconButton } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useGrayscale } from "../../hooks/useGrayscale";
import ButtonPrimary from "../molecules/button/ButtonPrimary";

const navItems = [
  { name: "Home", to: "/", key: "home" },
  { name: "Courses", to: "/courses", key: "courses" },
  { name: "About Us", to: "/about-us", key: "about-us" },
  { name: "Contact Us", to: "/contact-us", key: "contact-us" },
];

const Navbar: React.FC = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { grayscaleConfig } = useGrayscale();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const handleCloseMenu = () => setIsVisible(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const data = await firestoreService.fetchDocById(
          Docs.HOME_CONTENT,
          "CtFtz97Oedq4TQKFcCFm"
        );
        if (data?.logo) {
          setLogoUrl(data.logo);
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      }
    };

    fetchLogo();
    console.log("Current user -> " + JSON.stringify(userData));
  }, [userData]);

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
                  <NavMobile onClickClose={handleCloseMenu} logoUrl={logoUrl} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboard = () => {
    if (!userData?.role) {
      alert("Something wents wrong!");
      return;
    }
    const role = userData.role.toLowerCase();

    if (role === "student") {
      navigate("/student-dashboard");
    } else if (role === "lecturer") {
      navigate("/lecturer-dashboard");
    } else if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/not-found");
    }
  };

  const filteredMenuItems = navItems.filter(
    (item) => !grayscaleConfig[item.to.replace("/", "")]
  );

  return (
    <>
      <nav className="bg-light-800 py-2 px-5 md:p-4 md:px-12 nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg">
        <div className="container mx-auto flex justify-between items-center lg:px-28">
          <div className="flex items-center">
            <Logo className="w-24 self-center mr-4" img={logoUrl} />
            <ul className="hidden md:flex md:items-center md:space-x-6">
              {filteredMenuItems.map((item) => {
                const isHidden = grayscaleConfig[item.key];
                return (
                  !isHidden && (
                    <li key={item.to}>
                      <Link to={item.to}>
                        <Text
                          as="span"
                          className="block hover:bg-gray-200 hover:text-gray-900 text-gray-500 py-2 px-4 rounded-full items-center flex"
                        >
                          {item.name}
                        </Text>
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            {userData ? (
              <div className="flex items-center space-x-4">
                <IconButton onClick={handleDashboard}>
                  <WidgetsIcon />
                </IconButton>
                <IconButton onClick={handleLogout}>
                  <LogoutOutlined />
                </IconButton>
                <img
                  src={userData?.profileImage}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
              </div>
            ) : (
              <div className="hidden md:block">
                <ButtonPrimary
                  className="self-center"
                  onClick={() => navigate("/login")}
                >
                  Sign up
                </ButtonPrimary>
              </div>
            )}
          </div>
        </div>
      </nav>
      {renderContent()}
    </>
  );
};

export default Navbar;
