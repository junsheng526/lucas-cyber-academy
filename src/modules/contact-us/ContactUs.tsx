import Skeleton from "react-loading-skeleton";
import SocialsList from "../../components/molecules/SocialsList";
import Layout from "../../components/templates/layout/Layout";
import useHomeContent from "../../hooks/useHomeContent";
import ContactForm from "./ContactForm";

const ContactUs: React.FC = () => {
  const { data, loading } = useHomeContent("CtFtz97Oedq4TQKFcCFm"); // Use Firestore doc ID

  // Default fallback data
  const info = [
    {
      title: "🗺 ADDRESS",
      desc: data?.address || "Address not available",
    },
    {
      title: "💌 EMAIL",
      desc: data?.email || "Email not available",
    },
    {
      title: "☎ PHONE",
      desc: data?.phone || "Phone number not available",
    },
  ];

  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-24 lg:mb-32">
          <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 md:justify-center">
            Contact
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="max-w-sm space-y-8">
                {loading
                  ? Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} className="text-start">
                          <Skeleton width={100} height={16} />
                          <Skeleton width="80%" height={20} className="mt-2" />
                        </div>
                      ))
                  : info.map((item, index) => (
                      <div key={index}>
                        <h3 className="uppercase font-semibold text-sm tracking-wider text-left">
                          {item.title}
                        </h3>
                        <span className="block mt-2 text-neutral-500 text-left">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                <div>
                  <h3 className="uppercase font-semibold text-sm tracking-wider text-left">
                    🌏 SOCIALS
                  </h3>
                  <SocialsList className="mt-2" />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
