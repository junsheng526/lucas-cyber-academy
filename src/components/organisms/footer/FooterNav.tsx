import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import isInViewport from "../../../utils/isInViewport";
import MenuBar from "../MenuBar";
import { useUser } from "../../../hooks/useUser";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { signOut } from "@firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: string;
  icon: any;
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const { userData } = useUser();

  useEffect(() => {
    const navItems: NavItem[] = [
      {
        name: "Home",
        link: "/",
        icon: HomeIcon,
      },
      {
        name: "Courses",
        link: "/courses",
        icon: MagnifyingGlassIcon,
      },
      {
        name: "Contact Us",
        link: "/contact-us",
        icon: EnvelopeIcon,
      },
      {
        name: userData ? "Profile" : "Log in",
        link: userData ? "/edit-profile" : "/login",
        icon: userData?.profileImage || UserCircleIcon,
      },
    ];

    setNavItems(navItems);
  }, [userData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideFooterNav);
    }
  };

  const showHideFooterNav = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }
      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    window.location.href = path;
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = currentPath === item.link;

    const IconComponent =
      typeof item.icon === "string" ? (
        <img
          src={item.icon}
          alt="User Avatar"
          className="w-6 h-6 rounded-full border"
        />
      ) : (
        <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
      );

    return item.link ? (
      <button
        key={index}
        onClick={() => handleNavigation(item.link || "#")}
        className={`flex flex-col items-center justify-between text-neutral-500 ${
          isActive ? "text-neutral-900" : ""
        }`}
      >
        {IconComponent}
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? "text-red-600" : ""
          }`}
        >
          {item.name}
        </span>
      </button>
    ) : (
      <div
        key={index}
        className="flex flex-col items-center justify-between text-neutral-500"
      >
        <item.icon className="w-6 h-6" />
        <span className="text-[11px] leading-none mt-1">{item.name}</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden p-2 bg-white fixed bottom-0 inset-x-0 z-30 border-t border-neutral-300
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center">
        {navItems.map(renderItem)}
      </div>
    </div>
  );
};

export default FooterNav;
