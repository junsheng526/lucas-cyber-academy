import React from "react";
import Text from "../../components/Text";
import { HOME_HERO_1, HOME_HERO_2 } from "../../assets/assets";

interface LecturerCardProps {
  name: string;
  course: string;
  rating: number;
  image: string;
}

const LecturerCard: React.FC<LecturerCardProps> = ({
  name,
  course,
  rating,
  image,
}) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col items-center">
      {/* Rating */}
      <div className="absolute top-4 left-4 flex items-center bg-gray-200 text-black px-2 py-1 rounded-md">
        <span className="text-yellow-600 text-lg">&#9733;</span>
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      {/* Profile Image */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      {/* Lecturer Details */}
      <Text as="h3" className="text-lg font-semibold text-gray-900">
        {name}
      </Text>
      <Text as="p" className="text-sm text-gray-600">
        {course}
      </Text>
    </div>
  );
};

const lecturers = [
  {
    name: "John Doe",
    course: "Web Development",
    rating: 4.9,
    image: HOME_HERO_1,
  },
  {
    name: "Jane Smith",
    course: "Machine Learning",
    rating: 4.8,
    image: HOME_HERO_2,
  },
  {
    name: "Emily Clark",
    course: "UI/UX Design",
    rating: 4.7,
    image: HOME_HERO_1,
  },
  {
    name: "Michael Brown",
    course: "Cloud Computing",
    rating: 4.6,
    image: HOME_HERO_2,
  },
  {
    name: "Chris Evans",
    course: "Cyber Security",
    rating: 4.7,
    image: HOME_HERO_1,
  },
  {
    name: "Anna White",
    course: "Data Science",
    rating: 4.8,
    image: HOME_HERO_2,
  },
  {
    name: "Robert Green",
    course: "Blockchain",
    rating: 4.5,
    image: HOME_HERO_1,
  },
  {
    name: "Sophia Lee",
    course: "Marketing Strategy",
    rating: 4.9,
    image: HOME_HERO_2,
  },
];

export const TopLecturerSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
          <Text as="h2" className="text-4xl font-bold text-gray-900 mb-4">
            Top Lecturers
          </Text>
          <Text as="p" className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our top-rated lecturers who excel in their fields and inspire
            the next generation of learners.
          </Text>
        </div>

        {/* Grid of Lecturer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {lecturers.map((lecturer, index) => (
            <LecturerCard key={index} {...lecturer} />
          ))}
        </div>
      </div>
    </section>
  );
};
