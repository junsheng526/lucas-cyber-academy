import { useState } from "react";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";
import CommentListing from "../../modules/course/CommentListing";
import { useCourseRating } from "../../hooks/useCourseRating";

const RatingSection = ({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string;
}) => {
  const { ratingData, allRatings, canRate, loading, submitRating } =
    useCourseRating(studentId, courseId);
  const [selectedRating, setSelectedRating] = useState<number | null>(
    ratingData?.starPoint || null
  );
  const [reviewText, setReviewText] = useState(ratingData?.comment || "");

  const handleSubmitReview = () => {
    if (!selectedRating || !reviewText.trim()) return;
    submitRating(selectedRating, reviewText);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-start text-2xl font-semibold text-gray-900">
        Course Reviews ({allRatings.length})
      </h2>
      <div className="w-14 border-b border-neutral-200 my-2"></div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : (
        <>
          {canRate && (
            <div className="space-y-5">
              {/* Star Rating Selection */}
              <div className="flex space-x-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-8 h-8 cursor-pointer ${
                      star <= (selectedRating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setSelectedRating(star)}
                  />
                ))}
              </div>

              {/* Input for New Reviews */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-16 px-4 py-3 text-gray-700 bg-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your thoughts ..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md"
                  onClick={handleSubmitReview}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="divide-y divide-neutral-100 mt-6">
            {allRatings.length > 0 ? (
              allRatings.map((rating, index) => (
                <CommentListing
                  key={index}
                  data={{
                    name: rating.name,
                    avatar: rating.profileImage,
                    comment: rating.comment,
                    starPoint: rating.starPoint,
                    date: rating.date,
                  }}
                  className="py-4"
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No reviews yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RatingSection;
