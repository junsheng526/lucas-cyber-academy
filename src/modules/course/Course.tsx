import { FC, useEffect, useState } from "react";
import Layout from "../../components/templates/layout/Layout";
import SectionGridFeatureProperty from "../../components/templates/SectionGridFeatureProperty";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import { Docs, firestoreService } from "../../services/firestoreService"; // Update the path as needed
import { Course } from "../../types/model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StayCard2Skeleton from "../../components/organisms/card/StayCard2Skeleton";

export interface ListingCoursePageProps {}

const CoursePage: FC<ListingCoursePageProps> = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const courseData = await firestoreService.fetchDocs(Docs.COURSES);
        setCourses(courseData as Course[]); // Ensure type safety
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Skeleton for course cards
  const renderSkeleton = () =>
    Array(8)
      .fill(null)
      .map((_, index) => <StayCard2Skeleton key={index} />);

  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative py-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {renderSkeleton()}
            </div>
          ) : (
            <SectionGridFeatureProperty courseListings={courses} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;
