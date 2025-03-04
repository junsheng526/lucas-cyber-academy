import SocialsList from "../../components/molecules/SocialsList";
import Layout from "../../components/templates/layout/Layout";
import ContactForm from "./ContactForm";

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const ContactUs: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-24 lg:mb-32">
          <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 justify-center">
            Contact
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="max-w-sm space-y-8">
                {info.map((item, index) => (
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
