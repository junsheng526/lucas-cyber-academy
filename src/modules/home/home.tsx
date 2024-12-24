import Navbar from "../../components/Navbar";
import Chatbot from "../../layout/chatbot";
import { FeaturedClassesSection } from "./FeaturedClassesSection";
import HeroSection from "./HeroSection";
import PopularCoursesSection from "./PopularCourseSection";

const Home: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <PopularCoursesSection />
      <FeaturedClassesSection />
      {/* <Chatbot /> */}
    </div>
  );
};

export default Home;
