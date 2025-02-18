interface CourseDescSectionProps {
  description: string;
}

export const CourseDescSection: React.FC<CourseDescSectionProps> = ({
  description,
}) => {
  return (
    <div className="listingSection__wrap space-y-6 text-start">
      <h2 className="text-2xl font-semibold text-neutral-900">
        Course Description
      </h2>
      <div className="w-14 border-b border-neutral-200"></div>

      {/* Course Description */}
      <div className="text-neutral-600">
        <p>{description}</p>
      </div>
    </div>
  );
};
