import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";
import { useUser } from "../hooks/useUser";

export interface RatingData {
  studentId: string;
  name: string;
  profileImage: string;
  comment: string;
  starPoint: number;
  date: string;
}

export const useCourseRating = (studentId: string, courseId: string) => {
  const { userData } = useUser(); // Fetch current user data
  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [allRatings, setAllRatings] = useState<RatingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    if (!studentId || !courseId) return;

    const fetchRatings = async () => {
      try {
        setLoading(true);

        // Check enrollment progress
        const enrollments = await firestoreService.fetchDocs(Docs.ENROLLMENTS);
        const enrollment = enrollments.find(
          (e) => e.studentId === studentId && e.courseId === courseId
        );

        if (enrollment && enrollment.progress === 1) {
          setCanRate(true);
        }

        // Fetch all ratings for the course
        const ratings = await firestoreService.fetchDocs(Docs.COURSE_RATINGS);
        const courseRatings = ratings.filter((r) => r.courseId === courseId);

        // Fetch user details for each reviewer
        const userPromises = courseRatings.map(async (rating) => {
          const user = await firestoreService.fetchDocById(
            "users",
            rating.studentId
          );
          return {
            studentId: rating.studentId,
            name: user?.name || "Unknown",
            profileImage: user?.profileImage || "",
            comment: rating.comment,
            starPoint: rating.rating,
            date: new Date(rating.createdAt).toLocaleDateString(),
          };
        });

        const fullRatings = await Promise.all(userPromises);
        setAllRatings(fullRatings);

        // Get the current student's rating (if exists)
        const existingRating = fullRatings.find(
          (r) => r.studentId === studentId
        );
        if (existingRating) {
          setRatingData(existingRating);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [studentId, courseId]);

  const submitRating = async (newRating: number, newComment: string) => {
    if (!canRate || !userData) return;

    try {
      const newRatingData: RatingData = {
        studentId,
        name: userData.name,
        profileImage: userData.profileImage,
        comment: newComment,
        starPoint: newRating,
        date: new Date().toLocaleDateString(),
      };

      await firestoreService.insertDoc(Docs.COURSE_RATINGS, {
        studentId,
        courseId,
        rating: newRating,
        comment: newComment,
        createdAt: new Date().toISOString(),
      });

      // Update local state to reflect new rating
      setRatingData(newRatingData);
      setAllRatings((prevRatings) => [newRatingData, ...prevRatings]);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return { ratingData, allRatings, canRate, loading, submitRating };
};
