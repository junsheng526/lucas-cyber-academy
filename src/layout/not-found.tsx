import ButtonPrimary from "../components/button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import I404Png from "../assets/404.png";
import Layout from "./Layout";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-2">
          <img src={I404Png} alt="not-found" />
          <span className="block text-sm text-neutral-800 sm:text-base tracking-wider font-medium">
            {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}{" "}
          </span>
          <div className="pt-8">
            <ButtonPrimary onClick={() => navigate("/")}>
              Return Home Page
            </ButtonPrimary>
          </div>
        </header>
      </div>
    </Layout>
  );
};

export default NotFound;
