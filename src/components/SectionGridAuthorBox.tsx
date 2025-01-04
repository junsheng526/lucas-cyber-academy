import React, { FC } from "react";
import CardAuthorBox2 from "./card/CardAuthorBox2";
import ButtonSecondary from "./button/ButtonSecondary";
import ButtonPrimary from "./button/ButtonPrimary";
import { AuthorType } from "../data/types";
import { DEMO_AUTHORS } from "../data/authors";
import Heading from "./text/Heading";
import CardAuthorBox from "./card/CardAuthorBox";

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
  return (
    <div className={`relative ${className}`} data-id="SectionGridAuthorBox">
      <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 Authors of the Month
      </Heading>

      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {authors.map((author, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={author.id} author={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.id}
              author={author}
            />
          )
        )}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonSecondary>Show me more</ButtonSecondary>
        <ButtonPrimary>Become a Host</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;
