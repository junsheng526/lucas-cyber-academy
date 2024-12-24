import React from "react";
import { HOME_HERO_1, HOME_HERO_2, HOME_HERO_3 } from "../../assets/assets";
import Text from "../../components/Text";
import Button from "../../components/Button";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative py-20 bg-gray-100 flex items-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <Text
            as="h1"
            className={
              "text-start text-4xl lg:text-5xl font-medium text-gray-900 mb-4"
            }
          >
            Empower Your Skills with Our Courses
          </Text>
          <Text as="p" className={"text-start text-lg text-gray-600 mb-6"}>
            Discover our wide range of courses that help you build a strong
            foundation in various fields.
          </Text>
          <div className="flex justify-start">
            <Button
              fontSize="sm"
              variant="primary"
              onClick={() => {}}
              className="px-6 py-3"
            >
              <Text
                as="span"
                className="font-normal text-sm hover:bg-blue-700 transition"
              >
                Visit Courses
              </Text>
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-3 gap-4 h-[500px]">
          <div className="grid gap-4">
            <div className="col-span-1">
              <img
                src={HOME_HERO_1}
                alt="Image 1"
                className="w-full h-[150px] object-cover rounded-lg"
              />
            </div>
            <div className="col-span-1">
              <img
                src={HOME_HERO_2}
                alt="Image 2"
                className="w-full h-[350px] object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="w-full h-full mt-24">
            <img
              src={HOME_HERO_3}
              alt="Image 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
