import { FC } from "react";
import rightImgDemo from "../assets/BecomeAnAuthorImg.png";
import Logo from "./Logo";
import ButtonPrimary from "./button/ButtonPrimary";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`text-start relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      {/* Left Content */}
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-20" />
        <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
          Why did you choose us?
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Accompanying us, you have a trip full of experiences. With Chisfis,
          booking accommodation, resort villas, hotels, private houses,
          apartments... becomes fast, convenient and easy.
        </span>
        <ButtonPrimary className="mt-6 sm:mt-11">
          Become an author
        </ButtonPrimary>
      </div>

      {/* Right Image */}
      <div className="flex-grow">
        <img
          alt="Become an author"
          src={rightImg}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
