import Navbar from "../../components/Navbar";
import Chatbot from "../../layout/chatbot";
import { FeaturedClassesSection } from "./FeaturedClassesSection";
import HeroSection from "./HeroSection";
import PopularCoursesSection from "./PopularCourseSection";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
