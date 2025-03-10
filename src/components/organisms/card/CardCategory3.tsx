import { FC } from "react";
import convertNumbThousand from "../../../utils/convertNumbThousand";
import { Course } from "../../../data/model"; // Import Course type

export interface CardCategory3Props {
  className?: string;
  course: Course; // Change to use Course type
}

const CardCategory3: FC<CardCategory3Props> = ({ className = "", course }) => {
  const { title, currentEnrollments, featuredImage, href } = course; // Adjust to course data fields

  return (
    <a
      href={`${"/courses/" + course.id}` || "#"}
      className={`nc-CardCategory3 flex flex-col ${className}`}
    >
      <div className="relative w-full h-0 pb-[120%] rounded-2xl">
        <img
          src={featuredImage || "/default-course.jpg"} // Use default if no image
          className="absolute top-0 left-0 object-cover w-full h-full rounded-2xl"
          alt={title || "Course"}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>

      <div className="text-start mt-4 truncate">
        <h2 className="text-base sm:text-lg text-neutral-900 font-medium truncate">
          {title || "Untitled Course"}
        </h2>
        <span className="block mt-1.5 text-sm text-neutral-600">
          {convertNumbThousand(currentEnrollments || 0)} students
        </span>
      </div>
    </a>
  );
};

export default CardCategory3;
