import { FC, useEffect, useState, ReactNode } from "react";
import {
  ListBulletIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline"; // Importing two icons for list view and card view
import Heading from "./text/Heading";
import NavItem from "./button/NavItem";

export interface HeaderListProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  totalItems: number; // New prop to display the total number of items
  onClickTab?: (item: string) => void;
  onViewChange?: (view: "list" | "card") => void; // Callback for changing view
}

const HeaderList: FC<HeaderListProps> = ({
  tabActive,
  tabs,
  subHeading = "",
  heading = "Latest Articles 🎈",
  totalItems = 0, // Default to 0 if no totalItems is provided
  onClickTab = () => {},
  onViewChange = () => {},
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item: string) => {
    onClickTab(item);
    setTabActiveState(item);
  };

  const handleViewChange = (view: "list" | "card") => {
    onViewChange(view);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading} isCenter={false}>
        {heading}
      </Heading>

      {/* Tabs and Total Items */}
      <div className="flex items-center justify-between">
        {/* Left side: Total Items */}
        <div className="text-sm text-gray-700">
          <span className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500">
            Total {totalItems} courses
          </span>
        </div>

        {/* Right side: View Options */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleViewChange("list")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <ListBulletIcon className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => handleViewChange("card")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Square3Stack3DIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderList;
