import { useNavigate } from "react-router-dom";
import AccessDeniedImg from "../assets/restriction.png";
import Layout from "../components/templates/layout/Layout";
import ButtonPrimary from "../components/molecules/button/ButtonPrimary";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        {/* HEADER */}
        <header className="flex flex-col items-center justify-center space-y-5 text-center max-w-2xl mx-auto">
          <img
            src={AccessDeniedImg}
            alt="access-denied"
            className="w-72 h-72 bg-white"
          />
          <span className="block text-sm text-neutral-800 sm:text-base tracking-wider font-medium">
            {`YOU DON'T HAVE ACCESS FOR THIS PAGE.`}
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

export default AccessDenied;
