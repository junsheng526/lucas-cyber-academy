import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useWindowSize } from "react-use";
import CardCategory3 from "../organisms/card/CardCategory3";
import PrevBtn from "../molecules/button/PrevBtn";
import NextBtn from "../molecules/button/NextBtn";
import Heading from "../molecules/text/Heading";
import { useCourses } from "../../hooks/useCourses";
import { Course } from "../../types/model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SectionSliderNewCategories: FC = () => {
  const { courses, loading, error } = useCourses(); // Fetch courses
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const windowWidth = useWindowSize().width;

  // Responsive logic for number of items per row
  useEffect(() => {
    if (windowWidth < 500) {
      setNumberOfItems(1);
    } else if (windowWidth < 720) {
      setNumberOfItems(2);
    } else if (windowWidth < 1024) {
      setNumberOfItems(3);
    } else if (windowWidth < 1280) {
      setNumberOfItems(4);
    } else {
      setNumberOfItems(5);
    }
  }, [windowWidth]);

  // Change index on swipe/click
  function changeItemId(newVal: number) {
    setDirection(newVal > currentIndex ? 1 : -1);
    setCurrentIndex(newVal);
  }

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentIndex < courses.length - 1 && changeItemId(currentIndex + 1),
    onSwipedRight: () => currentIndex > 0 && changeItemId(currentIndex - 1),
    trackMouse: true,
  });

  // Render Skeleton Loader for Courses
  const renderSkeleton = () =>
    Array.from({ length: numberOfItems }).map((_, i) => (
      <li
        key={i}
        className="inline-block px-4"
        style={{ width: `calc(1 / ${numberOfItems} * 100%)` }}
      >
        <Skeleton height={220} className="rounded-2xl" />
        <Skeleton width={120} height={20} className="mt-4" />
        <Skeleton width={80} height={20} />
      </li>
    ));

  // Render actual course cards
  const renderCard = (course: Course) => <CardCategory3 course={course} />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="nc-SectionSliderNewCategories">
      <Heading desc="Explore our top-rated courses">Popular Courses</Heading>

      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative overflow-hidden" {...handlers}>
          <motion.ul
            className="relative whitespace-nowrap mx-4"
            initial={false}
          >
            <AnimatePresence initial={false} custom={direction}>
              {loading
                ? renderSkeleton() // Show Skeleton while loading
                : courses.map((course, index) => (
                    <motion.li
                      key={index}
                      className="inline-block px-4"
                      custom={direction}
                      initial={{ x: `${(currentIndex - 1) * -100}%` }}
                      animate={{ x: `${currentIndex * -100}%` }}
                      style={{ width: `calc(1 / ${numberOfItems} * 100%)` }}
                    >
                      {renderCard(course)}
                    </motion.li>
                  ))}
            </AnimatePresence>
          </motion.ul>

          {currentIndex > 0 && (
            <PrevBtn
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-12 h-12 text-lg absolute left-3 top-1/3 translate-y-1/5"
            />
          )}

          {courses.length > currentIndex + numberOfItems && (
            <NextBtn
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-12 h-12 text-lg absolute right-3 top-1/3 translate-y-1/5"
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
