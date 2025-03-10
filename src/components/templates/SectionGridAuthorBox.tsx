import { FC } from "react";
import CardAuthorBox2 from "../organisms/card/CardAuthorBox2";
import { AuthorType } from "../../data/types";
import { DEMO_AUTHORS } from "../../data/authors";
import Heading from "../molecules/text/Heading";
import CardAuthorBox from "../organisms/card/CardAuthorBox";
import ButtonSecondary from "../molecules/button/ButtonSecondary";
import ButtonPrimary from "../molecules/button/ButtonPrimary";
import useTopLecturers from "../../hooks/useTopLecturers";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}

const DEMO_DATA = DEMO_AUTHORS.slice(0, 10);

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
}) => {
  const { lecturers, loading } = useTopLecturers(10);

  return (
    <div className={`relative ${className}`} data-id="SectionGridAuthorBox">
      <Heading desc="Rating based on student reviews" isCenter>
        Top 10 Lecturer of the Month
      </Heading>

      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {lecturers.map((lecturer, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={lecturer.id} author={lecturer} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={lecturer.id}
              author={lecturer}
            />
          )
        )}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonSecondary>Show me more</ButtonSecondary>
        <ButtonPrimary>Become a Lecturer</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;
