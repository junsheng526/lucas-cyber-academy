export const CourseDetailsSection = () => {
  return (
    <div className="listingSection__wrap space-y-6">
      {/* 1 */}
      <div className="flex justify-between items-center">
        {/* Badge */}
        <span className="px-3 py-1 text-sm bg-neutral-200 text-neutral-800 rounded-full">
          Wooden house
        </span>

        {/* LikeSaveBtns (using a placeholder button) */}
        <button className="text-neutral-500 hover:text-neutral-800">
          <i className="las la-heart text-2xl"></i>
        </button>
        <button className="text-neutral-500 hover:text-neutral-800 ml-3">
          <i className="las la-bookmark text-2xl"></i>
        </button>
      </div>

      {/* 2 */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Beach House in Collingwood
      </h2>

      {/* 3 */}
      <div className="flex items-center space-x-4">
        {/* StartRating (using placeholder stars) */}
        <div className="flex text-yellow-400">
          <i className="las la-star"></i>
          <i className="las la-star"></i>
          <i className="las la-star"></i>
          <i className="las la-star-half-alt"></i>
          <i className="las la-star"></i>
        </div>
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">Tokyo, Japan</span>
        </span>
      </div>

      {/* 4 */}
      <div className="flex items-center">
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-white font-medium">K</span>
        </div>
        <span className="ml-2.5 text-neutral-500">
          Hosted by{" "}
          <span className="text-neutral-900 font-medium">Kevin Francis</span>
        </span>
      </div>

      {/* 5 */}
      <div className="w-full border-b border-neutral-100" />

      {/* 6 */}
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700">
        <div className="flex items-center space-x-3">
          <i className="las la-user text-2xl"></i>
          <span>
            6 <span className="hidden sm:inline-block">guests</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bed text-2xl"></i>
          <span>
            6 <span className="hidden sm:inline-block">beds</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-bath text-2xl"></i>
          <span>
            3 <span className="hidden sm:inline-block">baths</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <i className="las la-door-open text-2xl"></i>
          <span>
            2 <span className="hidden sm:inline-block">bedrooms</span>
          </span>
        </div>
      </div>
    </div>
  );
};
