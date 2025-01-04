import React, { FC } from "react";
import StartRating from "./StartRating";
import BtnLikeIcon from "./BtnLikeIcon";
import SaleOffBadge from "./SaleOffBadge";
import Badge from "./Badge";
import GallerySlider from "./slider/GallerySlider";

export interface PropertyCardHProps {
  className?: string;
  data?: any;
}

const DEMO_DATA = {
  galleryImgs: [],
  title: "Sample Property",
  href: "/property/1",
  like: false,
  saleOff: true,
  isAds: false,
  price: 150,
  reviewStart: 4.5,
  reviewCount: 120,
  id: "1",
};

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    galleryImgs,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 relative">
        <GallerySlider
          ratioClass="h-[220px]"
          galleryImgs={galleryImgs}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`PropertyCardH_${id}`}
          href={href}
        />
        {saleOff && (
          <SaleOffBadge className="absolute left-5 top-5 !bg-orange-500" />
        )}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500">6 beds</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500">3 baths</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500">1200 Sq. Ft</span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">4 Network</span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">Family</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{title}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80"></div>
          <div className="flex w-full justify-between items-end">
            <StartRating reviewCount={reviewCount} point={reviewStart} />
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
              {`${price},000`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white border-neutral-200/80 rounded-3xl overflow-hidden ${className}`}
    >
      <a href={href} className="absolute inset-0"></a>
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      <BtnLikeIcon
        colorClass={`bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600`}
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3"
      />
    </div>
  );
};

export default PropertyCardH;
