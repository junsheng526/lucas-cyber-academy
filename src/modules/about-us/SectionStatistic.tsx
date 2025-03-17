import Heading from "../../components/molecules/text/Heading";

const FOUNDER_DEMO = [
  {
    id: "1",
    heading: "100 thousand",
    subHeading: "Courses have been sold online (as of March. 1, 2025)",
  },
  {
    id: "2",
    heading: "80,000",
    subHeading: "Registered user accounts (as of March. 1, 2025)",
  },
  {
    id: "3",
    heading: "220+",
    subHeading:
      "Countries and regions have our presence (as of March. 1, 2025)",
  },
];

const SectionStatistic = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative py-16 ${className}`}>
      <Heading desc="We’re impartial and independent, and every day we create distinctive, world-class programs and content.">
        🚀 Fast Facts
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="p-6 bg-neutral-50 rounded-2xl">
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
