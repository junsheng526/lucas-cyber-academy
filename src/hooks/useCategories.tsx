import { useEffect, useState } from "react";
import { Docs, firestoreService } from "../services/firestoreService";

export const useCategories = () => {
  const [categories, setCategories] = useState<
    { name: string; count: number; featuredImage: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const courses = await firestoreService.fetchDocs(Docs.COURSES);

        // Store categories with their count and an example image
        const categoryMap: Record<
          string,
          { count: number; featuredImage: string }
        > = {};

        courses.forEach((course: any) => {
          if (course.category) {
            if (!categoryMap[course.category]) {
              categoryMap[course.category] = {
                count: 0,
                featuredImage: course.featuredImage || "", // Store first image found
              };
            }
            categoryMap[course.category].count += 1;

            // Prioritize an image if not already set
            if (
              !categoryMap[course.category].featuredImage &&
              course.featuredImage
            ) {
              categoryMap[course.category].featuredImage = course.featuredImage;
            }
          }
        });

        // Convert object to an array
        const categoryList = Object.entries(categoryMap).map(
          ([name, data]) => ({
            name,
            count: data.count,
            featuredImage:
              data.featuredImage || "https://via.placeholder.com/400", // Fallback image
          })
        );

        setCategories(categoryList);
      } catch (err) {
        setError("Failed to load categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
