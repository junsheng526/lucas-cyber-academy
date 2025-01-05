import React, { FC } from "react";
import GallerySlider from "../slider/GallerySlider";
import SaleOffBadge from "../../molecules/SaleOffBadge";
import BtnLikeIcon from "../../molecules/button/BtnLikeIcon";
import Badge from "../../molecules/Badge";
import StartRating from "../../molecules/StartRating";

export interface StayCardProps {
  className?: string;
  data?: any;
  size?: "default" | "small";
}

const DEMO_DATA: any = {
  id: "1",
  galleryImgs: [
    "https://source.unsplash.com/random/400x300",
    "https://source.unsplash.com/random/401x301",
  ],
  listingCategory: { name: "Apartment" },
  address: "Downtown, NY",
  title: "Luxury Apartment in New York",
  bedrooms: 3,
  href: "/listing/1",
  like: false,
  saleOff: true,
  isAds: false,
  price: "$120",
  reviewStart: 4.5,
  reviewCount: 120,
};

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
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
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="h-[200px]"
          galleryImgs={galleryImgs}
          href={href}
          galleryClass={size === "default" ? undefined : ""}
        />
        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <span className="text-sm text-neutral-500">
            {listingCategory.name} · {bedrooms} beds
          </span>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold capitalize text-neutral-900 ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
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
            <span>{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {price}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 font-normal">
                /hour
              </span>
            )}
          </span>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white ${
        size === "default" ? "border border-neutral-100" : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <a href={href}>{renderContent()}</a>
    </div>
  );
};

export default StayCard;
