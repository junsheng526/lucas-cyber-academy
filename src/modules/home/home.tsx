import Navbar from "../../components/Navbar";
import Chatbot from "../../layout/chatbot";
import HeroSection from "./HeroSection";

const Home: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      {/* <Chatbot /> */}
    </div>
  );
};

export default Home;
