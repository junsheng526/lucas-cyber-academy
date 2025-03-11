import { useState } from "react";
import ButtonSecondary from "../molecules/button/ButtonSecondary";
import { CourseCategoryListing } from "./CourseCategoryListing";

interface CourseCategorySectionProps {
  category: string[];
}

export const CourseCategorySection: React.FC<CourseCategorySectionProps> = ({
  category,
}) => {
  const [isOpenModalSyllabus, setIsOpenModalSyllabus] =
    useState<boolean>(false);

  const openModalAmenities = () => setIsOpenModalSyllabus(true);
  return (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Course category</h2>
        <span className="block mt-2 text-neutral-500">
          {`Overview of the course topics you'll cover`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200"></div>

      {/* Display first 12 category topics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700">
        {category.slice(0, 12).map((topic, index) => (
          <div key={index} className="flex items-center space-x-3">
            <i className="text-3xl las la-book"></i> {/* Icon for category */}
            <span>{topic}</span>
          </div>
        ))}
      </div>

      <div className="w-14 border-b border-neutral-200"></div>
      <div>
        <ButtonSecondary onClick={openModalAmenities}>
          View more {category.length - 12} topics
        </ButtonSecondary>
      </div>

      {/* Pass modal state as props */}
      <CourseCategoryListing
        isOpenModalSyllabus={isOpenModalSyllabus}
        setIsOpenModalSyllabus={setIsOpenModalSyllabus}
        syllabus={category}
      />
    </div>
  );
};
