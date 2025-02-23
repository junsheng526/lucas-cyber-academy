import SectionHero from "./SectionHero";
import SectionSliderNewCategories, {
  TaxonomyType,
} from "../../components/templates/SectionSliderNewCategories";
import SectionGridFeaturePlaces from "../../components/templates/SectionGridFeaturePlaces";
import SectionHowItWork from "./SectionHowItWork";
import SectionGridAuthorBox from "../../components/templates/SectionGridAuthorBox";
import BackgroundSection from "../../components/atoms/background/BackgroundSection";
import SectionGridCategoryBox from "../../components/templates/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "../../components/templates/SectionBecomeAnAuthor";
import SectionVideos from "../../components/templates/SectionVideos";
import Layout from "../../components/templates/layout/Layout";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/",
    title: "Web Development",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/",
    title: "Data Science",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/",
    title: "Graphic Design",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/",
    title: "Food Science",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "5",
    href: "/",
    title: "Application Development",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "6",
    href: "/",
    title: "Blockchain",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/",
    title: "Finance",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const Home: React.FC = () => {
  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero className="text-start pt-10 pt-16 md:pb-16" />

        <SectionSliderNewCategories categories={DEMO_CATS} className="py-16" />

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
