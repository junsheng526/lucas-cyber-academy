import { FC } from "react";
import HIW1img from "../../assets/HIW1.png";
import HIW2img from "../../assets/HIW2.png";
import HIW3img from "../../assets/HIW3.png";
import VectorImg from "../../assets/VectorHIW.svg";
import Heading from "../../components/text/Heading";

interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: string;
    imgDark?: string;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "Explore & Enroll",
    desc: 'Browse through our extensive course catalog, filter by category or skill level, and choose the course that fits your needs. Simply click "Enroll" to get started.',
  },
  {
    id: 2,
    img: HIW2img,
    title: "Learn at Your Own Pace",
    desc: "Access video lessons, interactive quizzes, and downloadable resources. Track your progress and revisit materials anytime to reinforce your understanding.",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Earn Certificates & Advance",
    desc: "Complete the course, take assessments, and earn industry-recognized certificates. Showcase your achievements to boost your career and skillset.",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter={true} desc="Keep motivating & learning on">
        How it work
      </Heading>
      <div className="mt-20 relative grid md:grid-cols-3 gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-10"
          src={VectorImg}
          alt="Vector decoration"
        />
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            {item.imgDark ? (
              <>
                <img
                  className="dark:hidden block mb-8 max-w-[180px] mx-auto"
                  src={item.img}
                  alt={item.title}
                />
                <img
                  className="hidden dark:block mb-8 max-w-[180px] mx-auto"
                  src={item.imgDark}
                  alt={item.title}
                />
              </>
            ) : (
              <img
                className="mb-8 max-w-[180px] mx-auto"
                src={item.img}
                alt={item.title}
              />
            )}
            <div className="text-center mt-auto">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="block mt-5 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
