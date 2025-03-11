import { useEffect, useState } from "react";
import { Course } from "../types/model";
import { Docs, firestoreService } from "../services/firestoreService";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]); // Store categories
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await firestoreService.fetchDocs(Docs.COURSES);
        setCourses(data);
        setFilteredCourses(data); // Default: Show all courses

        // Extract unique categories from courses
        const uniqueCategories = Array.from(
          new Set(data.map((course) => course.category))
        );
        setCategories(["All", ...uniqueCategories]); // Ensure "All" is first
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /**
   * Filters courses based on category
   * @param category The category to filter by ("All" shows all courses)
   */
  const filterCourses = (category: string) => {
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === category)
      );
    }
  };

  return {
    courses,
    filteredCourses,
    categories,
    loading,
    error,
    setCourses,
    filterCourses,
  };
};
