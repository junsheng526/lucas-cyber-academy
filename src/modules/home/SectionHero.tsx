import { FC, useEffect, useState } from "react";
import { firestoreService, Docs } from "../../services/firestoreService";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import { HERO_RIGHT } from "../../assets/assets";
import { Visibility } from "@mui/icons-material";

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

export interface SectionHeroProps {
  homeContentId: string; //  Register home content in Firestore
  className?: string;
  buttonVisible?: string;
}

const SectionHero: FC<SectionHeroProps> = ({
  className,
  homeContentId,
  buttonVisible,
}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const doc = await firestoreService.fetchDocById(
          Docs.HOME_CONTENT,
          homeContentId
        );
        if (doc) setContent(doc as HomeContent);
      } catch (err) {
        console.error("Error fetching home content:", err);
      }
    };
    fetchContent();
  }, []);

  return (
    <div
      className={`text-start flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[114%]">
            {content.title}
          </h2>
          <span className="text-base md:text-lg text-neutral-500">
            {content.subtitle}
          </span>
          <ButtonPrimary
            className={`md:px-5 md:py-4 px-7 ${buttonVisible}`}
            onClick={() => navigate("/courses")}
          >
            {content.buttonText}
          </ButtonPrimary>
        </div>
        <div className="flex-grow">
          <img
            className="w-full"
            src={content.imageUrl || HERO_RIGHT}
            alt="hero"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
