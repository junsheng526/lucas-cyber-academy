import { FC, ReactNode } from "react";
import StayCard2 from "../organisms/card/StayCard2";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import HeaderFilter from "../organisms/header/HeaderFilter";
import Pagination from "../molecules/button/Pagination";
import Heading from "../molecules/text/Heading";
import StayCard from "../organisms/card/StayCard";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../molecules/button/ButtonPrimary";

const DEMO_DATA: any[] = DEMO_STAY_LISTINGS.slice(0, 8);

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
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured Classes to learn",
  subHeading = "Popular classes to learn that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["All", "Web Development", "Data Science", "Design"],
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

  return (
    <>
      {!pagination ? (
        <div className="relative">
          <HeaderFilter
            tabActive="All"
            subHeading={subHeading}
            tabs={tabs}
            heading={heading}
          />
          <div
            className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
          >
            {stayListings.map((stay) => renderCard(stay))}
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
            {stayListings.map((stay) => renderCard(stay))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default SectionGridFeaturePlaces;
