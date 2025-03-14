import { FC, useState } from "react";
import {
  ListBulletIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import Heading from "../../molecules/text/Heading";
import Input from "../../atoms/input/Input";

export interface HeaderListProps {
  tabActive: string;
  tabs?: string[];
  heading: string;
  subHeading?: string;
  totalItems: number;
  onViewChange?: (view: "list" | "card") => void;
  onSearchChange?: (searchQuery: string) => void;
}

const HeaderList: FC<HeaderListProps> = ({
  subHeading,
  heading,
  totalItems,
  onViewChange,
  onSearchChange,
}) => {
  const [activeView, setActiveView] = useState<"list" | "card">("card");

  const handleViewChange = (view: "list" | "card") => {
    setActiveView(view);
    onViewChange?.(view);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading}>{heading}</Heading>

      <div className="text-start text-sm text-gray-700">
        <span className="block my-2 md:my-3 font-normal text-base sm:text-lg text-neutral-500">
          Total {totalItems} courses
        </span>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <div className="flex-grow max-w-xs">
          <Input
            placeholder="Search courses..."
            onChange={handleSearchChange} // Pass the change event handler to input
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleViewChange("list")}
            className={`p-2 rounded-full border ${
              activeView === "list" ? "bg-primary text-white" : "text-gray-700"
            }`}
          >
            <ListBulletIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleViewChange("card")}
            className={`p-2 rounded-full border ${
              activeView === "card" ? "bg-primary text-white" : "text-gray-700"
            }`}
          >
            <Square3Stack3DIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderList;
