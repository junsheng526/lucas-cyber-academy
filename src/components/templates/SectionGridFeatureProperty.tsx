import { FC, useState } from "react";
import { StayDataType } from "../../data/types";
import HeaderFilter from "../organisms/header/HeaderFilter";
import { DEMO_STAY_LISTINGS } from "../../data/listings";
import PropertyCardH from "../organisms/card/PropertyCardH";
import Pagination from "../molecules/button/Pagination";
import HeaderList from "../organisms/header/HeaderList";
import StayCard2 from "../organisms/card/StayCard2";
import ButtonPrimary from "../molecules/button/ButtonPrimary";

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: string;
  subHeading?: string;
  headingIsCenter?: boolean;
  tabs?: string[];
  pagination?: boolean;
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that we recommend for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  pagination = false,
}) => {
  const [view, setView] = useState<"list" | "card">("card"); // State to handle the current view

  const renderCard = (stay: any) => {
    let CardName = PropertyCardH;
    switch (view) {
      case "list":
        CardName = PropertyCardH;
        break;
      case "card":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard2;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="relative">
      {pagination ? (
        <HeaderList
          tabActive={tabs[0]}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
          totalItems={stayListings.length}
          onViewChange={setView} // Pass view change handler
        />
      ) : (
        <HeaderFilter
          tabActive={tabs[0]}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
        />
      )}

      <div
        className={`${
          view === "list"
            ? "text-start grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2" // List view (vertical stacking)
            : "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" // Card view (grid layout)
        } ${gridClass}`}
      >
        {stayListings.map(renderCard)}
      </div>

      {pagination ? (
        <div className="flex mt-16 justify-center items-center">
          <Pagination />
        </div>
      ) : (
        <div className="flex mt-16 justify-center items-center">
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default SectionGridFeatureProperty;
