import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Layout from "../../components/templates/layout/Layout";
import { CourseDetailsSection } from "./CourseDetailsSection";
import { CourseDescSection } from "./CourseDescSection";
import { CourseCategorySection } from "./CourseCategorySection";
import { CourseDetailsSidebar } from "./CourseDetailsSidebar";
import { LecturerInfoSection } from "./LecturerInfoSection";
import { PHOTOS } from "./constant";
import { Course } from "../../data/model"; // Import your Course type
import { Docs, firestoreService } from "../../services/firestoreService";

export interface CourseDetailsProps {}

const category = [
  "Introduction to Programming",
  "Understanding Algorithms",
  "Web Development Basics",
  "JavaScript Fundamentals",
  "Building React Apps",
  "Advanced TypeScript",
  "State Management with Redux",
  "Working with APIs",
  "Database Design",
  "Testing and Debugging",
  "Version Control with Git",
  "Deployment Strategies",
  "Responsive Web Design",
  "Project Management Basics",
];

const CourseDetailsPage: FC<CourseDetailsProps> = () => {
  const { id } = useParams<{ id: string }>(); // Get course ID from URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Course ID is missing.");
      setLoading(false);
      return;
    }

    const getCourse = async () => {
      try {
        setLoading(true);
        const data = await firestoreService.fetchDocById(Docs.COURSES, id);
        if (data) {
          setCourse(data);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [id]);

  const handleOpenModalImageGallery = () => {
    // Handle modal logic for image gallery
  };

  return (
    <Layout>
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative py-16">
          {loading && (
            <p className="text-center text-lg">Loading course details...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && course && (
            <>
              {/* HEADER */}
              <header className="rounded-md sm:rounded-xl">
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 h-[60vh]">
                  <div
                    className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  >
                    <img
                      className="object-cover rounded-md sm:rounded-xl w-full h-full"
                      src={course.featuredImage || PHOTOS[0]}
                      alt={course.title}
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>

                  {PHOTOS.slice(1, 5).map((item, index) => (
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
                            src={item}
                            alt=""
                          />
                        </div>
                      </div>

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

              {/* MAIN CONTENT */}
              <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                  <CourseDetailsSection course={course} />
                  <CourseDescSection
                    description={
                      course.description ? course.description : "N/A"
                    }
                  />
                  <CourseCategorySection category={category} />
                  {/* <LecturerInfoSection lecturer={course.lecturer} /> */}
                </div>

                {/* SIDEBAR */}
                <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
                  <div className="sticky top-28">
                    <CourseDetailsSidebar course={course} />
                  </div>
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
