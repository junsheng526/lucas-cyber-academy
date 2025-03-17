import { FC, ReactNode, useState } from "react";
import StayCard2 from "../organisms/card/StayCard2";
import HeaderFilter from "../organisms/header/HeaderFilter";
import Heading from "../molecules/text/Heading";
import StayCard from "../organisms/card/StayCard";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../molecules/button/ButtonPrimary";
import { useCourses } from "../../hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StayCard2Skeleton from "../organisms/card/StayCard2Skeleton";

export interface SectionGridFeaturePlacesProps {
  stayListings?: any[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
  pagination?: boolean;
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Featured Classes to learn",
  subHeading = "Popular classes to learn that Chisfis recommends for you",
  cardType = "card2",
  pagination = false,
}) => {
  const navigate = useNavigate();
  const renderCard = (stay: any) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  const [activeTab, setActiveTab] = useState("All");
  const { filteredCourses, categories, loading, error, filterCourses } =
    useCourses();

  // Skeleton for cards
  const renderSkeleton = () =>
    Array(8)
      .fill(null)
      .map((_, index) => <StayCard2Skeleton key={index} />);

  return (
    <>
      {!pagination ? (
        <div className="relative">
          <HeaderFilter
            tabActive="All"
            subHeading={subHeading}
            tabs={categories}
            heading={heading}
            onClickTab={(tab) => {
              setActiveTab(tab);
              filterCourses(tab);
            }}
          />
          <div
            className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
          >
            {loading
              ? renderSkeleton()
              : filteredCourses.map((stay) => renderCard(stay))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <ButtonPrimary onClick={() => navigate("/courses")}>
              Show me more
            </ButtonPrimary>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Heading desc={subHeading}>{heading}</Heading>
          <span className="mb-3 text-start block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500">
            Total 56 courses
          </span>
          <div
            className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
          >
            {loading
              ? renderSkeleton()
              : filteredCourses.map((stay) => renderCard(stay))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            {/* <Pagination /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SectionGridFeaturePlaces;
