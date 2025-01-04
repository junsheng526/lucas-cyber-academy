import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useWindowSize } from "react-use";
import CardCategory3 from "../card/CardCategory3";
import PrevBtn from "../button/PrevBtn";
import NextBtn from "../button/NextBtn";
import Heading from "../text/Heading";

export interface TaxonomyType {
  id: string;
  href: string;
  title: string;
  taxonomy: string;
  count: number;
  thumbnail: string;
}

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    title: "Nature House",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg",
  },
  {
    id: "2",
    href: "#",
    title: "Wooden house",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg",
  },
  {
    id: "3",
    href: "#",
    title: "Houseboat",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
  },
  {
    id: "4",
    href: "#",
    title: "Farm House",
    taxonomy: "category",
    count: 18188,
    thumbnail:
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg",
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Popular Courses",
  subHeading = "Enhance your skills with our top-rated courses designed by industry experts.",
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 320) {
      setNumberOfItems(1);
    } else if (windowWidth < 500) {
      setNumberOfItems(1);
    } else if (windowWidth < 720) {
      setNumberOfItems(itemPerRow - 3);
    } else if (windowWidth < 1024) {
      setNumberOfItems(itemPerRow - 2);
    } else if (windowWidth < 1280) {
      setNumberOfItems(itemPerRow - 1);
    } else {
      setNumberOfItems(itemPerRow);
    }
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    setDirection(newVal > currentIndex ? 1 : -1);
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentIndex < categories.length - 1 && changeItemId(currentIndex + 1),
    onSwipedRight: () => currentIndex > 0 && changeItemId(currentIndex - 1),
    trackMouse: true,
  });

  const renderCard = (item: TaxonomyType) => {
    switch (categoryCardType) {
      // case "card4":
      //   return <CardCategory4 taxonomy={item} />;
      // case "card5":
      //   return <CardCategory5 taxonomy={item} />;
      default:
        return <CardCategory3 taxonomy={item} />;
    }
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>
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
              {categories.map((item, index) => (
                <motion.li
                  key={index}
                  className={`inline-block px-4 ${itemClassName}`}
                  custom={direction}
                  initial={{ x: `${(currentIndex - 1) * -100}%` }}
                  animate={{ x: `${currentIndex * -100}%` }}
                  style={{
                    width: `calc(1 / ${numberOfItems} * 100%)`,
                  }}
                >
                  {renderCard(item)}
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

          {categories.length > currentIndex + numberOfItems && (
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
