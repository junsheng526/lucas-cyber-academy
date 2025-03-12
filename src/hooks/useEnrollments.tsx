import { useState, useEffect } from "react";
import { serverTimestamp } from "firebase/firestore";
import { Docs, firestoreService } from "../services/firestoreService";

interface Enrollment {
  id?: string;
  studentId: string;
  courseId: string;
  lecturerId: string;
  enrolledAt?: any;
  status: "active" | "completed" | "canceled";
  progress: number;
  paymentStatus: "pending" | "paid" | "failed";
  totalPrice: number;
}

const useEnrollments = (studentId: string | null) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // Fetch enrollments when studentId changes
  useEffect(() => {
    if (!studentId) return;

    const fetchEnrollments = async () => {
      try {
        const data = await firestoreService.fetchDocs(Docs.ENROLLMENTS);
        const filtered = data.filter(
          (enrollment) => enrollment.studentId === studentId
        );
        setEnrollments(filtered);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    fetchEnrollments();
  }, [studentId]);

  // Function to enroll a student in a course
  const enrollStudent = async (
    courseId: string,
    lecturerId: string | null | undefined,
    currentEnrollments: number,
    maxSeats: number,
    totalPrice: number
  ) => {
    if (!studentId) {
      alert("You must be logged in to enroll.");
      return;
    }

    if (!lecturerId) {
      alert("Invalid Lecturer Id.");
      return;
    }

    if (currentEnrollments >= maxSeats) {
      alert("This course is already full.");
      return;
    }

    try {
      // 1. Enroll the student
      const newEnrollment: Enrollment = {
        studentId,
        courseId,
        lecturerId,
        enrolledAt: serverTimestamp(),
        status: "active",
        progress: 0,
        paymentStatus: "paid",
        totalPrice: totalPrice,
      };

      const docId = await firestoreService.insertDoc(
        Docs.ENROLLMENTS,
        newEnrollment
      );
      setEnrollments([...enrollments, { ...newEnrollment, id: docId }]);

      // 2. Update the course's currentEnrollments count
      await firestoreService.updateDoc(Docs.COURSES, courseId, {
        currentEnrollments: currentEnrollments + 1,
      });

      // 3. Show success alert
      alert("Enrollment successful!");
      window.location.reload();
    } catch (error) {
      console.error("Error enrolling student:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  // Function to unenroll from a course
  const unenrollStudent = async (enrollmentId: string) => {
    try {
      await firestoreService.deleteDoc(Docs.ENROLLMENTS, enrollmentId);
      setEnrollments(
        enrollments.filter((enrollment) => enrollment.id !== enrollmentId)
      );
      alert("Successfully unenrolled from the course.");
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Failed to unenroll. Please try again.");
    }
  };

  return { enrollments, enrollStudent, unenrollStudent };
};

export default useEnrollments;
