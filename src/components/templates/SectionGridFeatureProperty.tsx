import { FC, useState } from "react";
import PropertyCardH from "../organisms/card/PropertyCardH";
import Pagination from "../molecules/button/Pagination";
import HeaderList from "../organisms/header/HeaderList";
import StayCard2 from "../organisms/card/StayCard2";
import { Course } from "../../types/model";

export interface SectionGridFeaturePropertyProps {
  courseListings: Course[];
  gridClass?: string;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  courseListings = [],
  gridClass = "",
  tabs = [],
}) => {
  const [view, setView] = useState<"list" | "card">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search

  const itemsPerPage = 8;

  // Filter courses based on search query
  const filteredCourses = courseListings.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const currentItems = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const renderCard = (course: Course) =>
    view === "list" ? (
      <PropertyCardH data={course} />
    ) : (
      <StayCard2 data={course} />
    );

  return (
    <div className="relative">
      <HeaderList
        tabActive="Development"
        subHeading="Popular courses we recommend for you"
        heading="Featured Courses"
        totalItems={filteredCourses.length}
        onViewChange={setView}
        onSearchChange={handleSearch} // Handle search here
        tabs={tabs}
      />

      <div
        className={`${
          view === "list"
            ? "text-start grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2"
            : "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        } ${gridClass}`}
      >
        {currentItems.map(renderCard)}
      </div>

      {totalPages > 1 && (
        <div className="flex mt-16 justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default SectionGridFeatureProperty;
