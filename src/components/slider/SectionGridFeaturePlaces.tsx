import { FC, ReactNode } from "react";
// import ButtonPrimary from "@/shared/ButtonPrimary";
// import HeaderFilter from "./HeaderFilter";
import StayCard from "../card/StayCard2";
import StayCard2 from "../card/StayCard2";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import ButtonPrimary from "../button/ButtonPrimary";
import HeaderFilter from "../HeaderFilter";

const DEMO_DATA: any[] = DEMO_STAY_LISTINGS.slice(0, 8);

export interface SectionGridFeaturePlacesProps {
  stayListings?: any[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured Classes to learn",
  subHeading = "Popular classes to learn that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["All", "Web Development", "Data Science", "Design"],
  cardType = "card2",
}) => {
  const renderCard = (stay: any) => {
    const CardComponent = cardType === "card2" ? StayCard2 : StayCard;
    return <CardComponent key={stay.id} data={stay} />;
  };

  return (
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
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
