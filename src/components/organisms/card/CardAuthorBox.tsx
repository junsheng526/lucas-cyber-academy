import { FC } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Badge from "../../molecules/Badge";
import Avatar from "../../molecules/Avatar";

export interface CardAuthorBoxProps {
  className?: string;
  author: any;
  index?: number;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({
  className = "",
  author,
  index,
}) => {
  const { name, href = "/", profileImage, avgRating } = author;

  return (
    <a
      href={href}
      className={`relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 
        transition-transform hover:scale-105 shadow-lg rounded-lg bg-white ${className}`}
    >
      {index && (
        <Badge
          className="absolute left-3 top-3"
          color={index === 1 ? "red" : index === 2 ? "blue" : "green"}
          name={`#${index}`}
        />
      )}
      <Avatar
        sizeClass="w-20 h-20 text-2xl"
        radius="rounded-full"
        imgUrl={profileImage}
        userName={name}
      />
      <div className="mt-3">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span className="block mt-1.5 text-sm text-neutral-500">New York</span>
      </div>
      <div className="py-2 px-5 mt-4 bg-neutral-100 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium pt-[1px]">
          {avgRating.toFixed(1)}
        </span>
        <StarIcon className="w-5 h-5 text-amber-500 ml-2" />
      </div>
    </a>
  );
};

export default CardAuthorBox;
