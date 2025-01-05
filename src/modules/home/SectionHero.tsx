import { FC } from "react";
import { HERO_RIGHT } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col-reverse lg:flex-col relative ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[114%]">
            Empower Your Skills with Our Courses
          </h2>
          <span className="text-base md:text-lg text-neutral-500">
            Discover our wide range of courses that help you build a strong
            foundation in various fields.
          </span>
          <ButtonPrimary
            className="md:px-5 md:py-4 px-7"
            onClick={() => navigate("/courses")}
          >
            Visit Courses
          </ButtonPrimary>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={HERO_RIGHT} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
