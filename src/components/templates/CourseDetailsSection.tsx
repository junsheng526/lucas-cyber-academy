import { FC, useEffect, useState } from "react";
import { Course, Lecturer } from "../../data/model"; // Import Course type
import StartRating from "../molecules/StartRating";
import Avatar from "../molecules/Avatar";
import { DEFAULT_AVATAR } from "../../data/constant";
import { Docs, firestoreService } from "../../services/firestoreService";

interface CourseDetailsSectionProps {
  course: Course;
}

export const CourseDetailsSection: FC<CourseDetailsSectionProps> = ({
  course,
}) => {
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  // Fetch lecturer info when component mounts
  useEffect(() => {
    const fetchLecturer = async () => {
      if (!course.lecturerId) return;

      try {
        const userDoc = await firestoreService.fetchDocById(
          Docs.USERS,
          course.lecturerId
        );
        if (userDoc) {
          setLecturer(userDoc);
        }
      } catch (error) {
        console.error("Error fetching lecturer:", error);
      }
    };

    fetchLecturer();
  }, [course.lecturerId]);
  return (
    <div className="listingSection__wrap space-y-6">
      {/* CATEGORY BADGE */}
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 text-sm bg-neutral-200 text-neutral-800 rounded-full">
          {course.category || "General"}
        </span>

        {/* Like & Save Buttons */}
        {/* <div className="flex space-x-3">
          <button className="text-neutral-500 hover:text-neutral-800">
            <i className="las la-heart text-2xl"></i>
          </button>
          <button className="text-neutral-500 hover:text-neutral-800">
            <i className="las la-bookmark text-2xl"></i>
          </button>
        </div> */}
      </div>

      {/* COURSE TITLE */}
      <h2 className="text-start text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {course.title || "Course Title"}
      </h2>

      {/* RATING & LOCATION */}
      <div className="flex items-center space-x-4">
        <StartRating />
      </div>

      {/* INSTRUCTOR INFO */}
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-full w-full"
            radius="rounded-full"
            imgUrl={
              lecturer?.profileImage ? lecturer?.profileImage : DEFAULT_AVATAR
            }
          />
        </div>
        <span className="ml-2.5 text-neutral-500">
          Taught by{" "}
          <span className="text-neutral-900 font-medium">
            {lecturer?.name ? lecturer?.name : "Jackson Wang"}
          </span>
        </span>
      </div>

      {/* DIVIDER */}
      <div className="w-full border-b border-neutral-100" />

      {/* COURSE DETAILS */}
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700">
        <div className="flex items-center space-x-3">
          <i className="las la-user text-2xl"></i>
          <span>{course.maxSeats || 30} max seats</span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-user text-2xl"></i>
          <span>{course.currentEnrollments || 0} students enrolled</span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-clock text-2xl"></i>
          <span>{"2"} hours</span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-language text-2xl"></i>
          <span>{"English"}</span>
        </div>
      </div>
    </div>
  );
};
