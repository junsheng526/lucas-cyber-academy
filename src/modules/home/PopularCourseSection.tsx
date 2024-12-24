import React from "react";
import Text from "../../components/Text";
import { HOME_HERO_1, HOME_HERO_2, HOME_HERO_3 } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CourseCardProps {
  image: string;
  title: string;
  description: string;
}

const courses = [
  {
    id: 1,
    image: HOME_HERO_1,
    title: "Web Development",
    description: "Learn the fundamentals of web development.",
  },
  {
    id: 2,
    image: HOME_HERO_2,
    title: "Data Science",
    description: "Explore data analysis and machine learning techniques.",
  },
  {
    id: 3,
    image: HOME_HERO_3,
    title: "Graphic Design",
    description: "Master the art of visual communication.",
  },
  {
    id: 4,
    image: HOME_HERO_1,
    title: "Web Development",
    description: "Learn the fundamentals of web development.",
  },
  {
    id: 5,
    image: HOME_HERO_2,
    title: "Data Science",
    description: "Explore data analysis and machine learning techniques.",
  },
  {
    id: 6,
    image: HOME_HERO_3,
    title: "Graphic Design",
    description: "Master the art of visual communication.",
  },
];

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="overflow-hidden w-[250px] flex-shrink-0">
      <img
        src={image}
        alt={title}
        className="rounded-lg  w-[232px] h-[332px] object-cover"
      />
      <div className="text-start px-1 py-6">
        <Text as="h3" className="text-xl font-medium mb-2">
          {title}
        </Text>
        <Text as="p" className="text-gray-600 text-sm mb-4">
          {description}
        </Text>
      </div>
    </div>
  );
};

const PopularCoursesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <Text as="h2" className="text-4xl font-medium text-gray-900 mb-4">
          Popular Courses
        </Text>
        <Text as="p" className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
          Enhance your skills with our top-rated courses designed by industry
          experts.
        </Text>

        {/* Carousel Section */}
        <Swiper
          slidesPerView={5}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination]}
          className="pb-10"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard
                image={course.image}
                title={course.title}
                description={course.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
