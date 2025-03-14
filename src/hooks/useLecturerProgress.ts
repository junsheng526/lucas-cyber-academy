import { useState, useEffect } from "react";
import { Docs, firestoreService } from "../services/firestoreService";

export interface LecturerProgressData {
  courseId: string;
  courseTitle: string;
  averageProgress: number;
  totalEnrollments: number;
  averageRating: number;
}

export const useLecturerProgress = (lecturerId: string) => {
  const [lecturerProgress, setLecturerProgress] = useState<
    LecturerProgressData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLecturerProgress = async () => {
      if (!lecturerId) return;

      try {
        setLoading(true);

        // ✅ Step 1: Fetch all courses created by the lecturer
        const coursesSnapshot = await firestoreService.fetchDocs(Docs.COURSES);
        const lecturerCourses = coursesSnapshot.filter(
          (course) => course.lecturerId === lecturerId
        );

        if (lecturerCourses.length === 0) {
          console.warn("No courses found for lecturer:", lecturerId);
        }

        if (lecturerCourses.length === 0) {
          setLecturerProgress([]);
          setLoading(false);
          return;
        }

        console.log("Lecturer ID:", lecturerId);
        console.log("Fetched Courses:", lecturerCourses);

        // ✅ Step 2: Fetch all enrollments
        const enrollmentsSnapshot = await firestoreService.fetchDocs(
          Docs.ENROLLMENTS
        );

        // ✅ Step 3: Fetch all ratings
        const ratingsSnapshot = await firestoreService.fetchDocs(
          Docs.COURSE_RATINGS
        );

        const progressData = lecturerCourses.map((course) => {
          const courseEnrollments = enrollmentsSnapshot.filter(
            (enrollment) => enrollment.courseId === course.id
          );
          const courseRatings = ratingsSnapshot.filter(
            (rating) => rating.courseId === course.id
          );

          const totalProgress = courseEnrollments.reduce(
            (sum, e) => sum + (e.progress || 0),
            0
          );
          const averageProgress = courseEnrollments.length
            ? totalProgress / courseEnrollments.length
            : 0;

          const totalRating = courseRatings.reduce(
            (sum, r) => sum + r.rating,
            0
          );
          const averageRating = courseRatings.length
            ? totalRating / courseRatings.length
            : 0;

          return {
            courseId: course.id,
            courseTitle: course.title,
            averageProgress,
            totalEnrollments: courseEnrollments.length,
            averageRating,
          };
        });

        setLecturerProgress(progressData);
      } catch (error) {
        console.error("Error fetching lecturer progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturerProgress();
  }, [lecturerId]);

  return { lecturerProgress, loading };
};
