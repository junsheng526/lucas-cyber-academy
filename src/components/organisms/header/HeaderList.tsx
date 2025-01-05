import { FC, ReactNode, useState } from "react";
import {
  ListBulletIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import Heading from "../../molecules/text/Heading";
import Input from "../../atoms/input/Input";

export interface HeaderListProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  totalItems: number;
  onClickTab?: (item: string) => void;
  onViewChange?: (view: "list" | "card") => void;
  onSearchChange?: (searchQuery: string) => void; // New prop for search
}

const HeaderList: FC<HeaderListProps> = ({
  subHeading = "",
  heading = "Latest Articles 🎈",
  totalItems = 0,
  onViewChange = () => {},
  onSearchChange = () => {},
}) => {
  const [activeView, setActiveView] = useState<"list" | "card">("card");

  const handleViewChange = (view: "list" | "card") => {
    setActiveView(view); // Update active view state
    onViewChange(view);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading} isCenter={false}>
        {heading}
      </Heading>

      {/* Total Items */}
      <div className="text-start text-sm text-gray-700">
        <span className="block my-2 md:my-3 font-normal text-base sm:text-lg text-neutral-500">
          Total {totalItems} courses
        </span>
      </div>

      <div className="flex items-center justify-between space-x-4">
        {/* Search Input */}
        <div className="flex-grow max-w-xs">
          <Input
            placeholder="Search courses..."
            onChange={handleSearchChange} // Pass the change event handler to input
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* View Options */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleViewChange("list")}
            className={`p-2 rounded-full border border-gray-300 ${
              activeView === "list"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`} // Apply bg-primary for active state
          >
            <ListBulletIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleViewChange("card")}
            className={`p-2 rounded-full border border-gray-300 hover:bg-gray-100 ${
              activeView === "card"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`} // Apply bg-primary for active state
          >
            <Square3Stack3DIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderList;
