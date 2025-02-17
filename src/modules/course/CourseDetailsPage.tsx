import { FC } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { PHOTOS } from "./constant";
import { CourseDetailsSection } from "./CourseDetailsSection";
import { CourseDescSection } from "./CourseDescSection";
import { CourseCategorySection } from "./CourseCategorySection";
import { CourseDetailsSidebar } from "./CourseDetailsSidebar";
import { LecturerInfoSection } from "./LecturerInfoSection";
import Layout from "../../components/templates/layout/Layout";

export interface CourseDetailsProps {}

const CourseDetailsPage: FC<CourseDetailsProps> = ({}) => {
  const handleOpenModalImageGallery = () => {
    // Handle the modal logic for the image gallery
  };

  return (
    <Layout>
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative py-16">
          {/* HEADER */}
          <header className="rounded-md sm:rounded-xl">
            <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 h-[60vh]">
              <div
                className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <img
                  className="object-cover rounded-md sm:rounded-xl w-full h-full"
                  src={PHOTOS[0]}
                  alt=""
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>

              {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                    <div
                      className="relative w-full"
                      style={{ height: "400px" }}
                    >
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md sm:rounded-xl"
                        src={item || ""}
                        alt=""
                      />
                    </div>
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
              ))}

              <button
                className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                onClick={handleOpenModalImageGallery}
              >
                <Squares2X2Icon className="w-5 h-5" />
                <span className="ml-2 text-neutral-800 text-sm font-medium">
                  Show all photos
                </span>
              </button>
            </div>
          </header>

          {/* MAIN */}
          <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
            {/* CONTENT */}
            <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
              <CourseDetailsSection />
              <CourseDescSection />
              <CourseCategorySection />
              {/* <SectionDateRange /> */}
              <LecturerInfoSection />
            </div>

            {/* SIDEBAR */}
            <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
              <div className="sticky top-28">
                <CourseDetailsSidebar />
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
