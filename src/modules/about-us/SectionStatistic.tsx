import Skeleton from "react-loading-skeleton";
import Heading from "../../components/molecules/text/Heading";
import useAboutStats from "../../hooks/useAboutStats";

const SectionStatistic = ({ className = "" }) => {
  const { stats, loading, error } = useAboutStats();
  return (
    <div className={`nc-SectionStatistic relative py-16 ${className}`}>
      <Heading desc="We’re impartial and independent, and every day we create distinctive, world-class programs and content.">
        🚀 Fast Facts
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-6 bg-neutral-50 rounded-2xl">
              <div className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
                <Skeleton height={40} width="80%" />
              </div>
              <div className="block text-sm text-neutral-500 mt-3 sm:text-base">
                <Skeleton height={20} width="100%" className="mt-3" />
              </div>
            </div>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          stats.map((item) => (
            <div key={item.id} className="p-6 bg-neutral-50 rounded-2xl">
              <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl">
                {item.heading}
              </h3>
              <span className="block text-sm text-neutral-500 mt-3 sm:text-base">
                {item.subHeading}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionStatistic;
