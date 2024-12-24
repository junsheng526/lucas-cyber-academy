import React from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { HOME_HERO_1, HOME_HERO_2, HOME_HERO_3 } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

interface FeaturedCourse {
  id: number;
  images: string[];
  title: string;
  duration: string;
  educator: string;
  rating: number;
  price: string;
}

interface FeaturedCardProps {
  images: string[];
  title: string;
  duration: string;
  educator: string;
  rating: number;
  price: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  images,
  title,
  duration,
  educator,
  rating,
  price,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={title}
              className="w-full h-[200px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-start p-6">
        <Text as="p" className="text-gray-600 text-sm mb-2">
          {educator}
        </Text>
        <Text as="h3" className="text-xl font-medium mb-2">
          {title}
        </Text>
        <Text as="p" className="text-gray-600 text-sm mb-2">
          {"Duration: " + duration}
        </Text>
        <div className="flex items-center">
          <span className="text-yellow-400 text-lg">&#9733;</span>
          <Text as="span" className="text-sm text-gray-600 ml-2">
            {rating.toFixed(1)}
          </Text>
        </div>
        <Text as="p" className="text-xl font-semibold text-gray-800">
          {price}
        </Text>
      </div>
    </div>
  );
};

const featuredCourses: FeaturedCourse[] = [
  {
    id: 1,
    images: [HOME_HERO_1, HOME_HERO_2, HOME_HERO_3],
    title: "Advanced Web Development",
    duration: "12 weeks",
    educator: "John Doe",
    rating: 4.8,
    price: "$349",
  },
  {
    id: 2,
    images: [HOME_HERO_2, HOME_HERO_3, HOME_HERO_1],
    title: "Machine Learning Masterclass",
    duration: "10 weeks",
    educator: "Jane Smith",
    rating: 4.5,
    price: "$349",
  },
  {
    id: 3,
    images: [HOME_HERO_1, HOME_HERO_2, HOME_HERO_3],
    title: "UX/UI Design Essentials",
    duration: "8 weeks",
    educator: "Emily Clark",
    rating: 4.7,
    price: "$299",
  },
  {
    id: 4,
    images: [HOME_HERO_2, HOME_HERO_3, HOME_HERO_1],
    title: "Cloud Computing",
    duration: "14 weeks",
    educator: "Michael Brown",
    rating: 4.6,
    price: "$399",
  },
  {
    id: 1,
    images: [HOME_HERO_1, HOME_HERO_2, HOME_HERO_3],
    title: "Advanced Web Development",
    duration: "12 weeks",
    educator: "John Doe",
    rating: 4.8,
    price: "$349",
  },
  {
    id: 2,
    images: [HOME_HERO_2, HOME_HERO_3, HOME_HERO_1],
    title: "Machine Learning Masterclass",
    duration: "10 weeks",
    educator: "Jane Smith",
    rating: 4.5,
    price: "$349",
  },
  {
    id: 3,
    images: [HOME_HERO_1, HOME_HERO_2, HOME_HERO_3],
    title: "UX/UI Design Essentials",
    duration: "8 weeks",
    educator: "Emily Clark",
    rating: 4.7,
    price: "$299",
  },
  {
    id: 4,
    images: [HOME_HERO_2, HOME_HERO_3, HOME_HERO_1],
    title: "Cloud Computing",
    duration: "14 weeks",
    educator: "Michael Brown",
    rating: 4.6,
    price: "$399",
  },
];

export const FeaturedClassesSection: React.FC = () => {
  return (
    <section className=" text-start py-20 bg-gray-100">
      <div className="container mx-auto px-6 bg-white rounded-lg shadow-lg p-8">
        <div className="mb-12">
          <Text as="h2" className="text-4xl font-medium text-gray-900 mb-4">
            Featured Classes to learn
          </Text>
          <Text as="p" className="text-lg text-gray-600 max-w-xl">
            Popular classes to learn that Chisfis recommends for you
          </Text>
        </div>
        <div className="flex space-x-4 mb-8">
          <Button variant="secondary" onClick={() => {}}>
            All
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            Web Development
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            Data Science
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            Design
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCourses.map((course) => (
            <FeaturedCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};
