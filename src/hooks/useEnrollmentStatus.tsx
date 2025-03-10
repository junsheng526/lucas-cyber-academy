import { useState, useEffect } from "react";
import { Docs, firestoreService } from "../services/firestoreService";

interface UseEnrollmentStatusProps {
  userId: string;
  courseId: string;
}

const useEnrollmentStatus = ({
  userId,
  courseId,
}: UseEnrollmentStatusProps) => {
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const enrollments = await firestoreService.fetchDocs(Docs.ENROLLMENTS);
        const enrolled = enrollments.some(
          (enrollment) =>
            enrollment.studentId === userId && enrollment.courseId === courseId
        );
        setIsEnrolled(enrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [userId, courseId]);

  return { isEnrolled, loading };
};

export default useEnrollmentStatus;
