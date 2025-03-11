import { FC } from "react";
import GallerySlider from "../slider/GallerySlider";
import Badge from "../../molecules/Badge";
import BtnLikeIcon from "../../molecules/button/BtnLikeIcon";
import SaleOffBadge from "../../molecules/SaleOffBadge";
import { Course } from "../../../types/model";
import { Link } from "react-router-dom";

export interface StayCard2Props {
  className?: string;
  data?: Course;
  size?: "default" | "small";
}

// const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data,
}) => {
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
    saleOff,
  } = data || {};

  // TODO: address should query based on lecturer

  // Renders the image slider with badges and like button
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${id}`}
          ratioClass="h-[300px]"
          galleryImgs={galleryImgs}
          imageClass="rounded-lg"
          href={href}
        />
        <BtnLikeIcon
          isLiked={false}
          className="absolute right-3 top-3 p-1 rounded-full shadow-md"
        />
        {saleOff && (
          <SaleOffBadge className="absolute left-3 top-3 bg-red-500 text-white rounded-md px-2 py-1" />
        )}
      </div>
    );
  };

  // Renders the textual content below the slider
  const renderContent = () => {
    return (
      <div
        className={`${
          size === "default" ? "mt-4 space-y-3" : "mt-2 space-y-2"
        }`}
      >
        <div className="text-start space-y-2">
          <span className="text-sm text-gray-500">
            {category} · {duration} weeks
          </span>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold text-neutral-900 ${
                size === "default" ? "text-base" : "text-sm"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-1.5">
            {size === "default" && (
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
            )}
            <span>{"123, Jalan Kuching"}</span>
          </div>
        </div>

        <div className="w-14 border-b border-gray-200"></div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            {`$${price}`}
            {size === "default" && (
              <span className="text-sm text-gray-500 font-normal">/hour</span>
            )}
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div className={`group relative ${className}`}>
      {renderSliderGallery()}
      <Link to={`/courses/${id}`} className="cursor-pointer block">
        {renderContent()}
      </Link>
    </div>
  );
};

export default StayCard2;
