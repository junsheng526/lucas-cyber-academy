import SectionHero from "./SectionHero";
import SectionGridFeaturePlaces from "../../components/templates/SectionGridFeaturePlaces";
import SectionHowItWork from "./SectionHowItWork";
import SectionGridAuthorBox from "../../components/templates/SectionGridAuthorBox";
import BackgroundSection from "../../components/atoms/background/BackgroundSection";
import SectionGridCategoryBox from "../../components/templates/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "../../components/templates/SectionBecomeAnAuthor";
import SectionVideos from "../../components/templates/SectionVideos";
import Layout from "../../components/templates/layout/Layout";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import SectionSliderNewCategories from "../../components/templates/SectionSliderNewCategories";

const Home: React.FC = () => {
  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero className="text-start pt-10 pt-16 md:pb-16" />

        <SectionSliderNewCategories />

        <SectionGridFeaturePlaces />

        <SectionHowItWork className="py-20" />
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50" />
          <SectionGridAuthorBox />
        </div>

        <SectionGridCategoryBox className="md:py-20" />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionVideos className="py-16" />
      </div>
    </Layout>
  );
};

export default Home;
