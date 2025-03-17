import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface StayCard2SkeletonProps {
  size?: "default" | "small";
  className?: string;
}

const StayCard2Skeleton: FC<StayCard2SkeletonProps> = ({
  size = "default",
  className = "",
}) => {
  return (
    <div className={`group relative ${className}`}>
      {/* Skeleton for Gallery Slider */}
      <div className="relative w-full">
        <Skeleton height={300} className="rounded-lg" />
      </div>

      {/* Skeleton for Content */}
      <div
        className={`${
          size === "default" ? "mt-4 space-y-3" : "mt-2 space-y-2"
        }`}
      >
        <div className="text-start space-y-2">
          <Skeleton width={100} height={14} />
          <Skeleton width="80%" height={18} />

          {/* Skeleton for Location */}
          <div className="flex items-center text-sm space-x-1.5">
            <Skeleton circle width={16} height={16} />
            <Skeleton width={120} height={14} />
          </div>
        </div>

        <div className="w-14 border-b border-gray-200"></div>

        <div className="flex justify-between items-center">
          <Skeleton width={50} height={20} />
        </div>
      </div>
    </div>
  );
};

export default StayCard2Skeleton;
