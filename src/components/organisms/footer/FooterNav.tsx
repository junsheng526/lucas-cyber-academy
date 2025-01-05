import { useEffect, useRef, useState } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import isInViewport from "../../../utils/isInViewport";
import MenuBar from "../MenuBar";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: string;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "Explore",
    link: "/",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Wishlists",
    link: "/account-savelists",
    icon: HeartIcon,
  },
  {
    name: "Log in",
    link: "/account",
    icon: UserCircleIcon,
  },
  {
    name: "Menu",
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
    window.location.href = path; // Simulate navigation
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = currentPath === item.link;

    return item.link ? (
      <button
        key={index}
        onClick={() => handleNavigation(item.link || "#")}
        className={`flex flex-col items-center justify-between text-neutral-500 ${
          isActive ? "text-neutral-900" : ""
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? "text-red-600" : ""}`} />
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
        {NAV.map(renderItem)}
      </div>
    </div>
  );
};

export default FooterNav;
