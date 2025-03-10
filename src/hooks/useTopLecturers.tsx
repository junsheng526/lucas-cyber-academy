import { useEffect, useState } from "react";
import { Docs, firestoreService } from "../services/firestoreService";
import { AuthorType } from "../data/types";

const useTopLecturers = (limit: number = 10) => {
  const [lecturers, setLecturers] = useState<AuthorType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecturers = async () => {
      setLoading(true);
      try {
        // Fetch users, ratings, and enrollments concurrently
        const [
          usersSnapshot,
          ratingsSnapshot,
          enrollmentsSnapshot,
          coursesSnapshot,
        ] = await Promise.all([
          firestoreService.fetchDocs(Docs.USERS),
          firestoreService.fetchDocs(Docs.COURSE_RATINGS),
          firestoreService.fetchDocs(Docs.ENROLLMENTS),
          firestoreService.fetchDocs(Docs.COURSES), // Needed to map course ratings to lecturers
        ]);

        // Extract data
        let lecturersData = usersSnapshot
          .map((doc) => ({ id: doc.id, ...doc }))
          .filter((user) => user.role?.toLowerCase() === "lecturer");

        const ratingsData = ratingsSnapshot.map((doc) => doc);
        const coursesData = coursesSnapshot.map((doc) => doc);
        const enrollmentsData = enrollmentsSnapshot.map((doc) => doc);

        // Map course ratings to lecturers
        const lecturerRatingsMap: Record<
          string,
          { total: number; count: number }
        > = {};

        ratingsData.forEach((rating) => {
          const course = coursesData.find((c) => c.id === rating.courseId);
          console.log("course 1 -> " + JSON.stringify(course));
          if (course && course.lecturerId) {
            console.log("course 2 -> " + JSON.stringify(course));
            if (!lecturerRatingsMap[course.lectureId]) {
              lecturerRatingsMap[course.lecturerId] = { total: 0, count: 0 };
            }
            lecturerRatingsMap[course.lecturerId].total += rating.rating;
            console.log(
              "lecturerRatingsMap[course.lectureId].total -> " +
                lecturerRatingsMap[course.lecturerId].total
            );
            lecturerRatingsMap[course.lecturerId].count += 1;
            console.log(
              "lecturerRatingsMap[course.lectureId].count -> " +
                lecturerRatingsMap[course.lecturerId].count
            );
          }
        });

        // Assign average ratings to lecturers
        const lecturersWithRatings = lecturersData.map((lecturer) => {
          const ratingData = lecturerRatingsMap[lecturer.id] || {
            total: 0,
            count: 0,
          };
          const avgRating =
            ratingData.count > 0 ? ratingData.total / ratingData.count : 0;
          return { ...lecturer, avgRating: parseFloat(avgRating.toFixed(1)) };
        });

        // Count students per lecturer
        const lecturersWithPopularity = lecturersWithRatings.map((lecturer) => {
          const studentCount = enrollmentsData.filter(
            (e) => e.lectureId === lecturer.id
          ).length;
          return { ...lecturer, studentCount };
        });

        // Sort: highest rating → highest student count
        const sortedLecturers = lecturersWithPopularity.sort(
          (a, b) => b.avgRating - a.avgRating || b.studentCount - a.studentCount
        );

        // Set top lecturers
        setLecturers(sortedLecturers.slice(0, limit));
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
      setLoading(false);
    };

    fetchLecturers();
  }, [limit]);

  return { lecturers, loading };
};

export default useTopLecturers;
