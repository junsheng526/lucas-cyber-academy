import React from "react";
import { useCategories } from "../../hooks/useCategories";
import Heading from "../molecules/text/Heading";
import CardCategoryBox1 from "../organisms/card/CardCategoryBox1";

export interface SectionGridCategoryBoxProps {
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const { categories, loading, error } = useCategories();
  const CardComponent = CardCategoryBox1;

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places near where you live"
        isCenter={headingCenter}
      >
        Explore Courses
      </Heading>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div
          className={`grid ${gridClassName} text-start gap-5 sm:gap-6 md:gap-8`}
        >
          {categories.map((item, index) => (
            <CardComponent
              key={index}
              taxonomy={{
                id: String(index),
                href: `/courses?category=${encodeURIComponent(item.name)}`,
                name: item.name,
                taxonomy: "category",
                count: item.count,
                thumbnail: item.featuredImage,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGridCategoryBox;
