import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";
import { useAuth } from "../firebase/useAuth";

interface ScheduleEvent {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
}

export const useStudentSchedule = () => {
  const user = useAuth();
  const [studentEvents, setStudentEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStudentSchedules();
    }
  }, [user]);

  const fetchStudentSchedules = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch all schedules from course_schedules
      const schedules = await firestoreService.fetchDocs(Docs.COURSE_SCHEDULES);

      // Fetch enrollments where studentId == currentUser.uid
      const enrollments = await firestoreService.fetchDocs(Docs.ENROLLMENTS);
      const studentEnrollments = enrollments.filter(
        (enrollment) => enrollment.studentId === user.uid
      );

      // Fetch all courses
      const courses = await firestoreService.fetchDocs(Docs.COURSES);

      // Map courseId to course title
      const courseMap = courses.reduce((acc, course) => {
        acc[course.id] = course.title;
        return acc;
      }, {} as Record<string, string>);

      // Get student course IDs
      const studentCourseIds = studentEnrollments.map(
        (enrollment) => enrollment.courseId
      );

      // Filter schedules for student's courses
      const studentSchedules = schedules.filter((schedule) =>
        studentCourseIds.includes(schedule.courseId)
      );

      // Format events
      const formattedEvents = studentSchedules.map((schedule) => ({
        id: schedule.id,
        title: courseMap[schedule.courseId] || "Unknown Course", // ✅ Fix: Get course title
        start: schedule.startTime,
        end: schedule.endTime,
      }));

      setStudentEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching student schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  return { studentEvents, loading };
};
