import { FC, useEffect, useState } from "react";
import { firestoreService, Docs } from "../../services/firestoreService";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import { HERO_RIGHT } from "../../assets/assets";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  const [loading, setLoading] = useState<boolean>(true); // 👈 Add loading state

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
      } finally {
        setLoading(false); // ✅ Stop loading once data is fetched
      }
    };

    fetchContent();
  }, []);

  return (
    <div
      className={`text-start flex flex-col-reverse lg:flex-col relative ${className} min-h-screen`} // ✅ Force height to be 100vh
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          {/* 🎯 Title Skeleton */}
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[114%]">
            {loading ? <Skeleton width={400} height={40} /> : content.title}
          </h2>

          {/* 🎯 Subtitle Skeleton */}
          <span className="text-base md:text-lg text-neutral-500">
            {loading ? <Skeleton width={300} height={20} /> : content.subtitle}
          </span>

          {/* 🎯 Button Skeleton */}
          {loading ? (
            <Skeleton width={160} height={50} />
          ) : (
            <ButtonPrimary
              className={`md:px-5 md:py-4 px-7 ${buttonVisible}`}
              onClick={() => navigate("/courses")}
            >
              {content.buttonText}
            </ButtonPrimary>
          )}
        </div>

        <div className="flex-grow">
          {/* 🎯 Image Skeleton */}
          {loading ? (
            <Skeleton width={"100%"} height={400} />
          ) : (
            <img
              className="w-full"
              src={content.imageUrl || HERO_RIGHT}
              alt="hero"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
