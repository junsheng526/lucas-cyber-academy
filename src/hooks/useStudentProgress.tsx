import { useState, useEffect } from "react";
import { Docs, firestoreService } from "../services/firestoreService";

// Define ProgressData type
export interface ProgressData {
  courseId: string;
  name: string;
  progress: number;
}

export const useStudentProgress = (studentId: string) => {
  const [coursesProgress, setCoursesProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!studentId) return;

      try {
        setLoading(true);
        const now = new Date();

        // Fetch enrollments for the student
        const enrollments = await firestoreService.fetchDocs(Docs.ENROLLMENTS);
        const studentEnrollments = enrollments.filter(
          (e) => e.studentId === studentId
        );

        let progressData: ProgressData[] = [];

        for (const enrollment of studentEnrollments) {
          const { courseId } = enrollment;

          // Fetch course details
          const course = await firestoreService.fetchDocById(
            Docs.COURSES,
            courseId
          );
          if (!course) continue;

          // Fetch course schedules
          const schedules = await firestoreService.fetchDocs(
            Docs.COURSE_SCHEDULES
          );
          const courseSchedules = schedules.filter(
            (s) => s.courseId === courseId
          );

          if (courseSchedules.length === 0) continue;

          // Calculate progress percentage based on completed sessions
          const completedSessions = courseSchedules.filter(
            (schedule) => new Date(schedule.endTime) <= now
          ).length;
          const progressPercentage = completedSessions / courseSchedules.length;

          // Update progress in Firestore
          await firestoreService.updateDoc(Docs.ENROLLMENTS, enrollment.id, {
            progress: progressPercentage,
          });

          // Store progress data
          progressData.push({
            courseId,
            name: course.title,
            progress: progressPercentage,
          });
        }

        setCoursesProgress(progressData);
      } catch (error) {
        console.error("Error fetching student progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [studentId]);

  return { coursesProgress, loading };
};
