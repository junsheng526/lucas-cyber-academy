import { useState } from "react";
import ButtonSecondary from "../../components/molecules/button/ButtonSecondary";
import { Amenities_demos } from "./constant";
import { CourseCategoryListing } from "./CourseCategoryListing";

export const CourseCategorySection: React.FC = () => {
  const [isOpenModalAmenities, setIsOpenModalAmenities] =
    useState<boolean>(false);

  const openModalAmenities = () => setIsOpenModalAmenities(true);

  return (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Amenities</h2>
        <span className="block mt-2 text-neutral-500">
          {`About the property's amenities and services`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200"></div>

      {/* Display first 12 amenities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700">
        {Amenities_demos.slice(0, 12).map((item) => (
          <div key={item.name} className="flex items-center space-x-3">
            <i className={`text-3xl las ${item.icon}`}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="w-14 border-b border-neutral-200"></div>
      <div>
        <ButtonSecondary onClick={openModalAmenities}>
          View more {Amenities_demos.length - 12} amenities
        </ButtonSecondary>
      </div>

      {/* Pass modal state as props */}
      <CourseCategoryListing
        isOpenModalAmenities={isOpenModalAmenities}
        setIsOpenModalAmenities={setIsOpenModalAmenities}
      />
    </div>
  );
};
