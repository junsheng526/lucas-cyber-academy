import { FC, useEffect, useState, ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Heading from "../../molecules/text/Heading";
import NavItem from "../../molecules/button/NavItem";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab?: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  subHeading = "",
  heading = "Latest Articles 🎈",
  onClickTab = () => {},
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item: string) => {
    onClickTab(item);
    setTabActiveState(item);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading} isCenter={false}>
        {heading}
      </Heading>

      {/* Tabs and View All Button */}
      <div className="flex items-center justify-between">
        {/* Tabs Navigation */}
        <nav className="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar space-x-2">
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              onClick={() => handleClickTab(item)}
              className={`px-8 py-4 rounded-3xl ${
                tabActiveState === item
                  ? "bg-gray-900 text-white"
                  : "text-gray-700"
              }`}
              isActive={tabActiveState === item}
            >
              {item}
            </NavItem>
          ))}
        </nav>

        {/* View All Button */}
        <div className="hidden sm:block flex-shrink-0">
          <a
            href="/listing-stay"
            className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            <span>View all</span>
            <ArrowRightIcon className="w-5 h-5 ml-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderFilter;
