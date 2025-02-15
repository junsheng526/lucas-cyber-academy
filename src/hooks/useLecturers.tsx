import { useEffect, useState } from "react";
import { firestoreService, Docs } from "../services/firestoreService";
import { Lecturer } from "../data/model";

export const useLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchLecturers = async () => {
    //   try {
    //     const data = await firestoreService.fetchDocs(Docs.LECTURERS);
    //     setLecturers(data as Lecturer[]);
    //   } catch (err) {
    //     setError("Failed to load lecturers");
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchLecturers = async () => {
      try {
        const data = await firestoreService.fetchDocs(Docs.USERS); // Fetch all users
        const lecturers = (data as any[]).filter(
          (user) => user.role === "lecturer"
        ); // Filter only lecturers

        setLecturers(lecturers as Lecturer[]);
      } catch (err) {
        setError("Failed to load lecturers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const assignCourseToLecturer = async (
    lecturerId: string,
    courseId: string
  ) => {
    try {
      const lecturerIndex = lecturers.findIndex((lec) => lec.id === lecturerId);
      if (lecturerIndex === -1) return;

      const currentCourses = lecturers[lecturerIndex].assignedCourses || [];

      // Check if course is already assigned
      if (currentCourses.includes(courseId)) {
        console.warn(
          `Course ${courseId} is already assigned to lecturer ${lecturerId}`
        );
        return; // Prevent duplicate assignment
      }

      // Add new course
      const updatedLecturers = [...lecturers];
      updatedLecturers[lecturerIndex] = {
        ...updatedLecturers[lecturerIndex],
        assignedCourses: [...currentCourses, courseId],
      };

      // Update Firestore
      await firestoreService.updateDoc(Docs.USERS, lecturerId, {
        assignedCourses: updatedLecturers[lecturerIndex].assignedCourses,
      });

      // Update state
      setLecturers(updatedLecturers);
    } catch (err) {
      console.error("Error assigning course:", err);
    }
  };

  const removeCourseFromLecturer = async (
    lecturerId: string,
    courseId: string
  ) => {
    try {
      const lecturerIndex = lecturers.findIndex((lec) => lec.id === lecturerId);
      if (lecturerIndex === -1) return;

      const updatedLecturers = [...lecturers];
      updatedLecturers[lecturerIndex] = {
        ...updatedLecturers[lecturerIndex],
        assignedCourses:
          updatedLecturers[lecturerIndex].assignedCourses?.filter(
            (id) => id !== courseId
          ) || [],
      };

      await firestoreService.updateDoc(Docs.USERS, lecturerId, {
        assignedCourses: updatedLecturers[lecturerIndex].assignedCourses,
      });

      setLecturers(updatedLecturers);
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  return {
    lecturers,
    loading,
    error,
    assignCourseToLecturer,
    setLecturers,
    removeCourseFromLecturer,
  };
};
