import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, SunIcon } from "@heroicons/react/24/solid";
import Logo from "../Logo";
import SocialsList from "../SocialsList";
import ButtonClose from "../button/ButtonClose";
import { NAVIGATION_DEMO, NavItemType } from "../../data/navigation";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="pl-6 pb-1 text-sm space-y-1">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              to={i.href || "#"}
              className="flex px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg py-2.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end items-center py-2.5"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure key={item.id} as="li" className="text-neutral-900">
        <Link
          to={item.href || "#"}
          className="flex w-full px-4 py-2.5 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 rounded-lg"
        >
          <span className={`pr-3 ${!item.children ? "block w-full" : ""}`}>
            {item.name}
          </span>
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 bg-white divide-y-2 divide-neutral-100">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them.
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl" />
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl">
              <SunIcon className="w-7 h-7" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavMobile;
