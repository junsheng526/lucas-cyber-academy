import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";

export interface Content {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const useAboutContent = () => {
  const [content, setContent] = useState<Content>({
    title: "",
    subtitle: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeader = async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await firestoreService.fetchDocById(
          Docs.HOME_CONTENT,
          "OWzezYNeCRH9YJMb8rPS"
        );
        setContent({
          title: doc.title || "",
          subtitle: doc.subtitle || "",
          imageUrl: doc.imageUrl || "",
        });
      } catch (err) {
        console.error("Error fetching header data:", err);
      }
      setLoading(false);
    };
    fetchHeader();
  }, []);

  const updateContent = async (updatedData: Content) => {
    try {
      await firestoreService.updateDoc(
        Docs.HOME_CONTENT,
        "OWzezYNeCRH9YJMb8rPS",
        updatedData
      );
      setContent({
        title: updatedData.title || "",
        subtitle: updatedData.subtitle || "",
        imageUrl: updatedData.imageUrl || "",
      });
    } catch (err) {
      console.error("Error updating about us header:", err);
    }
  };

  return { content, loading, error, updateContent };
};

export default useAboutContent;
