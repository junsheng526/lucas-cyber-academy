import { useEffect, useState } from "react";
import { firestoreService, Docs } from "../services/firestoreService";
import { Lecturer } from "../types/model";

export const useLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const data = await firestoreService.fetchDocs(Docs.USERS);
        const lecturers = (data as any[]).filter(
          (user) => user.role?.toLowerCase() === "lecturer"
        );

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
      const courseDoc = await firestoreService.fetchDocById(
        Docs.COURSES,
        courseId
      );
      if (!courseDoc) {
        console.error("Course not found");
        return;
      }

      // Check if the course already has an assigned lecturer
      if (courseDoc.lecturerId) {
        console.warn(
          `Course is already assigned to lecturer ${courseDoc.lecturerId}`
        );
        alert("This course is already assigned to another lecturer.");
        return; // Prevent assignment if already assigned
      }

      // If no lecturer is assigned, proceed with assignment
      await firestoreService.updateDoc(Docs.COURSES, courseId, {
        lecturerId: lecturerId,
      });

      // After assigning the course, update the lecturer's assignedCourses list
      const lecturerDoc = await firestoreService.fetchDocById(
        Docs.USERS,
        lecturerId
      );
      if (!lecturerDoc) {
        console.error("Lecturer not found");
        return;
      }

      const assignedCourses = lecturerDoc.assignedCourses || [];
      if (assignedCourses.includes(courseId)) {
        console.warn(`Lecturer already has this course assigned.`);
        return;
      }

      // Update the lecturer's assigned courses in Firestore
      assignedCourses.push(courseId);
      await firestoreService.updateDoc(Docs.USERS, lecturerId, {
        assignedCourses,
      });

      console.log("Course successfully assigned to lecturer");
    } catch (err) {
      console.error("Error assigning course:", err);
    }
  };

  const removeCourseFromLecturer = async (
    lecturerId: string,
    courseId: string
  ) => {
    try {
      // Fetch the course document
      const courseDoc = await firestoreService.fetchDocById(
        Docs.COURSES,
        courseId
      );
      if (!courseDoc) {
        console.error("Course not found");
        return;
      }

      // Remove the lecturerId from the course document
      await firestoreService.updateDoc(Docs.COURSES, courseId, {
        lecturerId: null, // Remove the lecturerId from the course
      });

      // Fetch the lecturer document to update the assignedCourses list
      const lecturerIndex = lecturers.findIndex((lec) => lec.id === lecturerId);
      if (lecturerIndex === -1) return;

      // Update the lecturer's assignedCourses by removing the course
      const updatedLecturers = [...lecturers];
      updatedLecturers[lecturerIndex] = {
        ...updatedLecturers[lecturerIndex],
        assignedCourses:
          updatedLecturers[lecturerIndex].assignedCourses?.filter(
            (id) => id !== courseId
          ) || [],
      };

      // Update the lecturer's assignedCourses in the USERS collection
      await firestoreService.updateDoc(Docs.USERS, lecturerId, {
        assignedCourses: updatedLecturers[lecturerIndex].assignedCourses,
      });

      // Update state with the new lecturers list
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
