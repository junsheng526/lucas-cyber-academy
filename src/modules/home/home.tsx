import Navbar from "../../components/Navbar";
import { TopLecturerSection } from "./TopLecturerSection";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "../../components/background/BgGlassmorphism";
import SectionSliderNewCategories, {
  TaxonomyType,
} from "../../components/slider/SectionSliderNewCategories";
import SectionGridFeaturePlaces from "../../components/slider/SectionGridFeaturePlaces";
import SectionHowItWork from "./SectionHowItWork";

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
    <div className="App">
      <Navbar />
      <main className="nc-PageHome relative overflow-hidden flex justify-center">
        <BgGlassmorphism />
        <div className="container relative px-28">
          <SectionHero className="text-start pt-10 pt-16 pb-16" />

          <SectionSliderNewCategories
            categories={DEMO_CATS}
            className="py-16"
          />

          <SectionGridFeaturePlaces cardType="card2" />

          <SectionHowItWork className="py-20" />
        </div>
      </main>
      {/* <TopLecturerSection /> */}
      {/* <Chatbot /> */}
    </div>
  );
};

export default Home;
