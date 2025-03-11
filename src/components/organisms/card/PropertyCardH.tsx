import React, { FC } from "react";
import StartRating from "../../molecules/StartRating";
import BtnLikeIcon from "../../molecules/button/BtnLikeIcon";
import SaleOffBadge from "../../molecules/SaleOffBadge";
import Badge from "../../molecules/Badge";
import GallerySlider from "../slider/GallerySlider";
import { Course } from "../../../types/model";
import { Link } from "react-router-dom";

export interface PropertyCardHProps {
  className?: string;
  data?: Course;
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

const PropertyCardH: FC<PropertyCardHProps> = ({ className = "", data }) => {
  const {
    id,
    galleryImgs = ["placeholder.jpg"],
    title = "Untitled Course",
    href = "#",
    category,
    price = 0,
    duration,
    lessons,
    level,
    tags = [],
    isAds = false,
    featuredImage,
    saleOff = "aa",
  } = data || {};

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
          <SaleOffBadge className="absolute left-5 top-5 bg-red-500 text-white rounded-md px-2 py-1" />
        )}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <span className="text-xs text-neutral-500">Jalan Langkawi</span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500">Popular Courses</span>
        </div> */}
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
                  <span className="ml-1">{category}</span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">Online</span>
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
            <StartRating reviewCount={100} point={5} />
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
              {`$${price}/hour`}
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
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        <Link to={`/courses/${id}`} className="cursor-pointer block">
          {renderContent()}
        </Link>
      </div>
      <BtnLikeIcon
        colorClass={`bg-neutral-100 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600`}
        // isLiked={like}
        isLiked={true}
        className="absolute right-5 top-5 sm:right-3 sm:top-3"
      />
    </div>
  );
};

export default PropertyCardH;
