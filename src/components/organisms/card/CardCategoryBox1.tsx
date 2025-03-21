import React, { FC } from "react";
import { TaxonomyType } from "../../../types/types";
import Badge from "../../molecules/Badge";
import convertNumbThousand from "../../../utils/convertNumbThousand";

export interface CardCategoryBox1Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategoryBox1: FC<CardCategoryBox1Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, thumbnail, href = "#" } = taxonomy;

  return (
    <a
      href={href}
      className={`nc-CardCategoryBox1 relative flex items-center p-3 sm:p-6 nc-box-has-hover ${className}`}
    >
      {/* Badge to show count */}
      <Badge
        className="absolute right-2 top-2"
        color="gray"
        name={convertNumbThousand(count)}
      />

      {/* Thumbnail Image */}
      <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
        <img
          src={thumbnail || ""}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="ml-4 flex-grow overflow-hidden">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span className="block mt-2 text-sm text-neutral-500">
          Duration 12 weeks
        </span>
      </div>
    </a>
  );
};

export default CardCategoryBox1;
