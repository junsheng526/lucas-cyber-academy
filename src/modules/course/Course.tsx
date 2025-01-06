import { FC } from "react";
import Layout from "../../components/templates/layout/Layout";
import SectionGridFeatureProperty from "../../components/templates/SectionGridFeatureProperty";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";

export interface ListingCoursePageProps {}

const CoursePage: FC<ListingCoursePageProps> = () => {
  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative px-8 md:px-28 space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="relative py-16">
          <SectionGridFeatureProperty
            heading="All Courses"
            subHeading="Let’s Learn The World Most Usefull Tutorials & Grow Together...."
            pagination={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;
