import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../../../utils/animationVariants";

export interface GallerySliderProps {
  className?: string;
  galleryImgs: string[];
  ratioClass?: string;
  uniqueID: string;
  href?: string;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
}

export default function GallerySlider({
  className = "",
  galleryImgs,
  ratioClass = "aspect-w-4 aspect-h-3",
  imageClass = "",
  uniqueID = "uniqueID",
  galleryClass = "rounded-xl",
  href = "#",
  navigation = true,
}: GallerySliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = galleryImgs;

  function changePhotoId(newVal: number) {
    setDirection(newVal > index ? 1 : -1);
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => index < images.length - 1 && changePhotoId(index + 1),
    onSwipedRight: () => index > 0 && changePhotoId(index - 1),
    trackMouse: true,
  });

  const currentImage = images[index];

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className={`relative group ${className}`} {...handlers}>
        {/* Main image */}
        <div className={`w-full overflow-hidden ${galleryClass}`}>
          <a
            href={href}
            className={`relative flex items-center justify-center ${ratioClass}`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants(340, 1)}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <img
                  src={currentImage}
                  alt="Gallery slide"
                  className={`object-cover w-full h-full ${imageClass}`}
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </a>
        </div>

        {/* Navigation Buttons */}
        {loaded && navigation && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {index > 0 && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:border-neutral-400"
                onClick={() => changePhotoId(index - 1)}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
            )}
            {index < images.length - 1 && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:border-neutral-400"
                onClick={() => changePhotoId(index + 1)}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom Nav Dots */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg"></div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => changePhotoId(i)}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
