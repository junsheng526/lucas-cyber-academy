import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

interface CommentListingProps {
  className?: string;
  data: CommentListingDataType;
}

const CommentListing: React.FC<CommentListingProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`flex space-x-4 p-4 bg-white shadow-md ${className}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-medium text-gray-700">
            {data.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-grow">
        <div className="text-start flex justify-between items-center">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{data.name}</h4>
            <span className="text-xs text-gray-500">{data.date}</span>
          </div>
          {/* Rating Stars */}
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < data.starPoint ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-start mt-2 text-sm text-gray-700">{data.comment}</p>
      </div>
    </div>
  );
};

export default CommentListing;
