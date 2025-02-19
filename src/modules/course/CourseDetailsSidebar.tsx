import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import StartRating from "../../components/molecules/StartRating";
import { Course } from "../../data/model"; // Import Course type
import { useAuth } from "../../firebase/useAuth";
import useEnrollments from "../../hooks/useEnrollments";

interface CourseDetailsSidebarProps {
  course: Course;
}

export const CourseDetailsSidebar: React.FC<CourseDetailsSidebarProps> = ({
  course,
}) => {
  // Extract number from "10 weeks", fallback to 4 weeks if invalid
  const weeks = parseInt(course.duration) || 4;
  const totalPrice = course.price * weeks;

  const user = useAuth();
  const { enrollStudent } = useEnrollments(user?.uid);

  return (
    <div className="listingSectionSidebar__wrap shadow-xl p-6 rounded-2xl bg-white">
      {/* PRICE & RATING */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-semibold">
          ${course.price}
          <span className="ml-1 text-base font-normal text-neutral-500">
            /week
          </span>
        </span>
        <StartRating />
      </div>

      {/* COURSE DETAILS SUMMARY */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between text-neutral-600">
          <span>
            ${course.price} x {weeks} weeks
          </span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Service Fee</span>
          <span>$0</span>
        </div>
        <div className="border-b border-neutral-200"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* ENROLL BUTTON */}
      <ButtonPrimary
        onClick={() => enrollStudent(course.id, course.lecturerId)}
        className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Enroll Now
      </ButtonPrimary>
    </div>
  );
};
