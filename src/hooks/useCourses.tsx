import { useEffect, useState } from "react";
import { Course } from "../data/model";
import { Docs, firestoreService } from "../services/firestoreService";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await firestoreService.fetchDocs(Docs.COURSES);
        setCourses(data);
        console.log("Re-rendering");
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error, setCourses };
};
