import BackgroundSection from "../../components/atoms/background/BackgroundSection";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import SectionHero from "../home/SectionHero";
import SectionLecturer from "./SectionLecturer";
import SectionClientSay from "./SectionClientSay";
import SectionStatistic from "./SectionStatistic";
import Layout from "../../components/templates/layout/Layout";

const AboutUs: React.FC = () => {
  return (
    <Layout>
      <div className="nc-PageAbout overflow-hidden relative px-[7rem]">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        <div className="container space-y-16 lg:space-y-28">
          <SectionHero
            homeContentId="OWzezYNeCRH9YJMb8rPS"
            className="text-start pt-10 pt-16 md:pb-16"
            buttonVisible="hidden"
          />

          <SectionLecturer />
          <div className="relative py-16">
            <BackgroundSection />
            <SectionClientSay />
          </div>

          <SectionStatistic />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
