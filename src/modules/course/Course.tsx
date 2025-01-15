import { FC, useEffect, useState } from "react";
import Layout from "../../components/templates/layout/Layout";
import SectionGridFeatureProperty from "../../components/templates/SectionGridFeatureProperty";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import { Docs, firestoreService } from "../../services/firestoreService"; // Update the path as needed
import { Course } from "../../data/model";

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

  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative py-16">
          {loading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : (
            <SectionGridFeatureProperty
              heading="All Courses"
              subHeading="Let’s Learn The World Most Useful Tutorials & Grow Together...."
              courseListings={courses} // Pass fetched courses to the component
              pagination={true}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;
