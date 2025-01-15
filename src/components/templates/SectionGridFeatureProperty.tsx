import { FC, useState } from "react";
import { StayDataType } from "../../data/types";
import HeaderFilter from "../organisms/header/HeaderFilter";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import PropertyCardH from "../organisms/card/PropertyCardH";
import Pagination from "../molecules/button/Pagination";
import HeaderList from "../organisms/header/HeaderList";
import StayCard2 from "../organisms/card/StayCard2";
import ButtonPrimary from "../molecules/button/ButtonPrimary";
import { Course } from "../../data/model";

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

export interface SectionGridFeaturePropertyProps {
  courseListings?: Course[];
  gridClass?: string;
  heading?: string;
  subHeading?: string;
  headingIsCenter?: boolean;
  tabs?: string[];
  pagination?: boolean;
  itemsPerPage?: number; // Number of items per page
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  courseListings = [],
  gridClass = "",
  heading = "Featured Courses",
  subHeading = "Popular courses we recommend for you",
  headingIsCenter,
  tabs = ["Development", "Design", "Marketing", "Photography"],
  pagination = false,
  itemsPerPage = 8, // Default items per page
}) => {
  const [view, setView] = useState<"list" | "card">("card");
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  const totalItems = courseListings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get the items for the current page
  const currentItems = courseListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCard = (course: Course) => {
    const CardComponent = view === "list" ? PropertyCardH : StayCard2;
    return <CardComponent key={course.id} data={course} />;
  };

  return (
    <div className="relative">
      {pagination ? (
        <HeaderList
          tabActive={tabs[0]}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
          totalItems={totalItems}
          onViewChange={setView} // Pass view change handler
        />
      ) : (
        <HeaderFilter
          tabActive={tabs[0]}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
        />
      )}

      <div
        className={`${
          view === "list"
            ? "text-start grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2"
            : "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        } ${gridClass}`}
      >
        {currentItems.map(renderCard)}
      </div>

      {pagination && totalPages > 1 ? (
        <div className="flex mt-16 justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)} // Update current page
          />
        </div>
      ) : (
        <div className="flex mt-16 justify-center items-center">
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default SectionGridFeatureProperty;
